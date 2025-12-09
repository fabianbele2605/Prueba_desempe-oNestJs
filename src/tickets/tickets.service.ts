import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, TicketStatus } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ClientsService } from '../clients/clients.service';
import { CategoriesService } from '../categories/categories.service';
import { TechniciansService } from '../technicians/technicians.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    private clientsService: ClientsService,
    private categoriesService: CategoriesService,
    private techniciansService: TechniciansService,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const client = await this.clientsService.findById(createTicketDto.clientId);
    if (!client) {
      throw new BadRequestException('Client not found');
    }

    const category = await this.categoriesService.findById(createTicketDto.categoryId);
    if (!category) {
      throw new BadRequestException('Category not found');
    }

    const ticket = this.ticketRepository.create({
      title: createTicketDto.title,
      description: createTicketDto.description,
      priority: createTicketDto.priority,
      client,
      category,
    });

    return this.ticketRepository.save(ticket);
  }

  async updateStatus(id: number, newStatus: TicketStatus): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    const validTransitions: Record<TicketStatus, TicketStatus[]> = {
      [TicketStatus.OPEN]: [TicketStatus.IN_PROGRESS],
      [TicketStatus.IN_PROGRESS]: [TicketStatus.RESOLVED],
      [TicketStatus.RESOLVED]: [TicketStatus.CLOSED],
      [TicketStatus.CLOSED]: [],
    };

    if (!validTransitions[ticket.status].includes(newStatus)) {
      throw new BadRequestException(`Cannot transition from ${ticket.status} to ${newStatus}`);
    }

    ticket.status = newStatus;
    return this.ticketRepository.save(ticket);
  }

  async assignTechnician(ticketId: number, technicianId: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ where: { id: ticketId }, relations: ['technician'] });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    const technician = await this.techniciansService.findById(technicianId);
    if (!technician) {
      throw new BadRequestException('Technician not found');
    }

    const inProgressCount = await this.ticketRepository.count({
      where: { technician: { id: technicianId }, status: TicketStatus.IN_PROGRESS },
    });

    if (inProgressCount >= 5) {
      throw new BadRequestException('Technician has reached maximum of 5 tickets in progress');
    }

    ticket.technician = technician;
    return this.ticketRepository.save(ticket);
  }

  async findByClient(clientId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: { client: { id: clientId } },
      relations: ['client', 'technician', 'category'],
    });
  }

  async findByTechnician(technicianId: number): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: { technician: { id: technicianId } },
      relations: ['client', 'technician', 'category'],
    });
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({ relations: ['client', 'technician', 'category'] });
  }

  async findById(id: number, user?: any): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['client', 'technician', 'category'],
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    
    if (user && user.roles === 'client' && ticket.client.contactEmail !== user.email) {
      throw new NotFoundException('Ticket not found');
    }
    
    return ticket;
  }

  async findByClientEmail(email: string): Promise<Ticket[]> {
    return this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.client', 'client')
      .leftJoinAndSelect('ticket.technician', 'technician')
      .leftJoinAndSelect('ticket.category', 'category')
      .where('client.contactEmail = :email', { email })
      .getMany();
  }
}

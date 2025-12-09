import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ticket, TicketStatus, TicketPriority } from './entities/ticket.entity';
import { ClientsService } from '../clients/clients.service';
import { CategoriesService } from '../categories/categories.service';
import { TechniciansService } from '../technicians/technicians.service';
import { BadRequestException } from '@nestjs/common';

describe('TicketsService', () => {
  let service: TicketsService;
  let mockTicketRepository: any;
  let mockClientsService: any;
  let mockCategoriesService: any;
  let mockTechniciansService: any;

  beforeEach(async () => {
    mockTicketRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      count: jest.fn(),
    };

    mockClientsService = {
      findById: jest.fn(),
    };

    mockCategoriesService = {
      findById: jest.fn(),
    };

    mockTechniciansService = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsService,
        { provide: getRepositoryToken(Ticket), useValue: mockTicketRepository },
        { provide: ClientsService, useValue: mockClientsService },
        { provide: CategoriesService, useValue: mockCategoriesService },
        { provide: TechniciansService, useValue: mockTechniciansService },
      ],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  describe('create', () => {
    it('should create a ticket successfully', async () => {
      const createTicketDto = {
        title: 'Test Ticket',
        description: 'Test Description',
        priority: TicketPriority.MEDIUM,
        clientId: 1,
        categoryId: 1,
      };

      const mockClient = { id: 1, name: 'Test Client' };
      const mockCategory = { id: 1, name: 'Test Category' };
      const mockTicket = { id: 1, ...createTicketDto, client: mockClient, category: mockCategory };

      mockClientsService.findById.mockResolvedValue(mockClient);
      mockCategoriesService.findById.mockResolvedValue(mockCategory);
      mockTicketRepository.create.mockReturnValue(mockTicket);
      mockTicketRepository.save.mockResolvedValue(mockTicket);

      const result = await service.create(createTicketDto);

      expect(result).toEqual(mockTicket);
      expect(mockClientsService.findById).toHaveBeenCalledWith(1);
      expect(mockCategoriesService.findById).toHaveBeenCalledWith(1);
    });

    it('should throw BadRequestException if client not found', async () => {
      const createTicketDto = {
        title: 'Test Ticket',
        description: 'Test Description',
        priority: TicketPriority.MEDIUM,
        clientId: 999,
        categoryId: 1,
      };

      mockClientsService.findById.mockResolvedValue(null);

      await expect(service.create(createTicketDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateStatus', () => {
    it('should update ticket status successfully', async () => {
      const mockTicket = {
        id: 1,
        status: TicketStatus.OPEN,
        title: 'Test',
      };

      mockTicketRepository.findOne.mockResolvedValue(mockTicket);
      mockTicketRepository.save.mockResolvedValue({ ...mockTicket, status: TicketStatus.IN_PROGRESS });

      const result = await service.updateStatus(1, TicketStatus.IN_PROGRESS);

      expect(result.status).toBe(TicketStatus.IN_PROGRESS);
    });

    it('should throw BadRequestException for invalid status transition', async () => {
      const mockTicket = {
        id: 1,
        status: TicketStatus.OPEN,
      };

      mockTicketRepository.findOne.mockResolvedValue(mockTicket);

      await expect(service.updateStatus(1, TicketStatus.CLOSED)).rejects.toThrow(BadRequestException);
    });
  });
});

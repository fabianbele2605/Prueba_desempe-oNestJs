import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technicians } from './entities/technicians.entity';
import { CreateTechnicianDto } from './dto/create-technician.dto';

@Injectable()
export class TechniciansService {
  constructor(
    @InjectRepository(Technicians)
    private technicianRepository: Repository<Technicians>,
  ) {}

  async findById(id: number): Promise<Technicians> {
    const technician = await this.technicianRepository.findOne({ where: { id } });
    if (!technician) {
      throw new NotFoundException(`Technician with ID ${id} not found`);
    }
    return technician;
  }

  async findAll(): Promise<Technicians[]> {
    return this.technicianRepository.find();
  }

  async create(createTechnicianDto: CreateTechnicianDto): Promise<Technicians> {
    const technician = this.technicianRepository.create(createTechnicianDto);
    return this.technicianRepository.save(technician);
  }
}

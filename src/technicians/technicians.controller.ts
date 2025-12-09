import { Controller, Get, Post, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { TechniciansService } from './technicians.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';

@ApiTags('Technicians')
@ApiBearerAuth()
@Controller('technicians')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TechniciansController {
  constructor(private techniciansService: TechniciansService) {}

  @Get()
  @Roles(Role.admin)
  @ApiOperation({ summary: 'Get all technicians (Admin only)' })
  @ApiResponse({ status: 200, description: 'Returns all technicians' })
  async findAll() {
    return this.techniciansService.findAll();
  }

  @Get(':id')
  @Roles(Role.admin, Role.technical)
  @ApiOperation({ summary: 'Get technician by ID' })
  @ApiResponse({ status: 200, description: 'Returns technician details' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.techniciansService.findById(id);
  }

  @Post()
  @Roles(Role.admin)
  @ApiOperation({ summary: 'Create a new technician' })
  @ApiResponse({ status: 201, description: 'Technician created successfully' })
  async create(@Body() createTechnicianDto: CreateTechnicianDto) {
    return this.techniciansService.create(createTechnicianDto);
  }
}

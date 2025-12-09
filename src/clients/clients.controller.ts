import { Controller, Get, Post, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';

@ApiTags('Clients')
@ApiBearerAuth()
@Controller('clients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  @Roles(Role.admin, Role.technical)
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'Returns all clients' })
  async findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @Roles(Role.admin, Role.technical)
  @ApiOperation({ summary: 'Get client by ID' })
  @ApiResponse({ status: 200, description: 'Returns client details' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.findById(id);
  }

  @Post()
  @Roles(Role.admin)
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({ status: 201, description: 'Client created successfully' })
  async create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }
}

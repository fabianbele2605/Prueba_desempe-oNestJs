import { Controller, Get, Post, Patch, Body, Param, UseGuards, ParseIntPipe, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
import { AssignTechnicianDto } from './dto/assign-technician.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Tickets')
@ApiBearerAuth()
@Controller('tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Post()
  @Roles(Role.admin, Role.client)
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiResponse({ status: 201, description: 'Ticket created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid client or category' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @Roles(Role.admin, Role.technical, Role.client)
  @ApiOperation({ summary: 'Get all tickets' })
  @ApiResponse({ status: 200, description: 'Returns all tickets' })
  async findAll(@CurrentUser() user: any) {
    if (user.roles === Role.client) {
      return this.ticketsService.findByClientEmail(user.email);
    }
    return this.ticketsService.findAll();
  }

  @Get(':id')
  @Roles(Role.admin, Role.technical, Role.client)
  @ApiOperation({ summary: 'Get ticket by ID' })
  @ApiResponse({ status: 200, description: 'Returns ticket details' })
  @ApiResponse({ status: 404, description: 'Ticket not found' })
  async findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: any) {
    return this.ticketsService.findById(id, user);
  }

  @Patch(':id/status')
  @Roles(Role.admin, Role.technical)
  @ApiOperation({ summary: 'Update ticket status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateTicketStatusDto,
  ) {
    return this.ticketsService.updateStatus(id, updateStatusDto.status);
  }

  @Patch(':id/assign')
  @Roles(Role.admin)
  @ApiOperation({ summary: 'Assign technician to ticket' })
  @ApiResponse({ status: 200, description: 'Technician assigned successfully' })
  @ApiResponse({ status: 400, description: 'Technician has max tickets or not found' })
  async assignTechnician(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignDto: AssignTechnicianDto,
  ) {
    return this.ticketsService.assignTechnician(id, assignDto.technicianId);
  }

  @Get('client/:id')
  @Roles(Role.admin, Role.client)
  @ApiOperation({ summary: 'Get tickets by client ID' })
  @ApiResponse({ status: 200, description: 'Returns client tickets' })
  async findByClient(@Param('id', ParseIntPipe) clientId: number) {
    return this.ticketsService.findByClient(clientId);
  }

  @Get('technician/:id')
  @Roles(Role.admin, Role.technical)
  @ApiOperation({ summary: 'Get tickets by technician ID' })
  @ApiResponse({ status: 200, description: 'Returns technician tickets' })
  async findByTechnician(@Param('id', ParseIntPipe) technicianId: number) {
    return this.ticketsService.findByTechnician(technicianId);
  }
}

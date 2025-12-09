import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TicketStatus } from '../entities/ticket.entity';

export class UpdateTicketStatusDto {
  @ApiProperty({ example: 'IN_PROGRESS', enum: TicketStatus, description: 'New ticket status' })
  @IsEnum(TicketStatus)
  @IsNotEmpty()
  status: TicketStatus;
}

import { IsNotEmpty, IsString, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TicketPriority } from '../entities/ticket.entity';

export class CreateTicketDto {
  @ApiProperty({ example: 'Laptop not turning on', description: 'Ticket title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'My laptop won\'t start after the last update', description: 'Detailed description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'HIGH', enum: TicketPriority, description: 'Ticket priority level' })
  @IsEnum(TicketPriority)
  priority: TicketPriority;

  @ApiProperty({ example: 1, description: 'Client ID' })
  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @ApiProperty({ example: 2, description: 'Category ID' })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}

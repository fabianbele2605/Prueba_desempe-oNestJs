import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignTechnicianDto {
  @ApiProperty({ example: 1, description: 'Technician ID to assign' })
  @IsNumber()
  @IsNotEmpty()
  technicianId: number;
}

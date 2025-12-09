import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTechnicianDto {
  @ApiProperty({ example: 'Alex Duran' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Database Engineer' })
  @IsString()
  @IsNotEmpty()
  specialty: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  availability: boolean;
}

import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'Carlos Perez' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Claro Corp' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({ example: 'carlosclaro123@mail.com' })
  @IsEmail()
  @IsNotEmpty()
  contactEmail: string;
}

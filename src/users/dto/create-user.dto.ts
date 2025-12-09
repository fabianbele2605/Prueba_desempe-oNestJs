import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/user.entity';

export class CreateUserDto {
    @ApiProperty({ example: 'john@example.com', description: 'User email address' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'John Doe', description: 'User full name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'password123', description: 'User password (min 6 characters)' })
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'client', enum: Role, description: 'User role' })
    @IsEnum(Role)
    roles: Role;
}
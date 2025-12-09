import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategorieDto {
    @ApiProperty({ example: 'Network Issues', description: 'Category name' })
    @IsString()
    name: string;
    
    @ApiProperty({ example: 'Network connectivity and infrastructure issues', description: 'Category description' })
    @IsString()
    description: string;

    @ApiProperty({ example: true, description: 'Category active state', required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
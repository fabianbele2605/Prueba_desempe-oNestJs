import { Module } from '@nestjs/common';
import { TechniciansService } from './technicians.service';
import { TechniciansController } from './technicians.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technicians } from './entities/technicians.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Technicians])],
  providers: [TechniciansService],
  controllers: [TechniciansController],
  exports: [TechniciansService, TypeOrmModule],
})
export class TechniciansModule {}

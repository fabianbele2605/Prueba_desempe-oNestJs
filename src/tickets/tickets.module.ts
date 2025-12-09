import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { ClientsModule } from '../clients/clients.module';
import { TechniciansModule } from '../technicians/technicians.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Ticket]), ClientsModule, TechniciansModule, CategoriesModule],
  providers: [TicketsService],
  controllers: [TicketsController],
  exports: [TicketsService, TypeOrmModule],
})
export class TicketsModule {}

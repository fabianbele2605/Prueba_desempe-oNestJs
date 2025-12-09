import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Client } from "../../clients/entities/client.entity";
import { Technicians } from "../../technicians/entities/technicians.entity";
import { Category } from "../../categories/entities/categorie.entity";

export enum TicketStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED = 'RESOLVED',
    CLOSED = 'CLOSED',
}

export enum TicketPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL',
}

@Entity('tickets')
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.OPEN })
    status: TicketStatus;

    @Column({ type: 'enum', enum: TicketPriority, default: TicketPriority.MEDIUM })
    priority: TicketPriority;

    @ManyToOne(() => Client, { nullable: false})
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @ManyToOne(() => Technicians, { nullable: true })
    @JoinColumn({ name: 'technician_id' })
    technician: Technicians;

    @ManyToOne(() => Category, { nullable: false })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
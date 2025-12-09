import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('technicians')
export class Technicians {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    specialty: string;

    @Column({ default: true })
    availability: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
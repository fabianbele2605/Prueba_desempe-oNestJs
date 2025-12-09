import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// Categorie entity representing a category in the system
@Entity('categories')
export class Category {
    // Unique identifier for the category
    @PrimaryGeneratedColumn()
    id: number;

    // Name of the category
    @Column()
    name: string;

    // Description of the category
    @Column({ nullable: true })
    description: string;

    // Timestamp when the category was created
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    // Timestamp when the category was last updated
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
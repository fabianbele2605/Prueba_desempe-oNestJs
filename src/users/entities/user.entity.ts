import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// Role entity representing a user in the system
export enum Role {
    admin = 'admin',
    client = 'client',
    technical = 'technical',
}

@Entity('users')
export class User {
    // Unique identifier for the user
    @PrimaryGeneratedColumn()
    id: number;

    // Name of the user
    @Column()
    name: string;

    // Email address of the user
    @Column()
    email: string;

    // Password of the user
    @Column()
    password: string;

    // Roles assigned to the user
    @Column({
        type: 'enum',
        enum: [Role.admin, Role.client, Role.technical],
        default: Role.client,
    })
    roles: Role;

    // Timestamp when the user was created
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    // Timestamp when the user was last updated
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

}
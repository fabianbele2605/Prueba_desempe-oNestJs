import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'riwi123',
  database: 'tech_help_desk',
  entities: ['src/**/*.entity.ts'],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();

  // Seed Users
  await AppDataSource.query(`
    INSERT INTO users (name, email, password, roles, created_at, updated_at) VALUES
    ('Admin User', 'admin@techhelp.com', '${await bcrypt.hash('admin123', 10)}', 'admin', NOW(), NOW()),
    ('Tech Support 1', 'tech1@techhelp.com', '${await bcrypt.hash('tech123', 10)}', 'technical', NOW(), NOW()),
    ('Tech Support 2', 'tech2@techhelp.com', '${await bcrypt.hash('tech123', 10)}', 'technical', NOW(), NOW()),
    ('Client User 1', 'client1@company.com', '${await bcrypt.hash('client123', 10)}', 'client', NOW(), NOW()),
    ('Client User 2', 'client2@company.com', '${await bcrypt.hash('client123', 10)}', 'client', NOW(), NOW())
    ON CONFLICT DO NOTHING;
  `);

  // Seed Categories
  await AppDataSource.query(`
    INSERT INTO categories (name, description, created_at, updated_at) VALUES
    ('Solicitud', 'General service requests', NOW(), NOW()),
    ('Incidente de Hardware', 'Hardware related issues', NOW(), NOW()),
    ('Incidente de Software', 'Software related issues', NOW(), NOW())
    ON CONFLICT DO NOTHING;
  `);

  // Seed Clients
  await AppDataSource.query(`
    INSERT INTO clients (name, company, "contactEmail", created_at, updated_at) VALUES
    ('John Doe', 'Acme Corp', 'john.doe@acme.com', NOW(), NOW()),
    ('Jane Smith', 'Tech Solutions', 'jane.smith@techsol.com', NOW(), NOW()),
    ('Bob Johnson', 'Global Industries', 'bob.j@global.com', NOW(), NOW())
    ON CONFLICT DO NOTHING;
  `);

  // Seed Technicians
  await AppDataSource.query(`
    INSERT INTO technicians (name, specialty, availability, created_at, updated_at) VALUES
    ('Carlos Martinez', 'Hardware Specialist', true, NOW(), NOW()),
    ('Maria Garcia', 'Software Engineer', true, NOW(), NOW()),
    ('Luis Rodriguez', 'Network Administrator', true, NOW(), NOW())
    ON CONFLICT DO NOTHING;
  `);

  console.log('✅ Database seeded successfully!');
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('❌ Error seeding database:', error);
  process.exit(1);
});

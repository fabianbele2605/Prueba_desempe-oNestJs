# TechHelpDesk API

Technical support ticket management system built with NestJS, TypeORM, PostgreSQL, and JWT authentication.

**Developer:** Fabián Enrique Beleño Robles - Clan Tayrona

---

## 📋 Features

- JWT Authentication with role-based access control
- CRUD operations for Users, Clients, Technicians, Categories, and Tickets
- Ticket status workflow validation (Open → In Progress → Resolved → Closed)
- Technician workload limit (max 5 tickets in progress)
- Swagger API documentation
- Unit tests with Jest (55% coverage)
- Docker support for PostgreSQL

---

## 🚀 Installation

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-username/tech-help-desk.git
cd tech-help-desk
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=riwi123
DB_DATABASE=tech_help_desk
JWT_SECRET=Riwi_123456
JWT_EXPIRATION=3600s
PORT=3000
```

4. **Start PostgreSQL with Docker**
```bash
docker-compose up -d
```

5. **Seed the database (optional)**
```bash
npm run seed
```

This will populate the database with:
- 5 users (1 admin, 2 technicians, 2 clients)
- 3 categories
- 3 clients
- 3 technicians

6. **Run the application**
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

7. **Access the API**
- API: http://localhost:3000
- Swagger Documentation: http://localhost:3000/api/docs

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:cov

# Watch mode
npm run test:watch
```

---

## 📚 API Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "roles": "client"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "john@example.com",
      "name": "John Doe",
      "role": "client"
    }
  },
  "message": "Request successful"
}
```

---

### Users (Admin only)

#### Get All Users
```http
GET /users
Authorization: Bearer <token>
```

#### Get User by ID
```http
GET /users/:id
Authorization: Bearer <token>
```

#### Create User
```http
POST /users
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "roles": "technical"
}
```

---

### Tickets

#### Create Ticket (Client/Admin)
```http
POST /tickets
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Laptop not turning on",
  "description": "My laptop won't start after the last update",
  "priority": "HIGH",
  "clientId": 1,
  "categoryId": 2
}
```

#### Get All Tickets (Admin/Technician)
```http
GET /tickets
Authorization: Bearer <token>
```

#### Get Ticket by ID
```http
GET /tickets/:id
Authorization: Bearer <token>
```

#### Update Ticket Status (Admin/Technician)
```http
PATCH /tickets/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "IN_PROGRESS"
}
```

#### Assign Technician (Admin only)
```http
PATCH /tickets/:id/assign
Authorization: Bearer <token>
Content-Type: application/json

{
  "technicianId": 3
}
```

#### Get Tickets by Client
```http
GET /tickets/client/:id
Authorization: Bearer <token>
```

#### Get Tickets by Technician
```http
GET /tickets/technician/:id
Authorization: Bearer <token>
```

---

## 🔐 Roles & Permissions

### Admin
- Full CRUD on all resources
- Assign technicians to tickets
- Change ticket status

### Technician
- View assigned tickets
- Update ticket status
- View all tickets

### Client
- Create tickets
- View own tickets
- View ticket details

---

## 📊 Database Schema

### Users
- id, name, email, password, roles, created_at, updated_at

### Clients
- id, name, company, contactEmail, created_at, updated_at

### Technicians
- id, name, specialty, availability, created_at, updated_at

### Categories
- id, name, description, created_at, updated_at

### Tickets
- id, title, description, status, priority, client_id, technician_id, category_id, created_at, updated_at

---

## 🐳 Docker Deployment (Optional)

### Deploy with Docker Compose

The project includes a complete Docker setup with both API and PostgreSQL:

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Services

- **API:** http://localhost:3000
- **Swagger:** http://localhost:3000/api/docs
- **PostgreSQL:** localhost:5432

### Docker Commands

**Start only PostgreSQL:**
```bash
docker-compose up -d postgres
```

**Access PostgreSQL CLI:**
```bash
docker exec -it tech-help-desk-db psql -U postgres -d tech_help_desk
```

**View API logs:**
```bash
docker-compose logs -f api
```

**Rebuild API:**
```bash
docker-compose up -d --build api
```

---

## 🛠️ Tech Stack

- **Framework:** NestJS 11
- **Database:** PostgreSQL 15
- **ORM:** TypeORM 0.3
- **Authentication:** JWT (Passport)
- **Validation:** class-validator
- **Documentation:** Swagger
- **Testing:** Jest
- **Containerization:** Docker

---

## 📝 Business Rules

1. **Ticket Status Workflow:**
   - Open → In Progress → Resolved → Closed
   - Status transitions must follow this sequence

2. **Technician Workload:**
   - Maximum 5 tickets "In Progress" per technician

3. **Ticket Creation:**
   - Must have valid client and category
   - Cannot create ticket without these references

4. **Authentication:**
   - All endpoints (except register/login) require JWT token
   - Role-based access control enforced

---

## 🧪 Test Coverage

Current coverage: **55%**

Key tests implemented:
- Ticket creation with validation
- Ticket status transition validation
- Invalid client/category handling
- Status workflow enforcement

---

## 📦 Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── decorators/       # Custom decorators (@Roles, @CurrentUser)
│   ├── guards/           # JWT & Roles guards
│   ├── strategies/       # JWT strategy
│   └── dto/              # Login DTOs
├── users/                # Users module
├── clients/              # Clients module
├── technicians/          # Technicians module
├── categories/           # Categories module
├── tickets/              # Tickets module
│   ├── dto/              # Ticket DTOs
│   └── entities/         # Ticket entity with enums
├── common/               # Shared resources
│   └── interceptors/     # Transform interceptor
└── main.ts               # Application entry point
```

---

## 🌱 Seeders

The project includes a seeder script to populate initial data:

```bash
npm run seed
```

**Default credentials after seeding:**

**Admin:**
- Email: admin@techhelp.com
- Password: admin123

**Technicians:**
- Email: tech1@techhelp.com / Password: tech123
- Email: tech2@techhelp.com / Password: tech123

**Clients:**
- Email: client1@company.com / Password: client123
- Email: client2@company.com / Password: client123

---

## 🚧 Future Improvements

- Add pagination for list endpoints
- Implement ticket comments/history
- Add email notifications
- Implement file attachments for tickets
- Add ticket priority escalation
- Implement SLA tracking

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Fabián**  
Clan: **Riwi**  
GitHub: https://github.com/your-username

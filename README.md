# Nexus Inventory – Inventory Management System

<p align="center">
  <img src="https://img.icons8.com/fluency/96/warehouse.png" width="76" alt="Nexus Inventory Logo" />
</p>

<h1 align="center">Nexus Inventory</h1>

<p align="center">
  <strong>Smart Inventory Management. Simplified.</strong>
</p>

<p align="center">
  A full-stack inventory management application built with React, TypeScript, Tailwind CSS, Node.js, Express.js, and MongoDB. Designed with a modern user interface and Clean Architecture principles to provide structured, maintainable, and scalable inventory management.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

---

## ✨ Features

### Product Management
- **Product Creation** — Add new products with relevant product information.
- **Product Listing** — View product records in an organized table interface.
- **Product Details** — Retrieve individual product information using a unique product ID.
- **Product Updates** — Modify existing product information.
- **Product Management Interface** — Manage product information through an intuitive dashboard.

### Application Features
- **Authentication** — Manager authentication and protected API access.
- **Sidebar Navigation** — Organized navigation between application modules.
- **Responsive Interface** — Modern application layout designed for different screen sizes.
- **Reusable Components** — Modular React components for maintainable development.
- **RESTful API Integration** — Communication between frontend, backend, and database.
- **Clean Architecture** — Separation of application logic, domain rules, infrastructure, and presentation.
- **Database Integration** — MongoDB for persistent data storage.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Building reusable user interface components |
| TypeScript | Type-safe frontend development |
| Tailwind CSS | Utility-first styling and responsive layouts |
| React Router | Client-side navigation |
| Axios | HTTP requests and API integration |
| Node.js | Backend runtime environment |
| Express.js | REST API development |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication and authorization |
| Clean Architecture | Backend separation of concerns |
| Git & GitHub | Version control and source management |

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- [MongoDB](https://www.mongodb.com/)
- Git

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd nexus-inventory
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace the placeholder values with your actual MongoDB connection string and JWT secret.

### 4. Start the Backend Server

```bash
npm run dev
```

The backend server runs at:

```text
http://localhost:3000
```

### 5. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 🏗️ Architecture

The backend follows **Clean Architecture** principles to separate business logic from external frameworks and infrastructure.

This structure improves maintainability, testability, and scalability.

### Architecture Layers

| Layer | Responsibility |
|---|---|
| Domain | Core business rules and domain models |
| Application | Use cases and application-specific business logic |
| Infrastructure | Database connections and repository implementations |
| Presentation | Controllers, routes, and HTTP request handling |

### Backend Request Flow

```text
        Client Request
              |
              v
        Express Routes
              |
              v
          Controller
              |
              v
      Application Use Case
              |
              v
      Repository Interface
              |
              v
   Repository Implementation
              |
              v
           MongoDB
```

### Dependency Injection

The backend uses a dependency container (`container.js`) to configure and connect the required application dependencies.

This helps maintain loose coupling between application components and infrastructure implementations.

## 📡 API Endpoints

**Base URL:** `http://localhost:3000`

### Product Management

| Method | Endpoint | Description |
|---|---|---|
| POST | `/master/product` | Create a new product |
| GET | `/master/product` | Retrieve all products |
| GET | `/master/product/:id` | Retrieve a product by ID |

Protected endpoints require a valid JWT Bearer token.

*Additional endpoints can be documented as update and delete functionality is implemented.*

## 📁 Project Structure

```text
nexus-inventory/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.tsx
│       └── main.tsx
│
├── server/
│   └── src/
│       ├── application/
│       │   ├── usecases/
│       │   └── interfaces/
│       │
│       ├── domain/
│       │   └── entities/
│       │
│       ├── infrastructure/
│       │   ├── database/
│       │   └── repositories/
│       │
│       ├── presentation/
│       │   ├── controllers/
│       │   └── routes/
│       │
│       └── container.js
│
├── .gitignore
└── README.md
```

*Note: This is a reference structure. Update the folder and file names to match your actual repository.*

## 🔐 Security

- Store sensitive configuration in environment variables.
- Never commit `.env` files or API credentials to GitHub.
- Use JWT to secure protected API endpoints.
- Validate incoming API requests.
- Configure appropriate CORS policies.
- Handle errors consistently across backend layers.
- Apply appropriate access controls to protected resources.

Add the following to `.gitignore`:

```gitignore
node_modules/
.env
.env.*
!.env.example
dist/
```

## 📚 Documentation

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Node.js](https://nodejs.org/docs/latest/api/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/docs/)
- [Mongoose](https://mongoosejs.com/docs/)
- [JSON Web Tokens](https://jwt.io/)

---

<p align="center">
  <strong>Built with dedication using the MERN Stack.</strong>
</p>

<p align="center">
  Developed by <strong>Megha Gopalakrishnan</strong>
</p>


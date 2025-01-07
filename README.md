# Prisma + PostgreSQL with Express.js and React.js Tutorial

Welcome to this comprehensive tutorial where you'll learn how to build a full-stack application using **Express.js** for the backend, **React.js** for the frontend, **PostgreSQL** as the database, and **Prisma** as the ORM. By the end of this guide, you'll have a fully functional application with robust authentication features and a seamless database integration. Additionally, you'll learn how to version control your project by pushing it to GitHub.

## Table of Contents

- [About This Tutorial](#about-this-tutorial)
- [Why Use Docker for PostgreSQL?](#why-use-docker-for-postgresql)
- [Introduction to Prisma ORM](#introduction-to-prisma-orm)
  - [Key Features of Prisma](#key-features-of-prisma)
  - [Benefits of Using Prisma](#benefits-of-using-prisma)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
  - [Backend Setup with Express.js and Prisma](#backend-setup-with-expressjs-and-prisma)
  - [Frontend Setup with React.js](#frontend-setup-with-reactjs)
- [Setting Up PostgreSQL with Docker](#setting-up-postgresql-with-docker)
- [Connecting Prisma to PostgreSQL](#connecting-prisma-to-postgresql)
- [Running the Application](#running-the-application)
- [Pushing to GitHub](#pushing-to-github)
- [Conclusion](#conclusion)

## About This Tutorial

In this tutorial, you'll create a full-stack application featuring:

- **Express.js**: A fast and minimalist web framework for Node.js to build your backend APIs.
- **React.js**: A popular JavaScript library for building user interfaces on the frontend.
- **PostgreSQL**: A powerful, open-source relational database system.
- **Prisma**: An open-source ORM that provides type-safe database access and migrations.
- **Docker**: To containerize your PostgreSQL instance, ensuring a consistent development environment.
- **GitHub**: For version control and collaboration.

By following this guide, you'll gain hands-on experience in setting up a modern web application stack, managing database migrations, and deploying your project to GitHub.

## Why Use Docker for PostgreSQL?

Using Docker to manage your PostgreSQL instance offers several advantages:

- **Ease of Setup**: Quickly spin up a PostgreSQL container without manual installation.
- **Consistency**: Ensure the same environment across different development machines.
- **Isolation**: Keep your database isolated from other services on your machine.
- **Portability**: Easily move your database setup between different environments.

**Other Preferred ORMs for PostgreSQL**: While Prisma is our focus, other ORMs like Drizzle, Sequelize, and Hibernate are also excellent choices depending on your project needs.

## Introduction to Prisma ORM

Prisma is a next-generation ORM that simplifies database access with type safety and an intuitive API. It seamlessly integrates with various relational databases, including PostgreSQL, MySQL, SQLite, and SQL Server.

### Key Features of Prisma

1. **Type Safety**: Generates TypeScript types based on your database schema, reducing runtime errors.
2. **Schema Modeling**: Uses a declarative `schema.prisma` file to define data models, relationships, and configurations.
3. **Query Engine**: Provides powerful CRUD operations with advanced filtering, sorting, and pagination.
4. **Data Validation**: Ensures data integrity through strong typing and model constraints.

### Benefits of Using Prisma

1. **Developer Productivity**: Enhanced by type safety, autocompletion, and schema validation.
2. **Modern Framework Compatibility**: Integrates seamlessly with frameworks like Express.js, Next.js, NestJS, and more.
3. **Efficient Migrations**: Simplifies database schema changes with easy-to-manage migrations.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v14 or later)
- **npm** or **yarn**
- **Docker** and **Docker Compose**
- **Git**

## Project Setup

We'll structure our project with separate directories for the backend and frontend.

```bash
project-root/
├── backend/
└── frontend/
```

### Backend Setup with Express.js and Prisma

1. **Initialize the Backend Project**

    ```bash
    mkdir backend
    cd backend
    npm init -y
    ```

2. **Install Required Dependencies**

    ```bash
    npm install express bcryptjs prisma @prisma/client dotenv
    npm install --save-dev nodemon @types/express @types/bcryptjs
    ```

    - **express**: Web framework for building APIs.
    - **bcryptjs**: Library for hashing passwords.
    - **prisma** and **@prisma/client**: ORM for database interactions.
    - **dotenv**: Loads environment variables from a `.env` file.
    - **nodemon**: Development tool that automatically restarts the server on code changes.

3. **Initialize Prisma**

    ```bash
    npx prisma init
    ```

    This creates a `prisma/` directory with a `schema.prisma` file and a `.env` file for environment variables.

4. **Configure `package.json` Scripts**

    Update the `scripts` section in `package.json`:

    ```json
    "scripts": {
      "start": "node src/index.js",
      "dev": "nodemon src/index.js",
      "prisma": "prisma"
    }
    ```

5. **Create the Server Entry Point**

    Create a `src/` directory and an `index.js` file inside it:

    ```javascript
    // src/index.js
    const express = require('express');
    const bcrypt = require('bcryptjs');
    const { PrismaClient } = require('@prisma/client');
    const dotenv = require('dotenv');

    dotenv.config();

    const app = express();
    const prisma = new PrismaClient();

    app.use(express.json());

    // Define your API routes here

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    ```

### Frontend Setup with React.js

1. **Initialize the Frontend Project**

    Navigate back to the project root and create the frontend directory:

    ```bash
    cd ..
    npx create-react-app frontend --template typescript
    ```

2. **Install Required Dependencies**

    ```bash
    cd frontend
    npm install axios react-router-dom
    npm install --save-dev @types/react-router-dom
    ```

    - **axios**: For making HTTP requests.
    - **react-router-dom**: For client-side routing.

## Setting Up PostgreSQL with Docker

1. **Create `docker-compose.yml`**

    In the project root, create a `docker-compose.yml` file:

    ```yaml
    version: '3.8'

    services:
      postgres:
        image: postgres:14
        restart: always
        environment:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: myappdb
        ports:
          - "5432:5432"
        volumes:
          - postgres-data:/var/lib/postgresql/data

    volumes:
      postgres-data:
    ```

2. **Start the PostgreSQL Container**

    From the project root, run:

    ```bash
    docker-compose up -d --build
    ```

3. **Verify the PostgreSQL Container is Running**

    ```bash
    docker ps -a
    ```

    You should see the PostgreSQL container listed and running.

4. **Connect to PostgreSQL Manually (Optional)**

    ```bash
    docker-compose exec postgres psql -U postgres -d myappdb
    ```

    This allows you to interact with the database directly.

## Connecting Prisma to PostgreSQL

1. **Configure Environment Variables**

    Update the `.env` file in the `backend/` directory with your PostgreSQL connection string:

    ```env
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/myappdb?schema=public"
    PORT=5000
    ```

2. **Define Your Prisma Schema**

    Edit `prisma/schema.prisma` to define your data models. For example, a simple `User` model:

    ```prisma
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }

    generator client {
      provider = "prisma-client-js"
    }

    model User {
      id        Int      @id @default(autoincrement())
      email     String   @unique
      password  String
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt
    }
    ```

3. **Run Prisma Migrations**

    ```bash
    npx prisma migrate dev --name init
    ```

    This command will:

    - Create a new migration file.
    - Apply the migration to your PostgreSQL database.
    - Generate the Prisma Client.

4. **Generate Prisma Client**

    ```bash
    npx prisma generate
    ```

    This ensures the Prisma Client is up-to-date with your schema.

5. **Launch Prisma Studio (Optional)**

    Prisma Studio provides a GUI to interact with


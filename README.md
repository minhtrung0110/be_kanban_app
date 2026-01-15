# Kanban Workspace API

![Build](https://img.shields.io/badge/build-local-blue)
![License](https://img.shields.io/badge/license-UNLICENSED-lightgrey)
![Node](https://img.shields.io/badge/node-LTS-green)
![NestJS](https://img.shields.io/badge/framework-NestJS-e0234e)
![Last Commit](https://img.shields.io/badge/last%20commit-local-lightgrey)

## Project Description
Kanban Workspace API is a backend service for managing kanban-style workspaces. It provides structured endpoints for managing users, projects, columns, tasks, and priorities, with MongoDB persistence via Mongoose. The API is designed for teams or product builders who need a clean, modular backend to power a kanban board UI.

## Branch Analysis (Current Branches)
### Branch: `work`
- **Version 1 (Product Overview):** A NestJS REST API that powers a kanban board by managing projects, columns, tasks, priorities, and users with MongoDB persistence.
- **Version 2 (Architecture Focus):** A layered, module-based backend with controllers, services, and repositories built on Mongoose schemas and a shared repository abstraction.
- **Version 3 (Operational View):** Exposes REST endpoints under `/api/v1` on port `8888`, using DTO validation and standardized API responses for consistent client integration.

## Features
- CRUD operations for users, projects, columns, tasks, and priorities.
- Task lookups enriched with related user and priority data via Mongoose population.
- Bulk task updates for re-ordering and column changes.
- Project lookup with creator information populated.
- Standardized API responses with status and payload structure.
- Environment-based MongoDB configuration and CORS enabled globally.

## Tech Stack
**Backend**
- NestJS (TypeScript)
- Mongoose (MongoDB ODM)
- class-validator for DTO validation

**Database**
- MongoDB

**Tooling**
- Jest for unit/e2e tests
- ESLint + Prettier for linting/formatting

## Project Architecture
- **Style:** Modular, layered NestJS application.
- **Layers:**
  - Controllers: REST endpoints and HTTP response handling.
  - Services: business logic.
  - Repositories: database access with a shared base repository.
  - Models: Mongoose schemas and TypeScript interfaces.

```
src/
  app.module.ts        # Root module wiring
  common/              # Shared response types
  base.repository.ts   # Generic Mongo repository abstraction
  user/                # User module (controller/service/repo/model/dto)
  project/             # Project module
  column/              # Column module
  task/                # Task module
  priority/            # Priority module
```

## Folder Structure
- `src/`: Application source code.
  - `app.module.ts`, `main.ts`: Application bootstrap and module wiring.
  - `common/response/`: API response and pagination helpers.
  - `base.repository.ts`: Shared data access helpers.
  - `user/`, `project/`, `column/`, `task/`, `priority/`: Feature modules with controllers, services, repositories, DTOs, and models.
- `test/`: Jest e2e tests and configuration.
- `img/`: Documentation assets (e.g., class diagram).

## Installation & Setup
### Prerequisites
- Node.js (LTS recommended)
- MongoDB instance

### Install Dependencies
```bash
npm install
```

## Environment Variables
Create a `.env` file in the project root:
```bash
MONGODB_URL=mongodb://localhost:27017/be_kanban_app
```

## Running the Project
### Development
```bash
npm run start:dev
```

### Production Build
```bash
npm run build
npm run start:prod
```

The API starts on `http://localhost:8888` with a global prefix of `/api/v1`.

## Scripts
- `npm run start`: Start NestJS server.
- `npm run start:dev`: Start in watch mode.
- `npm run start:debug`: Debug mode with watch.
- `npm run build`: Build TypeScript to `dist/`.
- `npm run lint`: Lint and auto-fix TypeScript files.
- `npm run format`: Format code with Prettier.
- `npm run test`: Run unit tests.
- `npm run test:e2e`: Run e2e tests.
- `npm run test:cov`: Run tests with coverage.

## Roadmap
- Add authentication/authorization for protected endpoints.
- Expand project aggregation endpoints to return full board state.
- Add pagination and filtering on list endpoints.

## Contribution Guidelines
1. Fork the repository and create a feature branch.
2. Follow the existing NestJS module structure and DTO validation patterns.
3. Run `npm run lint` and `npm run test` before submitting.

## License
UNLICENSED (MIT recommended if you plan to open source this project).

## Author
Author: Nguyen Duc Minh Trung  
Email: minhtrung4367@gmail.com  
LinkedIn: https://www.linkedin.com/in/minhtrung0110/  
Phone: +84 707 624 367  

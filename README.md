# Monorepo Template

A production-ready Nx monorepo template for building modern full-stack applications with React, NestJS, GraphQL, TypeORM and modern development tools.

## 🏗️ Architecture Overview

This monorepo follows a modular architecture with clear separation of concerns:

```
monorepo-template/
├── packages/
│   ├── timestack-front/      # React frontend application
│   ├── timestack-server/     # NestJS backend application
│   ├── timestack-ui/         # Shared UI component library
│   └── timestack-shared/     # Shared utilities and types
├── docker-compose.yml          # Development infrastructure
├── Dockerfile                  # Production container
├── vercel.json                 # Frontend deployment config
└── nx.json                     # Nx workspace configuration
```

## 📦 Package Structure

### 🎨 Frontend Application (`timestack-front`)

- **Type**: Application (`type:app`, `scope:front`)
- **Framework**: React with Vite
- **Features**:
  - GraphQL integration with code generation
  - Modern React Router setup
  - Responsive design with Tailwind CSS
  - Component-driven architecture

### 🔧 Backend Application (`timestack-server`)

- **Type**: Application (`type:app`, `scope:server`)
- **Framework**: NestJS with GraphQL
- **Features**:
  - Modular architecture with feature modules
  - Database integration with TypeORM
  - Redis-backed job queues
  - GitHub API integration
  - Health monitoring endpoints
  - Database migrations system

### 🎨 UI Component Library (`timestack-ui`)

- **Type**: Library (`type:lib`, `scope:ui`)
- **Framework**: shadcn/ui + Tailwind CSS
- **Features**:
  - Reusable component library
  - Custom design system
  - Dark/light theme support
  - Accessibility-first components

### 📚 Shared Library (`timestack-shared`)

- **Type**: Library (`type:lib`, `scope:shared`)
- **Purpose**: Cross-package utilities and types
- **Features**:
  - Type-safe utility functions
  - Shared constants and enums
  - Common validation logic

## 🎯 Available Targets

### Core Targets (All Packages)

```bash
# Type checking
nx typecheck <package>

# Code linting
nx lint <package>

# Build for production
nx build <package>
```

### Frontend-Specific Targets (`timestack-front`)

```bash
# Development server
nx dev timestack-front

# Build for production
nx build timestack-front

# Preview production build
nx preview timestack-front

# Generate GraphQL types
nx graphql:codegen timestack-front
```

### Backend-Specific Targets (`timestack-server`)

```bash
# Start development server
nx start timestack-server

# Start production server
nx start:production timestack-server

# Database migrations
nx migration:deploy timestack-server
nx migration:revert timestack-server
nx migration:generate timestack-server --name=CreateUsers
nx migration:create timestack-server --name=AddIndexes
nx migration:show timestack-server
nx migration:schema:sync timestack-server
```

### UI Library Targets (`timestack-ui`)

```bash
# Add shadcn/ui components
nx shadcn:component:add timestack-ui --component=button
nx shadcn:component:add timestack-ui --component=dialog
```

### Multi-Package Operations

```bash
# Build all packages
nx run-many -t build

# Type check all packages
nx run-many -t typecheck

# Lint all packages
nx run-many -t lint

# Run affected tasks only
nx affected -t build,test,lint
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 20+ (specified in `.nvmrc`)
- Yarn 4.4.0+
- Docker & Docker Compose

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd monorepo-template

# Install dependencies
yarn install

# Start development infrastructure
docker-compose up -d

# Start backend development server
nx start timestack-server

# Start frontend development server (in another terminal)
nx dev timestack-front
```

### Environment Configuration

Create `.env` file in the root directory:

```env
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_NAME=postgres

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6378
REDIS_DB=0

# Server
SERVER_PORT=3000
SERVER_URL=http://localhost:3000

# GitHub Integration (optional)
GITHUB_PERSONAL_TOKEN=your_github_token

# Environment
NODE_ENV=development
```

## 🔧 Architecture Patterns

### Module Boundaries

The workspace enforces strict module boundaries:

- **Frontend** (`scope:front`): Can depend on `ui`, `shared`
- **Backend** (`scope:server`): Can depend on `shared` only
- **UI Library** (`scope:ui`): Can depend on `shared` only
- **Shared** (`scope:shared`): No external dependencies

### Database Schema Organization

- **`core`**: Application core entities
- **`discovery_source`**: Data discovery and integration
- **`public`**: Default PostgreSQL schema

### GraphQL Architecture

- Code-first approach with NestJS
- Automatic schema generation
- Type-safe client code generation
- Apollo Client with caching

## 🐳 Docker & Deployment

### Development Environment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Production Deployment

```bash
# Build production image
docker build -t monorepo-template .

# Run production container
docker run -p 3000:3000 monorepo-template
```

### Frontend Deployment (Vercel)

The frontend is configured for automatic deployment to Vercel:

- Build command: `yarn nx build timestack-front`
- Output directory: `packages/timestack-front/dist`
- Framework: Vite
- Supports SPA routing with rewrites

## 🧪 Testing

```bash
# Run all tests
nx run-many -t test

# Run tests for specific package
nx test timestack-server
nx test timestack-front

# Run tests in watch mode
nx test timestack-server --watch

# Run tests with coverage
nx run-many -t test --coverage
```

## 📈 Performance & Optimization

### Build Optimization

- **SWC**: Fast TypeScript compilation
- **Vite**: Optimized frontend builds
- **Nx Caching**: Intelligent build caching
- **Tree Shaking**: Unused code elimination

### Development Experience

- **Hot Module Replacement**: Fast development iterations
- **TypeScript**: Type safety across the stack
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent code formatting

## 🔄 Code Generation

### Adding New Components

```bash
# Generate React component
nx g @nx/react:component MyComponent --project=timestack-front

# Generate NestJS module
nx g @nx/nest:module my-feature --project=timestack-server

# Add shadcn/ui component
nx shadcn:component:add timestack-ui --component=card
```

### Database Migrations

```bash
# Generate migration from entity changes
nx migration:generate timestack-server --name=AddUserTable

# Create empty migration
nx migration:create timestack-server --name=CustomMigration

# Run migrations
nx migration:deploy timestack-server
```

## 📝 Customization Guide

### Adding New Packages

1. Create package directory: `packages/your-package/`
2. Add `project.json` with appropriate configuration
3. Update `tsconfig.json` references
4. Configure module boundaries in `eslint.config.mjs`

### Technology Replacements

- **Database**: Replace TypeORM configuration in `packages/timestack-server/src/database/`
- **Styling**: Modify Tailwind configuration in `tailwind.preset.js`
- **UI Components**: Customize shadcn/ui in `packages/timestack-ui/components.json`
- **Build Tool**: Update Vite configuration for frontend changes

## 🚀 Production Considerations

### Security

- Environment variable validation
- CORS configuration
- Authentication middleware ready
- Database connection security

### Scalability

- Horizontal scaling with Redis
- Database connection pooling
- CDN-ready static assets
- Microservice architecture support

### Monitoring

- Health check endpoints
- Structured logging
- Error tracking ready
- Performance monitoring hooks

## 📚 Additional Resources

- [Nx Documentation](https://nx.dev)
- [NestJS Documentation](https://docs.nestjs.com)
- [React Documentation](https://react.dev)
- [TypeORM Documentation](https://typeorm.io)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

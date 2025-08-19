# @timestack/server

A robust NestJS backend application providing GraphQL APIs, database management, job processing, and third-party integrations. Built with modern Node.js patterns and production-ready features.

## 🚀 Technology Stack

### Core Framework

- **NestJS 11.0.0**: Scalable Node.js server framework
- **TypeScript 5.8.2**: Type-safe server development
- **Node.js 20**: Latest LTS runtime environment

### GraphQL & API

- **Apollo Server 4.12.2**: Production-ready GraphQL server
- **NestJS GraphQL**: Code-first GraphQL schema generation
- **GraphiQL**: Interactive GraphQL playground

### Database & ORM

- **TypeORM 0.3.25**: Advanced ORM with migrations
- **PostgreSQL 15**: Primary relational database
- **Database Migrations**: Version-controlled schema changes
- **Custom Schemas**: Multi-tenant database organization

### Caching & Queues

- **Redis**: High-performance caching and session storage
- **BullMQ**: Robust job queue processing
- **IORedis**: Advanced Redis client with clustering support

### Third-Party Integrations

- **GitHub GraphQL API**: Repository and user data integration
- **Octokit**: Official GitHub API client
- **RESTful APIs**: External service integrations

### Development & Production

- **Hot Reload**: Development server with file watching
- **Environment Configuration**: Type-safe config management
- **Health Monitoring**: Application health endpoints
- **Structured Logging**: Production-ready logging

## 🏗️ Project Structure

```
packages/timestack-server/
├── src/
│   ├── database/
│   │   ├── datasource/         # Database connection configuration
│   │   ├── entities/           # TypeORM entity definitions
│   │   │   └── core/          # Core business entities
│   │   ├── migrations/         # Database migration files
│   │   └── redis/             # Redis configuration and services
│   ├── modules/
│   │   ├── app/               # Application core module
│   │   ├── example/           # Example GraphQL resolvers
│   │   │   ├── models/        # GraphQL models
│   │   │   └── resolvers/     # GraphQL resolvers
│   │   ├── graphql/           # GraphQL module configuration
│   │   ├── health/            # Health check endpoints
│   │   ├── integration/       # Third-party integrations
│   │   │   └── github/        # GitHub API integration
│   │   └── queue/             # Background job processing
│   ├── assets/                # Static server assets
│   ├── app.module.ts          # Root application module
│   └── main.ts                # Application bootstrap
├── project.json               # Nx project configuration
├── tsconfig.app.json          # TypeScript application config
├── tsconfig.json              # Base TypeScript config
└── README.md                  # This file
```

## 🎯 Available Targets

### Development & Runtime

```bash
# Start development server
nx start timestack-server

# Start production server
nx start:production timestack-server

# Build for production
nx build timestack-server

# Build with optimizations
nx build:production timestack-server
```

### Database Operations

```bash
# Deploy pending migrations
nx migration:deploy timestack-server

# Revert last migration
nx migration:revert timestack-server

# Generate migration from entity changes
nx migration:generate timestack-server --name=CreateUserTable

# Create empty migration file
nx migration:create timestack-server --name=AddIndexesToUserTable

# Show migration status
nx migration:show timestack-server

# Sync schema (development only)
nx migration:schema:sync timestack-server
```

### Quality Assurance

```bash
# Type checking
nx typecheck timestack-server

# Code linting
nx lint timestack-server

# Fix linting issues
nx lint timestack-server --fix

# Run tests
nx test timestack-server

# Run tests with coverage
nx test timestack-server --coverage

# Run tests in watch mode
nx test timestack-server --watch
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 20+ (specified in root `.nvmrc`)
- Yarn 4.4.0+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 6+

### Quick Start

```bash
# Install dependencies (from root)
yarn install

# Start infrastructure services
docker-compose up -d

# Run database migrations
nx migration:deploy timestack-server

# Start development server
nx start timestack-server

# GraphQL Playground available at http://localhost:3000/graphql
```

### Environment Configuration

Create `.env` file in the root directory:

```env
# Server Configuration
SERVER_PORT=3000
NODE_ENV=development

# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_NAME=postgres

# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6378
REDIS_DB=0
REDIS_TLS=false
REDIS_TLS_INSECURE=true

# GitHub Integration (Optional)
GITHUB_PERSONAL_TOKEN=your_github_token

# Additional Configuration
CORS_ORIGIN=http://localhost:4173
```

## 🗄️ Database Architecture

### Schema Organization

The application uses multiple PostgreSQL schemas for logical separation:

- **`public`**: Default PostgreSQL schema
- **`core`**: Core business entities and data
- **`discovery_source`**: Data discovery and integration metadata

### Entity Structure

```typescript
// Core entities example
@Entity({ schema: 'core', name: 'mcp' })
export class Mcp extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### Migration Workflow

```bash
# 1. Modify entities
# 2. Generate migration
nx migration:generate timestack-server --name=DescriptiveName

# 3. Review generated migration
# 4. Deploy to database
nx migration:deploy timestack-server
```

## 📊 GraphQL API

### Schema-First Approach

The server uses NestJS's code-first approach for GraphQL schema generation:

```typescript
@Resolver(() => Author)
export class AuthorsResolver {
  @Query(() => Author)
  author(@Args('id', { type: () => Int }) id: number): Author {
    return { id, firstName: 'John', lastName: 'Doe' };
  }

  @ResolveField()
  posts(@Parent() author: Author): Post[] {
    return [{ id: 1, title: 'Sample Post', votes: 10 }];
  }
}
```

### GraphQL Playground

Access the interactive GraphQL playground at:

- Development: `http://localhost:3000/graphql`
- Production: Disabled for security

### Example Queries

```graphql
# Get author with posts
query GetAuthor($id: Int!) {
  author(id: $id) {
    id
    firstName
    lastName
    posts {
      id
      title
      votes
    }
  }
}
```

## 🔄 Background Jobs & Queues

### Queue Configuration

```typescript
@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: createRedisConfig(configService),
      }),
    }),
  ],
})
export class QueueModule {}
```

### Job Processing

```typescript
@Processor('data-processing')
export class DataProcessor {
  @Process('process-data')
  async handleDataProcessing(job: Job<DataPayload>) {
    // Background job processing logic
    console.log('Processing data:', job.data);
  }
}
```

### Queue Management

```bash
# Queue monitoring available via Redis Insight
# Access at http://localhost:8001 when using docker-compose
```

## 🔌 Third-Party Integrations

### GitHub Integration

```typescript
@Injectable()
export class GithubGraphqlService {
  private githubClient: typeof gql | null = null;

  constructor(private readonly configService: ConfigService) {}

  async getRepository(owner: string, name: string) {
    const client = this.getGithubGraphqlClient();

    return await client(
      `
      query GetRepository($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          id
          name
          description
          stargazerCount
        }
      }
    `,
      { owner, name }
    );
  }
}
```

### Configuration

```typescript
// GitHub service configuration
@Injectable()
export class GithubService {
  constructor(
    private readonly githubGraphql: GithubGraphqlService,
    private readonly configService: ConfigService
  ) {}

  async fetchRepositoryData(repoUrl: string) {
    // Integration logic
  }
}
```

## 🏥 Health Monitoring

### Health Check Endpoints

```typescript
@Controller('health')
export class HealthController {
  @Get()
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'timestack-server',
    };
  }

  @Get('database')
  async databaseHealth() {
    // Database connectivity check
  }

  @Get('redis')
  async redisHealth() {
    // Redis connectivity check
  }
}
```

### Available Endpoints

- `GET /v1/health` - General health status
- `GET /v1/health/database` - Database connectivity
- `GET /v1/health/redis` - Redis connectivity

## 🛡️ Security & Authentication

### CORS Configuration

```typescript
// Configured in main.ts
app.enableCors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4173',
  credentials: true,
});
```

### Environment Validation

```typescript
// Type-safe configuration
export class ConfigService {
  get<T>(key: string, defaultValue?: T): T {
    return (process.env[key] as T) || defaultValue;
  }
}
```

### API Security

- Input validation with class-validator
- Type safety with TypeScript
- Environment-based configuration
- Structured error handling

## 📈 Performance & Optimization

### Caching Strategy

```typescript
@Injectable()
export class CacheService {
  constructor(private readonly redis: RedisService) {}

  async get<T>(key: string): Promise<T | null> {
    const cached = await this.redis.getClient().get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async set<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
    await this.redis.getClient().setex(key, ttl, JSON.stringify(value));
  }
}
```

### Database Optimization

- Connection pooling with TypeORM
- Query optimization with proper indexing
- Schema-based data isolation
- Migration-driven schema evolution

### Build Optimization

- SWC for fast TypeScript compilation
- Tree shaking for smaller bundles
- Development vs production configurations

## 🐳 Docker & Deployment

### Development Environment

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - '5432:5432'

  redis:
    image: redis/redis-stack:latest
    ports:
      - '6378:6379'
      - '8001:8001' # Redis Insight UI
```

### Production Deployment

```dockerfile
# Multi-stage build for optimized production image
FROM node:20-alpine

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN yarn install

# Build application
COPY . .
RUN yarn nx build timestack-server --configuration=production

# Start application
EXPOSE 3000
CMD ["yarn", "nx", "start", "timestack-server", "--configuration=production"]
```

## 🧪 Testing Strategy

### Unit Testing

```typescript
// Example test file
describe('AuthorsResolver', () => {
  let resolver: AuthorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorsResolver],
    }).compile();

    resolver = module.get<AuthorsResolver>(AuthorsResolver);
  });

  it('should return author data', () => {
    const result = resolver.author(1);
    expect(result).toHaveProperty('id', 1);
  });
});
```

### Integration Testing

```typescript
// Database integration tests
describe('Database Integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should connect to database', async () => {
    // Database connection tests
  });
});
```

### Running Tests

```bash
# Unit tests
nx test timestack-server

# Integration tests
nx test:integration timestack-server

# E2E tests
nx test:e2e timestack-server

# Coverage report
nx test timestack-server --coverage
```

## 🔧 Module Development

### Creating New Modules

```bash
# Generate new module
nx g @nx/nest:module feature-name --project=timestack-server

# Generate resolver
nx g @nx/nest:resolver feature-name --project=timestack-server

# Generate service
nx g @nx/nest:service feature-name --project=timestack-server
```

### Module Structure

```typescript
@Module({
  imports: [
    // Module dependencies
  ],
  providers: [
    // Services, resolvers, etc.
  ],
  exports: [
    // Exported services
  ],
})
export class FeatureModule {}
```

### GraphQL Resolver Pattern

```typescript
@Resolver(() => EntityModel)
export class EntityResolver {
  constructor(private readonly entityService: EntityService) {}

  @Query(() => [EntityModel])
  async entities(): Promise<EntityModel[]> {
    return this.entityService.findAll();
  }

  @Mutation(() => EntityModel)
  async createEntity(
    @Args('input') input: CreateEntityInput
  ): Promise<EntityModel> {
    return this.entityService.create(input);
  }
}
```

## 📊 Monitoring & Logging

### Structured Logging

```typescript
import { Logger } from '@nestjs/common';

@Injectable()
export class MyService {
  private readonly logger = new Logger(MyService.name);

  async processData(data: any) {
    this.logger.log('Processing data', { dataId: data.id });

    try {
      // Processing logic
      this.logger.log('Data processed successfully', { dataId: data.id });
    } catch (error) {
      this.logger.error('Data processing failed', error.stack, {
        dataId: data.id,
      });
    }
  }
}
```

### Performance Monitoring

```typescript
// Custom decorator for performance monitoring
export function Track() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const start = Date.now();
      const result = await originalMethod.apply(this, args);
      const duration = Date.now() - start;

      console.log(`${propertyKey} executed in ${duration}ms`);
      return result;
    };
  };
}
```

## 🤝 Contributing

### Development Workflow

1. Create feature branch from `main`
2. Implement changes with tests
3. Run quality checks:
   ```bash
   nx lint timestack-server
   nx typecheck timestack-server
   nx test timestack-server
   ```
4. Create database migration if needed
5. Update documentation
6. Submit pull request

### Code Standards

- Use TypeScript for type safety
- Follow NestJS architectural patterns
- Write comprehensive tests
- Use dependency injection
- Implement proper error handling
- Add logging for debugging

### Database Migration Guidelines

- Always create migrations for schema changes
- Use descriptive migration names
- Test migrations in development
- Include rollback logic
- Document complex migrations

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Apollo Server Documentation](https://apollographql.com/docs/apollo-server)
- [BullMQ Documentation](https://docs.bullmq.io)
- [PostgreSQL Documentation](https://postgresql.org/docs)
- [Redis Documentation](https://redis.io/documentation)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)

# @timestack/shared

A TypeScript utility library providing shared functionality, types, constants, and helper functions used across all packages in the monorepo. This package ensures consistency and reduces code duplication between frontend, backend, and UI components.

## 🎯 Purpose

The shared package serves as the foundation for:

- **Type Definitions**: Common TypeScript interfaces and types
- **Utility Functions**: Reusable helper functions and validators
- **Constants**: Application-wide constants and enums
- **Common Logic**: Business logic used across multiple packages
- **API Contracts**: Shared data transfer objects and schemas

## 🚀 Technology Stack

### Core Technologies

- **TypeScript 5.8.2**: Strict type definitions and utilities
- **Nx Build System**: Optimized library builds
- **Tree Shaking**: Unused code elimination for optimal bundles

### Supported Environments

- **Node.js 20+**: Server-side usage in NestJS applications
- **Modern Browsers**: ES2022+ compatible for frontend applications
- **Build Tools**: Compatible with Vite, Webpack, and other bundlers

## 🏗️ Project Structure

```
packages/timestack-shared/
├── src/
│   ├── util/                   # Utility functions and helpers
│   │   ├── validation/         # Input validation utilities
│   │   ├── formatting/         # Data formatting helpers
│   │   ├── string/            # String manipulation utilities
│   │   ├── date/              # Date and time utilities
│   │   └── collection/        # Array and object utilities
│   ├── types/                  # TypeScript type definitions
│   │   ├── api/               # API request/response types
│   │   ├── entities/          # Business entity types
│   │   └── common/            # Common utility types
│   ├── constants/              # Application constants
│   │   ├── errors/            # Error codes and messages
│   │   ├── config/            # Configuration constants
│   │   └── enums/             # Application enums
│   ├── schemas/               # Validation schemas
│   └── index.ts               # Main export file
├── project.json               # Nx project configuration
├── tsconfig.lib.json          # TypeScript library config
├── tsconfig.json              # Base TypeScript config
├── package.json               # Package metadata
└── README.md                  # This file
```

## 🎯 Available Targets

### Development

```bash
# Build the library
nx build timestack-shared

# Build in watch mode
nx build timestack-shared --watch

# Type checking
nx typecheck timestack-shared

# Code linting
nx lint timestack-shared
```

### Quality Assurance

```bash
# Run tests
nx test timestack-shared

# Run tests with coverage
nx test timestack-shared --coverage

# Run tests in watch mode
nx test timestack-shared --watch
```

## 📦 Utility Functions

### Validation Utilities

```typescript
// String validation
export function isNonEmpty(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isNull<T>(value: T | null): value is null {
  return value === null;
}

export function isUndefined<T>(value: T | undefined): value is undefined {
  return value === undefined;
}

export function isNullOrUndefined<T>(
  value: T | null | undefined
): value is null | undefined {
  return isNull(value) || isUndefined(value);
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// URL validation
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
```

### Array and Object Utilities

```typescript
// Array utilities
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function groupBy<T, K extends keyof any>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    (groups[key] = groups[key] || []).push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// Object utilities
export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}
```

### String Utilities

```typescript
// String formatting
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, '');
}

export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/\s+/g, '_')
    .toLowerCase();
}

// String generation
export function generateId(length: number = 8): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

### Date Utilities

```typescript
// Date formatting
export function formatDate(
  date: Date,
  format: 'short' | 'long' | 'iso' = 'short'
): string {
  switch (format) {
    case 'short':
      return date.toLocaleDateString();
    case 'long':
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    case 'iso':
      return date.toISOString();
    default:
      return date.toLocaleDateString();
  }
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function differenceInDays(dateLeft: Date, dateRight: Date): number {
  const diffTime = Math.abs(dateLeft.getTime() - dateRight.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
```

## 🔧 Type Definitions

### Common Types

```typescript
// API Response types
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Entity base types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimestampedEntity {
  createdAt: Date;
  updatedAt: Date;
}

// User types
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isActive: boolean;
}

export interface UserProfile {
  id: string;
  displayName: string;
  bio?: string;
  website?: string;
  location?: string;
}
```

### Request/Response Types

```typescript
// Authentication
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Resource operations
export interface CreateResourceRequest<T> {
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
}

export interface UpdateResourceRequest<T> {
  id: string;
  data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>;
}

export interface DeleteResourceRequest {
  id: string;
}
```

### Utility Types

```typescript
// Advanced utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type NonNullable<T> = T extends null | undefined ? never : T;

export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];
```

## 📋 Constants and Enums

### Application Constants

```typescript
// Error codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;
```

### Application Enums

```typescript
// User roles
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

// Entity status
export enum EntityStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  DELETED = 'deleted',
}

// Notification types
export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

// File types
export enum FileType {
  IMAGE = 'image',
  DOCUMENT = 'document',
  VIDEO = 'video',
  AUDIO = 'audio',
  ARCHIVE = 'archive',
}
```

## 🔄 Usage Examples

### In Frontend Applications

```typescript
// React component example
import { isNonEmpty, formatDate, User, ApiResponse } from '@timestack/shared';

interface UserListProps {
  users: User[];
}

function UserList({ users }: UserListProps) {
  const activeUsers = users.filter((user) => user.isActive);

  return (
    <div>
      {activeUsers.map((user) => (
        <div key={user.id}>
          <h3>{isNonEmpty(user.firstName) ? user.firstName : 'Unknown'}</h3>
          <p>Joined: {formatDate(user.createdAt, 'long')}</p>
        </div>
      ))}
    </div>
  );
}
```

### In Backend Applications

```typescript
// NestJS service example
import { Injectable } from '@nestjs/common';
import {
  isValidEmail,
  generateId,
  User,
  CreateResourceRequest,
} from '@timestack/shared';

@Injectable()
export class UserService {
  async createUser(request: CreateResourceRequest<User>): Promise<User> {
    const { email, firstName, lastName } = request.data;

    // Validation using shared utilities
    if (!isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    // Create user with generated ID
    const user: User = {
      id: generateId(16),
      email,
      firstName,
      lastName,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return user;
  }
}
```

### Form Validation

```typescript
// Form validation with shared utilities
import { isNonEmpty, isValidEmail } from '@timestack/shared';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

function validateForm(data: FormData): string[] {
  const errors: string[] = [];

  if (!isNonEmpty(data.firstName)) {
    errors.push('First name is required');
  }

  if (!isNonEmpty(data.lastName)) {
    errors.push('Last name is required');
  }

  if (!isNonEmpty(data.email)) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Email format is invalid');
  }

  return errors;
}
```

## 🧪 Testing

### Unit Tests

```typescript
// Example test file
import { isNonEmpty, isValidEmail, capitalize } from '@timestack/shared';

describe('String Utilities', () => {
  describe('isNonEmpty', () => {
    it('should return true for non-empty strings', () => {
      expect(isNonEmpty('hello')).toBe(true);
      expect(isNonEmpty(' test ')).toBe(true);
    });

    it('should return false for empty or null values', () => {
      expect(isNonEmpty('')).toBe(false);
      expect(isNonEmpty('   ')).toBe(false);
      expect(isNonEmpty(null)).toBe(false);
      expect(isNonEmpty(undefined)).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
    });
  });
});
```

### Running Tests

```bash
# Run all tests
nx test timestack-shared

# Run tests with coverage
nx test timestack-shared --coverage

# Run tests in watch mode
nx test timestack-shared --watch
```

## 📦 Build and Distribution

### Building the Library

```bash
# Build for production
nx build timestack-shared

# Build output structure
packages/timestack-shared/dist/
├── src/
│   ├── util/              # Compiled utility functions
│   ├── types/             # Type definitions
│   ├── constants/         # Constants and enums
│   └── index.js          # Main entry point
├── package.json          # Package metadata
└── *.d.ts               # TypeScript declarations
```

### Package.json Configuration

```json
{
  "name": "@timestack/shared",
  "version": "1.0.0",
  "main": "./src/index.js",
  "types": "./src/index.d.ts",
  "exports": {
    ".": {
      "import": "./src/index.js",
      "require": "./src/index.js",
      "types": "./src/index.d.ts"
    }
  },
  "files": ["src", "*.d.ts"],
  "sideEffects": false
}
```

## 🔧 Development Guidelines

### Adding New Utilities

1. Create function in appropriate utility directory
2. Add comprehensive TypeScript types
3. Write unit tests with good coverage
4. Export from main `index.ts` file
5. Update documentation

### Type Definition Standards

- Use strict TypeScript configurations
- Prefer interfaces over types for object shapes
- Use utility types for complex transformations
- Document complex types with JSDoc comments

### Testing Requirements

- Unit test all public functions
- Test edge cases and error conditions
- Maintain >90% code coverage
- Use descriptive test names

## 🤝 Contributing

### Development Workflow

1. Create feature branch from `main`
2. Implement utility with tests
3. Run quality checks:
   ```bash
   nx lint timestack-shared
   nx typecheck timestack-shared
   nx test timestack-shared
   ```
4. Build and verify output:
   ```bash
   nx build timestack-shared
   ```
5. Submit pull request

### Code Standards

- Use TypeScript strict mode
- Follow functional programming patterns
- Avoid external dependencies when possible
- Write pure functions without side effects
- Use JSDoc for complex functions

## 📚 Resources

- [TypeScript Handbook](https://typescriptlang.org/docs)
- [Nx Library Guide](https://nx.dev/concepts/more-concepts/library-types)
- [TypeScript Utility Types](https://typescriptlang.org/docs/handbook/utility-types.html)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)

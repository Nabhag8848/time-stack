# @timestack/front

A modern React frontend application built with the latest React 19, Vite, and TypeScript. This application provides a beautiful, responsive user interface for the platform with full GraphQL integration and modern development tooling.

## 🚀 Technology Stack

### Core Framework

- **React 19.0.0**: Latest React with concurrent features
- **TypeScript 5.8.2**: Type-safe development
- **Vite 6.0.0**: Fast development server and optimized builds
- **React Router DOM 6.29.0**: Client-side routing with data loading

### GraphQL Integration

- **Apollo Client 3.13.8**: Comprehensive GraphQL client with caching
- **GraphQL Code Generator**: Automatic type generation from schema
- **Apollo React Hooks**: Declarative data fetching

### UI & Styling

- **@timestack/ui**: Custom component library
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern component primitives
- **React Helmet Async**: Document head management

### Development Tools

- **Vite**: Development server with HMR
- **ESLint**: Code linting with React hooks rules
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## 🏗️ Project Structure

```
packages/timestack-front/
├── src/
│   ├── modules/
│   │   ├── app/                 # Application core
│   │   │   ├── components/      # App-level components
│   │   │   ├── enums/          # Application enums
│   │   │   └── hooks/          # Custom React hooks
│   │   ├── graphql/            # GraphQL integration
│   │   │   ├── generated/      # Auto-generated types
│   │   │   ├── apollo-client.ts
│   │   │   ├── apollo-provider.tsx
│   │   │   └── codegen.ts
│   │   └── ui/                 # UI utilities
│   │       ├── layout/         # Layout components
│   │       └── utilities/      # UI helper utilities
│   ├── assets/                 # Static assets
│   ├── public/                 # Public assets
│   ├── main.tsx               # Application entry point
│   └── index.html             # HTML template
├── project.json               # Nx project configuration
├── tsconfig.app.json         # TypeScript config
├── tsconfig.json             # Base TypeScript config
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
```

## 🎯 Available Targets

### Development

```bash
# Start development server
nx dev timestack-front

# Development server with host binding
nx dev timestack-front --host

# Development server on specific port
nx dev timestack-front --port 4200
```

### Build & Preview

```bash
# Build for production
nx build timestack-front

# Build with type checking
nx typecheck timestack-front && nx build timestack-front

# Preview production build
nx preview timestack-front

# Serve static files
nx serve-static timestack-front
```

### GraphQL Code Generation

```bash
# Generate GraphQL types and hooks
nx graphql:codegen timestack-front

# Watch for schema changes and regenerate
nx graphql:codegen timestack-front --watch
```

### Quality Assurance

```bash
# Type checking
nx typecheck timestack-front

# Linting
nx lint timestack-front

# Fix linting issues
nx lint timestack-front --fix

# Run tests
nx test timestack-front

# Run tests in watch mode
nx test timestack-front --watch
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 20+ (specified in root `.nvmrc`)
- Yarn 4.4.0+
- Running backend server (timestack-server)

### Quick Start

```bash
# Install dependencies (from root)
yarn install

# Start the development server
nx dev timestack-front

# Open browser to http://localhost:4173
```

### Environment Configuration

Create `.env.local` in the package root for local development:

```env
# Backend GraphQL endpoint
VITE_SERVER_URL=http://localhost:3000

# Enable development features
VITE_NODE_ENV=development

# GraphQL endpoint for code generation
SERVER_URL=http://localhost:3000
```

## 🎨 Features & Architecture

### Routing & Navigation

- **React Router 6**: Modern routing with data loading
- **Nested Routes**: Hierarchical page structure
- **Route Protection**: Authentication-aware routing
- **Dynamic Imports**: Code splitting for optimal performance

### State Management

- **Apollo Client**: GraphQL state management and caching
- **React Context**: Global application state
- **Local State**: Component-level state with hooks
- **URL State**: Router-managed state synchronization

### UI Components

- **Design System**: Consistent component library
- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme**: Automatic theme switching
- **Accessibility**: WCAG compliant components

### Performance Optimizations

- **Code Splitting**: Route-based lazy loading
- **Bundle Optimization**: Vite's optimized bundling
- **Image Optimization**: Modern image formats
- **Caching Strategy**: Apollo Client intelligent caching

## 📊 GraphQL Integration

### Schema Integration

The application automatically generates TypeScript types from the GraphQL schema:

```tsx
// Auto-generated hooks from GraphQL operations
import { useGetUsersQuery, useCreateUserMutation } from '@/graphql/generated';

function UsersList() {
  const { data, loading, error } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Apollo Client Configuration

```tsx
// Configured with automatic error handling and caching
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: `${process.env.VITE_SERVER_URL}/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      // Custom caching strategies
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
  },
});
```

### Code Generation Workflow

```bash
# 1. Update GraphQL operations in .ts/.tsx files
# 2. Run code generation
nx graphql:codegen timestack-front

# 3. Import generated hooks
import { useMyQueryQuery } from '@/graphql/generated';
```

## 🧩 Component Architecture

### Page Components

```tsx
// pages/HomePage.tsx
import { PageTitle } from '@/ui/utilities/page-title/components/page-title';
import { DefaultLayout } from '@/ui/layout/components/default-layout';

export function HomePage() {
  return (
    <DefaultLayout>
      <PageTitle title="Home" />
      {/* Page content */}
    </DefaultLayout>
  );
}
```

### Layout System

```tsx
// ui/layout/components/default-layout.tsx
import { Outlet } from 'react-router-dom';
import { Navigation } from './navigation';
import { Footer } from './footer';

export function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

### Custom Hooks

```tsx
// hooks/use-create-router.tsx
import { createBrowserRouter } from 'react-router-dom';
import { AppPath } from '@/app/enums/app-path';

export const useCreateRouter = () => {
  return createBrowserRouter([
    {
      path: AppPath.HOME,
      element: <HomePage />,
      loader: async () => {
        // Data loading logic
      },
    },
  ]);
};
```

## 🎯 Development Patterns

### Error Boundaries

```tsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router />
    </ErrorBoundary>
  );
}
```

### Loading States

```tsx
import { Skeleton } from '@timestack/ui';

function DataComponent() {
  const { data, loading } = useQuery(GET_DATA);

  if (loading) {
    return <Skeleton className="h-4 w-full" />;
  }

  return <div>{data}</div>;
}
```

### Form Handling

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  return <form onSubmit={handleSubmit(onSubmit)}>{/* Form fields */}</form>;
}
```

## 🚀 Deployment

### Build Configuration

```bash
# Production build
nx build timestack-front

# Build output
packages/timestack-front/dist/
├── assets/          # Bundled CSS, JS, and other assets
├── index.html      # Entry HTML file
└── ...             # Other static assets
```

### Vercel Deployment

The application is configured for automatic Vercel deployment:

```json
// vercel.json (in root)
{
  "buildCommand": "yarn nx build timestack-front",
  "outputDirectory": "packages/timestack-front/dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Environment Variables (Production)

```env
# Production environment
VITE_SERVER_URL=https://api.yourapp.com
VITE_NODE_ENV=production
```

## 🧪 Testing Strategy

### Unit Testing

```bash
# Run tests
nx test timestack-front

# Coverage report
nx test timestack-front --coverage

# Watch mode
nx test timestack-front --watch
```

### Component Testing

```tsx
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MyComponent } from './MyComponent';

test('renders component correctly', () => {
  render(
    <MockedProvider>
      <MyComponent />
    </MockedProvider>
  );

  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### E2E Testing (Future)

- Playwright or Cypress integration
- User journey testing
- Visual regression testing

## 📈 Performance Monitoring

### Bundle Analysis

```bash
# Analyze bundle size
npm run build -- --analyze

# Lighthouse audit
npx lighthouse http://localhost:4173 --output html
```

### Performance Best Practices

- Route-based code splitting
- Image optimization with WebP
- Lazy loading for non-critical resources
- Service worker for caching (future)

## 🔧 Customization

### Adding New Routes

```tsx
// 1. Define route enum
export enum AppPath {
  HOME = '/',
  ABOUT = '/about',
  NEW_ROUTE = '/new-route'
}

// 2. Create page component
export function NewRoutePage() {
  return <div>New Route</div>;
}

// 3. Add to router configuration
{
  path: AppPath.NEW_ROUTE,
  element: <NewRoutePage />
}
```

### Custom Theme

```tsx
// Extend the UI library theme
import { ThemeProvider } from '@timestack/ui';

const customTheme = {
  colors: {
    primary: '#your-color',
  },
};

function App() {
  return <ThemeProvider theme={customTheme}>{/* App content */}</ThemeProvider>;
}
```

## 🤝 Contributing

### Code Standards

- Use TypeScript for all new code
- Follow React functional component patterns
- Implement proper error boundaries
- Write comprehensive tests
- Follow accessibility guidelines

### Pull Request Process

1. Create feature branch from `main`
2. Implement changes with tests
3. Run quality checks: `nx lint timestack-front && nx typecheck timestack-front`
4. Build successfully: `nx build timestack-front`
5. Submit PR with clear description

## 📚 Resources

- [React 19 Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Apollo Client Documentation](https://apollographql.com/docs/react)
- [React Router Documentation](https://reactrouter.com)
- [TypeScript React Guide](https://react-typescript-cheatsheet.netlify.app)
- [Nx React Documentation](https://nx.dev/recipes/react)

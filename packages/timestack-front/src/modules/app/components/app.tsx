import { useState } from 'react';
import { Button, Badge } from '@timestack/ui';
import {
  Search,
  Package,
  Database,
  Globe,
  Settings,
  User,
  Code,
  Sparkles,
  Github,
  Star,
  Zap,
  Layers,
  Terminal,
  Workflow,
  Heart,
} from 'lucide-react';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const features = [
    {
      icon: Package,
      label: 'Package Management',
      description: 'Nx monorepo with Yarn workspaces',
      category: 'Architecture',
    },
    {
      icon: Globe,
      label: 'Full-Stack Setup',
      description: 'React frontend + NestJS backend',
      category: 'Framework',
    },
    {
      icon: Database,
      label: 'Database Integration',
      description: 'TypeORM with PostgreSQL and Redis',
      category: 'Backend',
    },
    {
      icon: Code,
      label: 'GraphQL API',
      description: 'Type-safe API with code generation',
      category: 'API',
    },
    {
      icon: Layers,
      label: 'UI Component Library',
      description: 'shadcn/ui with Tailwind CSS design system',
      category: 'Frontend',
    },
    {
      icon: Workflow,
      label: 'Development Tools',
      description: 'ESLint, Prettier, TypeScript, Vitest',
      category: 'DevTools',
    },
  ];

  const categories = [
    'All',
    'Architecture',
    'Framework',
    'Backend',
    'Frontend',
    'API',
    'DevTools',
  ];

  const stats = [
    { label: 'Packages', value: '4', icon: Package },
    { label: 'Technologies', value: '15+', icon: Sparkles },
    { label: 'Build Targets', value: '25+', icon: Terminal },
  ];

  const packages = [
    {
      name: 'timestack-front',
      description: 'React 19 frontend with Vite and Apollo Client',
      tech: 'React • TypeScript • GraphQL',
      type: 'Application',
    },
    {
      name: 'timestack-server',
      description: 'NestJS backend with GraphQL and TypeORM',
      tech: 'NestJS • PostgreSQL • Redis',
      type: 'Application',
    },
    {
      name: 'timestack-ui',
      description: 'Shared component library with shadcn/ui',
      tech: 'shadcn/ui • Tailwind • Radix',
      type: 'Library',
    },
    {
      name: 'timestack-shared',
      description: 'Common utilities and type definitions',
      tech: 'TypeScript • Utilities',
      type: 'Library',
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg shadow-lg">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Monorepo Template
              </h1>
              <p className="text-sm text-muted-foreground">
                with <span className="text-primary">Nx</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Button
                size="sm"
                onClick={() => {
                  window.open(
                    'https://github.com/Nabhag8848/monorepo-architecture/blob/main/README.md',
                    '_blank'
                  );
                }}
              >
                View Documentation
              </Button>
              {/* Curved Arrow */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
            <Heart className="w-4 h-4 mr-2 text-red-500" />
            Proudly Open Source
          </Badge>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Nx + React + Nest
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A production-ready monorepo template for building modern full stack
            applications with React, Shadcn/ui, NestJS, GraphQL and TypeORM.
          </p>

          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 mt-8 pt-8 border-t border-border/40">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg mb-2 mx-auto">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="space-y-4">
            <div className="relative">
              <div
                className={`relative bg-card border border-border rounded-lg transition-all duration-200 ${
                  isSearchFocused ? 'ring-2 ring-ring shadow-lg' : 'shadow-sm'
                }`}
              >
                <div className="flex items-center px-4 py-3">
                  <Search className="w-5 h-5 text-muted-foreground mr-3" />
                  <input
                    type="text"
                    placeholder="Explore features and packages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                  />
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <kbd className="px-2 py-1 bg-muted rounded border">⌘</kbd>
                    <kbd className="px-2 py-1 bg-muted rounded border">K</kbd>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === 'All' ? 'default' : 'ghost'}
                  size="sm"
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Key Features
              </h3>
              <Button variant="link" size="sm" className="text-xs">
                View Documentation →
              </Button>
            </div>

            <div className="space-y-1">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-md mr-3 group-hover:bg-primary/10 transition-colors">
                    <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {item.category}
                    </span>
                    <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      ⌘{index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Packages */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Package Architecture
            </h3>
            <p className="text-sm text-muted-foreground">
              Modular workspace with clear separation of concerns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors bg-card/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-primary" />
                    <h4 className="font-medium text-foreground">{pkg.name}</h4>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {pkg.type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {pkg.description}
                </p>
                <p className="text-xs text-muted-foreground">{pkg.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 bg-background/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                <Package className="w-4 h-4 text-primary" />
              </div>
              <div className="text-sm text-muted-foreground">
                Build by{' '}
                <a
                  href="https://x.com/NabhagMotivaras"
                  className="text-primary"
                >
                  Nabhag
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a
                href="https://github.com/Nabhag8848/monorepo-architecture"
                className="hover:text-foreground transition-colors"
              >
                Documentation
              </a>
              <a
                href="https://github.com/Nabhag8848/monorepo-architecture"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://github.com/Nabhag8848/monorepo-architecture/tree/main/packages/timestack-ui#-usage-examples"
                className="hover:text-foreground transition-colors"
              >
                Examples
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

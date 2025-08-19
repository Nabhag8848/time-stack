# @timestack/ui

A modern, accessible UI component library built with [shadcn/ui](https://ui.shadcn.com), [Tailwind CSS](https://tailwindcss.com), and TypeScript. This library provides a comprehensive set of reusable components for building consistent user interfaces across the monorepo.

## 🎨 Design System

### Features

- **Accessibility First**: All components follow WCAG guidelines
- **Dark/Light Theme**: Built-in theme support with CSS variables
- **Type Safe**: Full TypeScript support with proper type definitions
- **Customizable**: Easy to customize with Tailwind CSS utilities
- **Modern**: Built on latest React patterns and best practices

### Technology Stack

- **shadcn/ui**: Base component library
- **Tailwind CSS 3.4.3**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible component primitives
- **Lucide React**: Beautiful & consistent icon set
- **CSS Variables**: Dynamic theming support

## 🚀 Installation & Setup

### Prerequisites

This library is designed to work within the Nx monorepo. If you're using it externally:

```bash
npm install @timestack/ui
# or
yarn add @timestack/ui
```

### Configuration

The library uses a shared Tailwind configuration. Ensure your consuming application includes the preset:

```js
// tailwind.config.js
module.exports = {
  presets: [require('@timestack/ui/tailwind.preset.js')],
  // ... your config
};
```

### CSS Setup

Import the base styles in your application:

```css
/* In your main CSS file */
@import '@timestack/ui/styles.css';
```

## 🧩 Available Components

### Form Components

- **Button**: Primary, secondary, outline, ghost variants
- **Input**: Text, email, password, number inputs
- **Textarea**: Multi-line text input
- **Select**: Dropdown selection
- **Checkbox**: Boolean selection
- **Radio**: Single choice from options
- **Switch**: Toggle component
- **Label**: Form field labels

### Layout Components

- **Card**: Content containers with header, body, footer
- **Dialog**: Modal dialogs and overlays
- **Sheet**: Slide-out panels
- **Tabs**: Tabbed content organization
- **Accordion**: Collapsible content sections
- **Separator**: Visual content separation

### Navigation Components

- **Breadcrumb**: Navigation path display
- **Pagination**: Page navigation controls
- **Navigation Menu**: Complex navigation structures

### Feedback Components

- **Alert**: Status messages and notifications
- **Toast**: Temporary notification messages
- **Progress**: Loading and progress indicators
- **Skeleton**: Loading placeholders
- **Badge**: Status and category labels

### Data Display

- **Table**: Data tables with sorting and filtering
- **Avatar**: User profile images and initials
- **Tooltip**: Contextual information on hover

## 📖 Usage Examples

### Basic Component Usage

```tsx
import { Button, Card, Input, Label } from '@timestack/ui';

function LoginForm() {
  return (
    <Card className="w-full max-w-md">
      <Card.Header>
        <Card.Title>Sign In</Card.Title>
        <Card.Description>
          Enter your credentials to access your account
        </Card.Description>
      </Card.Header>
      <Card.Content className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
      </Card.Content>
      <Card.Footer>
        <Button className="w-full">Sign In</Button>
      </Card.Footer>
    </Card>
  );
}
```

### Theme Customization

```tsx
import { Button } from '@timestack/ui';

function ThemedButton() {
  return (
    <div className="space-y-4">
      <Button variant="default">Default Button</Button>
      <Button variant="destructive">Destructive Action</Button>
      <Button variant="outline">Outline Style</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="link">Link Style</Button>
    </div>
  );
}
```

### Complex Layout Example

```tsx
import { Card, Tabs, Badge, Button, Separator } from '@timestack/ui';

function Dashboard() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Badge variant="secondary">Pro Plan</Badge>
      </div>

      <Separator />

      <Tabs defaultValue="overview" className="space-y-4">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <Card.Header>
                <Card.Title>Total Users</Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="text-2xl font-bold">1,234</p>
              </Card.Content>
            </Card>
            {/* More cards... */}
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}
```

## 🎨 Theming & Customization

### CSS Variables

The design system uses CSS variables for dynamic theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  /* ... more variables */
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  /* ... more variables */
}
```

### Custom Component Variants

Extend existing components with custom variants:

```tsx
import { cn } from '@timestack/ui/lib/utils';
import { Button } from '@timestack/ui';

const CustomButton = ({ className, ...props }) => {
  return (
    <Button
      className={cn(
        'bg-gradient-to-r from-purple-500 to-pink-500',
        'hover:from-purple-600 hover:to-pink-600',
        className
      )}
      {...props}
    />
  );
};
```

## 🛠️ Development Commands

### Adding New Components

```bash
# Add shadcn/ui components to the library
nx shadcn:component:add timestack-ui --component=button
nx shadcn:component:add timestack-ui --component=dialog
nx shadcn:component:add timestack-ui --component=dropdown-menu
```

### Available shadcn/ui Components

Run the add command with any of these components:

- `accordion`, `alert`, `alert-dialog`, `aspect-ratio`
- `avatar`, `badge`, `breadcrumb`, `button`
- `calendar`, `card`, `carousel`, `chart`
- `checkbox`, `collapsible`, `command`, `context-menu`
- `data-table`, `date-picker`, `dialog`, `drawer`
- `dropdown-menu`, `form`, `hover-card`, `input`
- `label`, `menubar`, `navigation-menu`, `pagination`
- `popover`, `progress`, `radio-group`, `scroll-area`
- `select`, `separator`, `sheet`, `skeleton`
- `slider`, `sonner`, `switch`, `table`
- `tabs`, `textarea`, `toast`, `toggle`
- `toggle-group`, `tooltip`

### Development Workflow

```bash
# Type checking
nx typecheck timestack-ui

# Linting
nx lint timestack-ui

# Build the library
nx build timestack-ui

# Watch for changes during development
nx build timestack-ui --watch
```

## 📋 Component Guidelines

### Accessibility

- Use semantic HTML elements
- Include proper ARIA attributes
- Support keyboard navigation
- Maintain color contrast ratios
- Provide screen reader support

### Performance

- Keep bundle size minimal
- Use React.memo for expensive components
- Implement proper loading states
- Optimize re-renders with useMemo/useCallback

### API Design

- Follow consistent prop naming
- Use TypeScript for type safety
- Provide sensible defaults
- Support both controlled and uncontrolled modes

## 🔄 Integration with Other Packages

### With Frontend (`timestack-front`)

```tsx
// Import components directly
import { Button, Card } from '@timestack/ui';

// Use in React components
function MyPage() {
  return (
    <Card>
      <Card.Content>
        <Button>Click me</Button>
      </Card.Content>
    </Card>
  );
}
```

### With Shared Utilities (`timestack-shared`)

```tsx
import { Button } from '@timestack/ui';
import { validateEmail } from '@timestack/shared';

function EmailForm() {
  const handleSubmit = (email: string) => {
    if (validateEmail(email)) {
      // Process email
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## 🧪 Testing

```bash
# Run component tests
nx test timestack-ui

# Run tests in watch mode
nx test timestack-ui --watch

# Run tests with coverage
nx test timestack-ui --coverage
```

### Testing Guidelines

- Test component rendering
- Test user interactions
- Test accessibility features
- Test responsive behavior
- Test theme switching

## 📦 Building for Production

```bash
# Build the library
nx build timestack-ui

# Build with type checking
nx typecheck timestack-ui && nx build timestack-ui
```

The build output includes:

- Compiled JavaScript modules
- TypeScript type definitions
- CSS stylesheets
- Component documentation

## 🤝 Contributing

### Adding New Components

1. Create feature branch from `main`
2. Implement utility with tests
3. Run quality checks:
   ```bash
   nx lint timestack-ui
   nx typecheck timestack-ui
   nx test timestack-ui
   ```
4. Build and verify output:
   ```bash
   nx build timestack-ui
   ```
5. Submit pull request

### Component Structure

```
src/components/ui/
├── component-name/
│   ├── index.ts          # Export file
│   ├── component.tsx     # Main component
│   ├── component.test.tsx # Tests
│   └── component.stories.tsx # Storybook stories (if applicable)
```

## 📚 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Radix UI Documentation](https://radix-ui.com)
- [React Accessibility Guide](https://reactjs.org/docs/accessibility.html)
- [Nx Library Documentation](https://nx.dev/concepts/more-concepts/library-types)

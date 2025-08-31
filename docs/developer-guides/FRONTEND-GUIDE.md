# 🎨 Frontend Geliştirici Rehberi

## 📐 Frontend Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **State Management**: React Context + SWR
- **UI Components**: Custom components + Headless UI
- **Icons**: Lucide React + Custom SVGs
- **Forms**: Native HTML5 + Custom validation

## 🏗️ Project Structure

```
app/
├── components/                 # Reusable components
│   ├── ui/                    # Base UI components
│   │   ├── OptimizedImage.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Skeleton.tsx
│   ├── AuthProvider.tsx       # Authentication context
│   ├── ErrorBoundary.tsx      # Error handling
│   ├── Navbar.tsx             # Navigation component
│   ├── TemplateSelector.tsx   # Template selection modal
│   └── PhonePreview.tsx       # Mobile preview component
├── [slug]/                    # Dynamic business card pages
│   ├── page.tsx              # Main business card display
│   └── qr/page.tsx           # QR code page
├── admin/                     # Admin panel components
│   ├── dashboard/
│   ├── firmalar/
│   └── temalar/
├── globals.css               # Global styles
└── layout.tsx                # Root layout
```

## 🎨 Styling System

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fefce8',
          500: '#eab308',
          600: '#ca8a04',
          900: '#713f12'
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          500: '#6b7280',
          900: '#111827'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      }
    },
  },
  plugins: [],
}
```

### Custom CSS Variables

```css
/* app/globals.css */
:root {
  /* Color system */
  --color-primary: #D4AF37;
  --color-secondary: #F7E98E;
  --color-accent: #B8860B;
  
  /* Spacing system */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Typography */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  /* Border radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f172a;
    --color-text: #f8fafc;
  }
}
```

### Mobile-First Responsive Design

```css
/* Mobile first approach */
.responsive-container {
  @apply px-4 py-6;
}

/* Tablet */
@media (min-width: 640px) {
  .responsive-container {
    @apply px-6 py-8;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .responsive-container {
    @apply px-8 py-12;
  }
}

/* Large screens */
@media (min-width: 1280px) {
  .responsive-container {
    @apply px-12 py-16;
  }
}
```

## 🧩 Component Patterns

### Base Component Structure

```typescript
// components/ui/Button.tsx
import { forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={clsx(
        // Base styles
        'inline-flex items-center justify-center font-medium rounded-lg transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        
        // Variants
        {
          'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500': variant === 'primary',
          'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500': variant === 'secondary',
          'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50': variant === 'outline',
        },
        
        // Sizes
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        
        // States
        {
          'opacity-50 cursor-not-allowed': disabled || loading,
        },
        
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
```

### Form Component Pattern

```typescript
// components/ui/FormField.tsx
interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, error, required, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <ExclamationCircleIcon className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
}

// Usage
<FormField label="Firma Adı" required error={errors.firma_adi}>
  <input
    type="text"
    className={clsx(
      'w-full px-3 py-2 border rounded-lg',
      error ? 'border-red-300' : 'border-gray-300'
    )}
    {...register('firma_adi')}
  />
</FormField>
```

## 📱 Template System

### Template Architecture

```typescript
// lib/templates/templateRegistry.ts
export interface TemplateInfo {
  id: number;
  name: string;
  description: string;
  preview: string;
  style: 'classic' | 'modern' | 'minimal' | 'corporate' | 'colorful' | 'luxury';
  colorScheme: string;
  features: string[];
}

export const TEMPLATES: TemplateInfo[] = [
  {
    id: 1,
    name: 'Gold',
    description: 'Premium altın tema - Lüks ve profesyonel görünüm',
    preview: '/img/template-previews/gold.jpg',
    style: 'luxury',
    colorScheme: 'Altın & Beyaz',
    features: ['Premium', 'Lüks', 'Profesyonel', 'Altın Vurgu']
  },
  // ... other templates
];
```

### Template Component Structure

```typescript
// lib/templates/template1-gold.ts
import { FirmaData } from '../types';

export function generateGoldTemplate(firma: FirmaData): string {
  return `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${firma.firma_adi}</title>
      <style>
        ${goldTemplateStyles}
      </style>
    </head>
    <body>
      <div class="main-container">
        ${generateHeader(firma)}
        ${generateContactInfo(firma)}
        ${generateSocialMedia(firma)}
        ${generateBankInfo(firma)}
      </div>
    </body>
    </html>
  `;
}

const goldTemplateStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  .main-container {
    background: linear-gradient(135deg, #D4AF37 0%, #F7E98E 50%, #B8860B 100%);
    min-height: 100vh;
    padding: 2rem;
  }

  /* Mobile responsive */
  @media (max-width: 480px) {
    .main-container {
      padding: 1rem;
      background-size: cover;
      background-position: center center;
    }
    
    .profile-section {
      flex-direction: column;
      text-align: center;
    }
    
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
  }

  /* Tablet responsive */
  @media (min-width: 481px) and (max-width: 768px) {
    .main-container {
      padding: 1.5rem;
    }
    
    .contact-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Desktop responsive */
  @media (min-width: 769px) {
    .main-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .contact-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
```

### Template Selector Component

```typescript
// components/TemplateSelector.tsx
interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplateId: number;
  onSelectTemplate: (templateId: number) => void;
}

export function TemplateSelector({ 
  isOpen, 
  onClose, 
  selectedTemplateId, 
  onSelectTemplate 
}: TemplateSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [previewHtmls, setPreviewHtmls] = useState<{ [key: number]: string }>({});
  
  const templatesPerPage = 15;
  
  // Filter templates
  const filteredTemplates = TEMPLATES.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Generate preview HTML for background images only
  useEffect(() => {
    if (isOpen) {
      const generatePreviews = async () => {
        const htmls: { [key: number]: string } = {};
        
        for (const template of currentTemplates) {
          const backgroundImage = `/img/bg/${template.id}.png`;
          
          const simpleHTML = `
            <style>
              * { 
                margin: 0; 
                padding: 0; 
                box-sizing: border-box; 
              }
              .bg-container {
                width: 100%;
                height: 100%;
                background: url('${backgroundImage}') no-repeat center center;
                background-size: cover;
                background-position: center center;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .template-overlay {
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 10px;
                font-weight: 500;
                white-space: nowrap;
              }
            </style>
            <div class="bg-container">
              <div class="template-overlay">${template.name}</div>
            </div>
          `;

          htmls[template.id] = simpleHTML;
        }
        
        setPreviewHtmls(htmls);
      };
      
      generatePreviews();
    }
  }, [isOpen, currentPage]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full sm:max-h-[90vh]">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Kartvizit Tasarımı Seçin
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredTemplates.length} tema mevcut
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="mt-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tema adına göre ara..."
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-gray-50 px-6 py-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Templates Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
              {currentTemplates.map((template) => (
                <div
                  key={template.id}
                  className="relative cursor-pointer group"
                  onClick={() => onSelectTemplate(template.id)}
                >
                  {/* Phone Frame */}
                  <div className="w-full aspect-[3/4] bg-black rounded-[1rem] p-1 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105">
                    <div className="w-full h-full bg-white rounded-[0.75rem] overflow-hidden relative">
                      {/* Preview Content */}
                      {previewHtmls[template.id] && (
                        <iframe
                          className="w-full h-full border-0 pointer-events-none"
                          srcDoc={`
                            <!DOCTYPE html>
                            <html>
                            <head>
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            </head>
                            <body>
                              ${previewHtmls[template.id]}
                            </body>
                            </html>
                          `}
                          title={`${template.name} Preview`}
                        />
                      )}
                    </div>
                    
                    {/* Selected Indicator */}
                    {selectedTemplateId === template.id && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                        <CheckIcon className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  
                  {/* Template Info */}
                  <div className="mt-2 text-center">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {template.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {template.colorScheme}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredTemplates.length}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 🔄 State Management

### React Context Pattern

```typescript
// components/AuthProvider.tsx
interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await signIn('credentials', {
        username: credentials.username,
        password: credentials.password,
        redirect: false,
      });

      if (response?.error) {
        throw new Error(response.error);
      }

      const session = await getSession();
      setUser(session?.user as User);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
    setUser(null);
  };

  useEffect(() => {
    getSession().then((session) => {
      setUser(session?.user as User);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### SWR Data Fetching

```typescript
// lib/hooks/useFirmalar.ts
import useSWR from 'swr';

interface UseFirmalarOptions {
  page?: number;
  limit?: number;
  search?: string;
}

export function useFirmalar(options: UseFirmalarOptions = {}) {
  const { page = 1, limit = 10, search } = options;
  
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
  });

  const { data, error, mutate, isLoading } = useSWR(
    `/api/firmalar?${query.toString()}`,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch firmalar');
      }
      return response.json();
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    firmalar: data?.data || [],
    pagination: data?.pagination,
    loading: isLoading,
    error,
    mutate,
  };
}

// Usage in component
function FirmalarList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  
  const { firmalar, pagination, loading, error } = useFirmalar({ 
    page, 
    search: search || undefined 
  });

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <SearchInput value={search} onChange={setSearch} />
      <FirmalarGrid firmalar={firmalar} />
      <Pagination 
        current={pagination?.page}
        total={pagination?.totalPages}
        onChange={setPage}
      />
    </div>
  );
}
```

## 📱 Responsive Design Patterns

### Mobile-First Breakpoints

```typescript
// lib/utils/responsive.ts
export const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const mediaQueries = {
  mobile: `(max-width: ${breakpoints.sm})`,
  tablet: `(min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.lg})`,
  desktop: `(min-width: ${breakpoints.lg})`,
};
```

### Responsive Hook

```typescript
// lib/hooks/useResponsive.ts
import { useState, useEffect } from 'react';

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...windowSize,
    isMobile: windowSize.width < 640,
    isTablet: windowSize.width >= 640 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
  };
}
```

## 🎯 Performance Optimization

### Image Optimization

```typescript
// components/ui/OptimizedImage.tsx
import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  priority = false 
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {hasError ? (
        <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
          <PhotoIcon className="h-8 w-8" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
}
```

### Code Splitting

```typescript
// Dynamic imports for large components
import dynamic from 'next/dynamic';

const TemplateSelector = dynamic(
  () => import('../components/TemplateSelector'),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);

const AdminDashboard = dynamic(
  () => import('../components/AdminDashboard'),
  {
    loading: () => <SkeletonLoader />,
    ssr: false,
  }
);
```

### Performance Monitoring

```typescript
// lib/utils/performance.ts
export function measurePerformance(name: string, fn: () => void) {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark(`${name}-start`);
    fn();
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = performance.getEntriesByName(name)[0];
    console.log(`${name} took ${measure.duration}ms`);
  } else {
    fn();
  }
}

// Usage
measurePerformance('template-render', () => {
  renderTemplate(templateData);
});
```

## 🧪 Testing

### Component Testing

```typescript
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/ui/Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading...</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies correct variant styles', () => {
    render(<Button variant="primary">Primary</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary-600');
  });
});
```

## 📋 Development Guidelines

### Code Style

```typescript
// ✅ Good: Descriptive component names
function BusinessCardPreview({ firma }: { firma: FirmaData }) {
  return (
    <div className="business-card-preview">
      {/* Component content */}
    </div>
  );
}

// ❌ Bad: Generic names
function Preview({ data }: { data: any }) {
  return <div>{/* content */}</div>;
}

// ✅ Good: Props interface
interface BusinessCardPreviewProps {
  firma: FirmaData;
  template: TemplateInfo;
  onEdit?: () => void;
  className?: string;
}

// ✅ Good: Default props
function BusinessCardPreview({ 
  firma, 
  template, 
  onEdit, 
  className = '' 
}: BusinessCardPreviewProps) {
  // Component implementation
}
```

### Accessibility

```typescript
// ✅ Good: Semantic HTML & ARIA
function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className={`modal ${isOpen ? 'open' : 'closed'}`}
    >
      <div className="modal-content">
        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </header>
        <main className="modal-body">
          {children}
        </main>
      </div>
    </div>
  );
}

// ✅ Good: Keyboard navigation
function TemplateGrid({ templates, onSelect }: TemplateGridProps) {
  const handleKeyDown = (event: React.KeyboardEvent, templateId: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(templateId);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4" role="grid">
      {templates.map((template) => (
        <div
          key={template.id}
          role="gridcell"
          tabIndex={0}
          className="template-item focus:ring-2 focus:ring-blue-500"
          onClick={() => onSelect(template.id)}
          onKeyDown={(e) => handleKeyDown(e, template.id)}
        >
          <img 
            src={template.preview} 
            alt={`${template.name} template preview`}
          />
          <h3>{template.name}</h3>
        </div>
      ))}
    </div>
  );
}
```

## 🚀 Deployment

### Build Optimization

```bash
# Production build with analysis
npm run build
npm run analyze

# Check bundle size
npx @next/bundle-analyzer
```

### Environment Variables

```bash
# .env.local (development)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_UPLOAD_URL=http://localhost:3000/uploads

# .env.production (production)  
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_UPLOAD_URL=https://yourdomain.com/uploads
```

---

> 📝 **Note**: Bu rehber sürekli güncellenmektedir. Yeni component'ler veya pattern'ler eklendiğinde bu dokümantasyonu güncelleyin.
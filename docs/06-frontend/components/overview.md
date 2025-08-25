# 🎨 Frontend Components Genel Bakış

## Component Architecture

Dijital Kartvizit sistemi, modüler ve tekrar kullanılabilir React bileşenleri üzerine inşa edilmiştir. Sistem, Next.js 14 App Router ve TypeScript kullanılarak geliştirilmiştir.

## 📁 Component Klasör Yapısı

```
app/components/
├── ui/                          # 🧩 Base UI Components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── OptimizedImage.tsx
│   ├── ProgressBar.tsx
│   └── Skeleton.tsx
├── layout/                      # 🏗️ Layout Components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx
├── business/                    # 🏢 Business Logic Components
│   ├── PhonePreview.tsx         # Kartvizit önizlemesi
│   ├── TemplateSelector.tsx     # Template seçici
│   ├── FirmaSayfasi.tsx        # Firma detay sayfası
│   └── DynamicComponents.tsx    # Dinamik içerik
├── forms/                       # 📝 Form Components
│   ├── FirmaForm.tsx
│   ├── ContactForm.tsx
│   └── FileUpload.tsx
├── marketing/                   # 📢 Marketing Components
│   ├── Hero.tsx
│   ├── PricingSection.tsx
│   ├── TrustIndicators.tsx
│   ├── HowItWorksSection.tsx
│   └── SmartFaq.tsx
└── utils/                       # 🛠️ Utility Components
    ├── FontAwesomeLoader.tsx
    ├── ErrorBoundary.tsx
    └── LoadingSpinner.tsx
```

## 🎯 Core Business Components

### 1. PhonePreview Component

**Amaç**: Kartvizit tasarımının mobil önizlemesini sağlar
**Lokasyon**: `app/components/PhonePreview.tsx`

```typescript
interface PhonePreviewProps {
  firmaAdi: string;
  yetkiliAdi: string;
  yetkiliPozisyon: string;
  profilFotoPreview: string;
  firmaLogoPreview: string;
  communicationAccounts: CommunicationAccount[];
  socialMediaAccounts: SocialMediaAccount[];
  firmaHakkinda: string;
  firmaHakkindaBaslik: string;
  templateId?: number;
  bankAccounts?: BankAccount[];
}
```

**Özellikler**:
- 📱 Mobil responsive preview
- 🎨 Template sistemine entegre
- ⚡ Real-time güncelleme
- 🖼️ Image optimization

**Kullanım Örneği**:

```jsx
<PhonePreview
  firmaAdi="ABC Teknoloji"
  yetkiliAdi="Ahmet Yılmaz"
  yetkiliPozisyon="Genel Müdür"
  profilFotoPreview="/uploads/ahmet-profile.jpg"
  firmaLogoPreview="/uploads/abc-logo.png"
  templateId={5}
  communicationAccounts={[
    { type: 'telefon', value: '+905551234567', label: 'İş Telefonu' }
  ]}
  socialMediaAccounts={[
    { platform: 'instagram', url: 'https://instagram.com/abcteknoloji' }
  ]}
  firmaHakkinda="Teknoloji alanında hizmet veren..."
  firmaHakkindaBaslik="Hakkımızda"
  bankAccounts={[
    {
      bank_name: 'Ziraat Bankası',
      bank_label: 'Ana Hesap',
      accounts: [
        { iban: 'TR12 3456 7890...', currency: 'TRY' }
      ]
    }
  ]}
/>
```

### 2. TemplateSelector Component

**Amaç**: Kullanıcıların kartvizit template'ini seçmesini sağlar
**Lokasyon**: `app/components/TemplateSelector.tsx`

```typescript
interface TemplateSelectorProps {
  selectedTemplate: number;
  onTemplateSelect: (templateId: number) => void;
  previewData?: PreviewData;
  className?: string;
}
```

**Özellikler**:
- 🎨 40+ template seçeneği
- 👁️ Live preview
- 📱 Responsive grid layout
- 🎯 Category filtering

### 3. DynamicComponents Component

**Amaç**: Template'lerde dinamik içerik render'ı
**Lokasyon**: `app/components/DynamicComponents.tsx`

```typescript
interface DynamicComponentsProps {
  components: ComponentConfig[];
  data: FirmaData;
  template: TemplateConfig;
}
```

**Özellikler**:
- 🔄 Dynamic rendering
- 🧩 Modular system
- ⚡ Performance optimized
- 🎨 Style injection

### 4. FirmaSayfasi Component

**Amaç**: Firma detay sayfasının ana bileşeni
**Lokasyon**: `app/components/FirmaSayfasi.tsx`

```typescript
interface FirmaSayfasiProps {
  firma: FirmaDetails;
  template?: TemplateConfig;
  isPreview?: boolean;
}
```

**Özellikler**:
- 🏢 Complete business card view
- 📱 Mobile-first responsive
- 🎨 Template integration
- 📊 Analytics tracking
- 🔗 Social sharing

## 🧩 Base UI Components

### 1. OptimizedImage Component

**Amaç**: Performance optimize edilmiş image component'i
**Lokasyon**: `app/components/ui/OptimizedImage.tsx`

```typescript
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fallback?: string;
  quality?: number;
}
```

**Özellikler**:
- 🖼️ Next.js Image optimization
- ⚡ Lazy loading
- 🎯 WebP support
- 🔄 Fallback handling
- 📱 Responsive sizes

### 2. ProgressBar Component

**Amaç**: Loading ve progress göstergesi
**Lokasyon**: `app/components/ui/ProgressBar.tsx`

```typescript
interface ProgressBarProps {
  progress: number; // 0-100
  color?: 'blue' | 'green' | 'red' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}
```

### 3. Skeleton Component

**Amaç**: Loading states için skeleton UI
**Lokasyon**: `app/components/ui/Skeleton.tsx`

```typescript
interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
}
```

## 📢 Marketing Components

### 1. Hero Component

**Amaç**: Ana sayfa hero section'ı
**Lokasyon**: `app/components/Hero.tsx`

**Özellikler**:
- 🎯 Call-to-action buttons
- ✨ Animated elements
- 📱 Mobile responsive
- 🎨 Brand colors

### 2. PricingSection Component

**Amaç**: Fiyatlandırma tablosu
**Lokasyon**: `app/components/PricingSection.tsx`

**Özellikler**:
- 💰 Multiple pricing tiers
- ✅ Feature comparison
- 🎯 Highlight recommended
- 📱 Mobile responsive

### 3. HowItWorksSection Component

**Amaç**: Süreç açıklama bölümü
**Lokasyon**: `app/components/HowItWorksSection.tsx`

**Özellikler**:
- 📝 Step-by-step process
- 🎨 Visual icons
- 📱 Mobile optimized
- ✨ Smooth animations

## 🎨 Styling System

### Tailwind CSS Integration

```typescript
// Tailwind config snippet
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        brand: {
          gold: '#FFD700',
          silver: '#C0C0C0',
          bronze: '#CD7F32'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### CSS-in-JS Integration

```typescript
// Styled components pattern
import { cn } from '@/app/lib/utils';

interface CardProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  variant = 'default', 
  size = 'md',
  className,
  children 
}) => {
  return (
    <div
      className={cn(
        // Base styles
        'rounded-lg border transition-colors',
        // Variants
        {
          'bg-white shadow-sm border-gray-200': variant === 'default',
          'border-2 border-dashed': variant === 'outline',
          'border-0 shadow-none': variant === 'ghost',
        },
        // Sizes
        {
          'p-3': size === 'sm',
          'p-6': size === 'md', 
          'p-8': size === 'lg',
        },
        className
      )}
    >
      {children}
    </div>
  );
};
```

## 🔄 State Management

### Local State (useState)

```typescript
// Component level state
const [loading, setLoading] = useState(false);
const [formData, setFormData] = useState<FormData>({
  firmaAdi: '',
  yetkiliAdi: '',
  // ...
});

// Form handling
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    await submitForm(formData);
  } catch (error) {
    console.error('Form submission failed:', error);
  } finally {
    setLoading(false);
  }
};
```

### Server State (React Query)

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch firms
export const useFirmalar = (page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ['firmalar', page, limit],
    queryFn: () => fetch(`/api/firmalar?page=${page}&limit=${limit}`).then(res => res.json()),
    staleTime: 5 * 60 * 1000, // 5 dakika
  });
};

// Create firm mutation
export const useCreateFirma = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: FirmaCreateData) => 
      fetch('/api/firmalar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['firmalar'] });
    },
  });
};
```

### Global State (Context)

```typescript
// Theme context
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);
  
  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      primaryColor,
      setPrimaryColor
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

## 🎯 Component Patterns

### 1. Compound Components

```typescript
// Modal compound component
interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            {children}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

Modal.Header = ({ children }: { children: ReactNode }) => (
  <div className="px-6 py-4 border-b">{children}</div>
);

Modal.Body = ({ children }: { children: ReactNode }) => (
  <div className="px-6 py-4">{children}</div>
);

Modal.Footer = ({ children }: { children: ReactNode }) => (
  <div className="px-6 py-4 border-t bg-gray-50">{children}</div>
);

// Usage
<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <Modal.Header>
    <h2>Firma Bilgileri</h2>
  </Modal.Header>
  <Modal.Body>
    <p>Form içeriği...</p>
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={() => setShowModal(false)}>Kapat</Button>
  </Modal.Footer>
</Modal>
```

### 2. Render Props

```typescript
// Data fetcher with render props
interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: string | null) => ReactNode;
}

const DataFetcher = <T,>({ url, children }: DataFetcherProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);
  
  return <>{children(data, loading, error)}</>;
};

// Usage
<DataFetcher<Firma[]> url="/api/firmalar">
  {(firmalar, loading, error) => {
    if (loading) return <Skeleton count={5} />;
    if (error) return <div>Hata: {error}</div>;
    return (
      <div>
        {firmalar?.map(firma => (
          <FirmaCard key={firma.id} firma={firma} />
        ))}
      </div>
    );
  }}
</DataFetcher>
```

### 3. Higher-Order Components (HOCs)

```typescript
// withAuth HOC
const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const { user, loading } = useAuth();
    
    if (loading) {
      return <div>Yükleniyor...</div>;
    }
    
    if (!user) {
      return <div>Giriş yapmanız gerekiyor</div>;
    }
    
    return <WrappedComponent {...props} />;
  };
};

// Usage
const AdminPanel = withAuth(() => (
  <div>Admin panel içeriği...</div>
));
```

## 📱 Responsive Design

### Breakpoint System

```typescript
// Tailwind breakpoints
const BREAKPOINTS = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet portrait
  lg: '1024px',  // Tablet landscape / Desktop
  xl: '1280px',  // Desktop
  '2xl': '1536px' // Large desktop
};

// Usage in components
<div className="
  grid grid-cols-1 gap-4
  sm:grid-cols-2 sm:gap-6
  lg:grid-cols-3 lg:gap-8
  xl:grid-cols-4
">
  {/* Grid items */}
</div>
```

### Mobile-First Approach

```typescript
// Mobile-first responsive component
const ResponsiveCard: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="
      // Mobile (default)
      p-4 rounded-lg bg-white shadow-sm
      
      // Tablet and up
      md:p-6 md:shadow-md
      
      // Desktop and up  
      lg:p-8 lg:shadow-lg lg:hover:shadow-xl lg:transition-shadow
      
      // Large desktop
      xl:p-10
    ">
      {children}
    </div>
  );
};
```

## ⚡ Performance Optimization

### Code Splitting

```typescript
// Lazy loading components
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

const App = () => (
  <div>
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <HeavyComponent />
    </Suspense>
  </div>
);
```

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react';

// Component memoization
const ExpensiveComponent = memo<ExpensiveComponentProps>(({ data, onUpdate }) => {
  // Expensive calculation
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: expensiveOperation(item)
    }));
  }, [data]);
  
  // Memoized callback
  const handleUpdate = useCallback((id: string, value: string) => {
    onUpdate(id, value);
  }, [onUpdate]);
  
  return (
    <div>
      {processedData.map(item => (
        <Item 
          key={item.id} 
          data={item}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
});
```

### Virtual Scrolling

```typescript
// Large list optimization
import { FixedSizeList as List } from 'react-window';

const VirtualizedList: React.FC<{ items: ListItem[] }> = ({ items }) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <ListItem data={items[index]} />
    </div>
  );
  
  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

## 🧪 Testing Strategy

### Unit Testing

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PhonePreview } from './PhonePreview';

describe('PhonePreview', () => {
  const mockProps = {
    firmaAdi: 'Test Firma',
    yetkiliAdi: 'Test User',
    yetkiliPozisyon: 'Manager',
    // ... other props
  };
  
  it('renders company name correctly', () => {
    render(<PhonePreview {...mockProps} />);
    expect(screen.getByText('Test Firma')).toBeInTheDocument();
  });
  
  it('displays contact information', async () => {
    const props = {
      ...mockProps,
      communicationAccounts: [
        { type: 'telefon', value: '+905551234567', label: 'İş Telefonu' }
      ]
    };
    
    render(<PhonePreview {...props} />);
    
    await waitFor(() => {
      expect(screen.getByText('+905551234567')).toBeInTheDocument();
    });
  });
  
  it('handles template changes', () => {
    const { rerender } = render(<PhonePreview {...mockProps} templateId={1} />);
    
    // Verify initial template
    expect(screen.getByTestId('template-1')).toBeInTheDocument();
    
    // Change template
    rerender(<PhonePreview {...mockProps} templateId={2} />);
    
    // Verify template change
    expect(screen.getByTestId('template-2')).toBeInTheDocument();
  });
});
```

### Integration Testing

```typescript
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FirmaSayfasi } from './FirmaSayfasi';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  
  return render(
    <QueryClientProvider client={testQueryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('FirmaSayfasi Integration', () => {
  it('loads and displays firma data', async () => {
    const mockFirma = {
      id: 1,
      firma_adi: 'Test Company',
      // ... other firma data
    };
    
    // Mock API response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: mockFirma }),
    });
    
    renderWithProviders(<FirmaSayfasi firma={mockFirma} />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Company')).toBeInTheDocument();
    });
    
    expect(fetch).toHaveBeenCalledWith('/api/firmalar/1');
  });
});
```

## 📚 İlgili Dökümanlar

- [Component API Reference](./api-reference.md) - Detaylı component API'ları
- [Styling Guide](../styling/README.md) - CSS ve Tailwind kuralları
- [Template System](../templates/README.md) - Template entegrasyonu
- [Performance Guide](../../10-performance/frontend-optimization.md) - Frontend optimizasyonu
- [Testing Guide](../../09-testing/frontend-testing.md) - Test stratejileri

---

*Son güncelleme: 2025-08-25 | Component Library Version: 1.2.0*
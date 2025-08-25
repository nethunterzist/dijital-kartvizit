# 🎨 Frontend Dokümantasyonu

Bu bölümde React/Next.js bileşenleri, UI/UX tasarım sistemi, template yapısı ve frontend geliştirme kılavuzları yer almaktadır.

## 📋 İçerik Listesi

### 📁 Alt Klasörler
- [`components/`](./components/) - React bileşen dokümantasyonları
- [`templates/`](./templates/) - Kartvizit template sistemi
- [`styling/`](./styling/) - CSS/Tailwind styling kılavuzu
- [`icons/`](./icons/) - Icon sistemi ve Font Awesome entegrasyonu

### 📄 Ana Dokümantasyon
- `component-architecture.md` - Bileşen mimarisi
- `state-management.md` - State yönetimi (React Query, Context)
- `responsive-design.md` - Responsive tasarım prensipleri
- `accessibility.md` - Erişilebilirlik kılavuzu
- `seo-optimization.md` - SEO optimizasyonu

### 🔗 İlgili Bölümler
- [Architecture](../01-architecture/) - Sistem mimarisi
- [API](../03-api/) - API entegrasyonu
- [Testing → E2E](../09-testing/e2e-tests/) - Frontend testleri

## 🧩 Temel Bileşenler

### 📱 Ana Sayfa Bileşenleri
- `Hero.tsx` - Ana hero bölümü
- `PricingSection.tsx` - Fiyatlandırma
- `TrustIndicators.tsx` - Güven göstergeleri
- `VideoFeatureSection.tsx` - Video özellik tanıtımı

### 🏢 Firma Sayfası Bileşenleri
- `FirmaSayfasi.tsx` - Ana firma sayfası bileşeni
- `TemplateSelector.tsx` - Template seçici
- `PhonePreview.tsx` - Mobil önizleme

### 🎯 Admin Panel Bileşenleri
- `DashboardLayout.tsx` - Admin layout wrapper
- `FirmaForm.tsx` - Firma oluşturma/düzenleme formu
- `TemplateManager.tsx` - Template yönetimi

## 🎨 Template Sistemi

### Template Mimarisi
```typescript
interface Template {
  id: string
  name: string
  category: string
  preview: string
  colors: ColorScheme
  layout: LayoutConfig
  components: ComponentConfig[]
}
```

### Mevcut Template Kategorileri
- **Klasik**: Geleneksel iş dünyası
- **Modern**: Çağdaş minimalist
- **Yaratıcı**: Sanatsal ve renkli
- **Lüks**: Premium görünüm

### Template Oluşturma
```typescript
// Template kaydı
export const templateGold: Template = {
  id: 'template1-gold',
  name: 'Altın Dokunuş',
  category: 'luxury',
  // ... diğer konfigürasyon
}
```

## 🎭 Styling Sistemi

### Tailwind CSS Konfigürasyonu
```javascript
// tailwind.config.js temel sınıflar
colors: {
  primary: '#1f2937',
  secondary: '#f59e0b',
  accent: '#10b981'
}
```

### CSS Organizasyonu
- `globals.css` - Global stiller
- `component-styles` - Bileşen özel stiller  
- `utility-classes` - Yardımcı sınıflar
- `responsive-utilities` - Responsive yardımcılar

## 🔧 State Management

### React Query Kullanımı
```typescript
// Firma verisi çekme
const { data, isLoading, error } = useQuery({
  queryKey: ['firmalar', id],
  queryFn: () => fetchFirma(id)
})
```

### Context API Kullanımı
- `AuthContext` - Kimlik doğrulama durumu
- `ThemeContext` - Tema yönetimi
- `FormContext` - Form durumu yönetimi

---
*Son güncelleme: 2025-08-25*
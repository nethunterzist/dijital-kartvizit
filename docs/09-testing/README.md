# 🧪 Test Dokümantasyonu

Bu bölümde unit testler, integration testler, E2E testler ve test stratejileri detaylandırılmıştır.

## 📋 İçerik Listesi

### 📁 Alt Klasörler
- [`unit-tests/`](./unit-tests/) - Birim test dokümantasyonu
- [`integration-tests/`](./integration-tests/) - Entegrasyon testleri
- [`e2e-tests/`](./e2e-tests/) - End-to-end testler
- [`performance-tests/`](./performance-tests/) - Performans testleri

### 📄 Ana Dokümantasyon
- `testing-strategy.md` - Test stratejisi ve yaklaşımları
- `test-setup.md` - Test ortamı kurulumu
- `mocking-guide.md` - Mock ve stub kullanımı
- `ci-integration.md` - CI/CD pipeline entegrasyonu
- `coverage-reports.md` - Test coverage raporları

### 🔗 İlgili Bölümler
- [Development](../02-development/) - Geliştirme ortamı
- [API](../03-api/) - API endpoint testleri
- [Frontend](../06-frontend/) - Component testleri

## 🎯 Test Piramidi

### 1. Unit Tests (70%)
- **Component Tests**: React bileşen testleri
- **Service Tests**: Backend servis testleri
- **Utility Tests**: Yardımcı fonksiyon testleri
- **Validation Tests**: Schema validation testleri

### 2. Integration Tests (20%)
- **API Route Tests**: Endpoint integration testleri
- **Database Tests**: Veritabanı entegrasyon testleri
- **Service Integration**: Servisler arası entegrasyon
- **External API Tests**: Third-party API testleri

### 3. E2E Tests (10%)
- **User Journey Tests**: Kullanıcı senaryoları
- **Cross-browser Tests**: Tarayıcı uyumluluğu
- **Mobile Tests**: Mobil cihaz testleri
- **Performance Tests**: Performans ölçümleri

## 🛠️ Test Framework'leri

### Frontend Testing
```json
{
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "jest": "^29.5.0",
    "jest-environment-jsdom": "^29.5.0"
  }
}
```

### Backend Testing
```typescript
// API route test örneği
import { createMocks } from 'node-mocks-http'
import handler from '../api/firmalar/route'

describe('/api/firmalar', () => {
  it('should return firma list', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    })
    
    await handler(req, res)
    
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toHaveProperty('data')
  })
})
```

### E2E Testing (Playwright)
```typescript
// e2e test örneği
import { test, expect } from '@playwright/test'

test('Firma oluşturma flow\'u', async ({ page }) => {
  await page.goto('/admin/firmalar/yeni')
  
  await page.fill('[data-testid="firma-adi"]', 'Test Firma')
  await page.fill('[data-testid="email"]', 'test@example.com')
  
  await page.click('[data-testid="submit-button"]')
  
  await expect(page.locator('.success-message')).toBeVisible()
})
```

## 🎪 Test Konfigürasyonu

### Jest Konfigürasyonu
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/node_modules/**'
  ]
}

module.exports = createJestConfig(customJestConfig)
```

### Playwright Konfigürasyonu
```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
})
```

## 📊 Test Coverage

### Coverage Hedefleri
- **Overall Coverage**: >80%
- **Critical Paths**: >95%
- **API Endpoints**: >90%
- **Components**: >85%
- **Utilities**: >95%

### Coverage Raporları
```bash
# Coverage raporu oluşturma
npm run test:coverage

# HTML rapor görüntüleme
open coverage/lcov-report/index.html
```

## 🚀 Test Komutları

### Development
```bash
# Tüm testleri çalıştır
npm test

# Watch modda test
npm run test:watch

# Coverage ile test
npm run test:coverage
```

### CI/CD Pipeline
```bash
# Unit testler
npm run test:unit

# Integration testler
npm run test:integration

# E2E testler
npm run test:e2e

# Performance testler
npm run test:performance
```

## 🔧 Mock ve Test Utilities

### Database Mocking
```typescript
// Test database setup
export const testDb = {
  firma: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
}
```

### API Mocking
```typescript
// MSW (Mock Service Worker) setup
import { rest } from 'msw'

export const handlers = [
  rest.get('/api/firmalar', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockFirmalar
      })
    )
  })
]
```

---
*Son güncelleme: 2025-08-25*
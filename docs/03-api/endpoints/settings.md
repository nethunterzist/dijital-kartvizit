# ⚙️ Settings API Endpoint Dokümantasyonu

## Genel Bakış

Settings API, dijital kartvizit sisteminin konfigürasyon ayarlarını yönetir. Icon sıralamaları, template ayarları ve sistem konfigürasyonları bu endpoint üzerinden kontrol edilir.

## Base URL

```
/api/settings
```

## Endpoints

### 🎨 GET /api/settings/icon-order

Sistem icon'larının sıralamasını ve özelliklerini döner.

#### Request

##### Headers

```http
Content-Type: application/json
```

#### Response

##### Success Response (200 OK)

```json
{
  "data": [
    {
      "id": "paylas",
      "label": "Paylaş",
      "icon": "fas fa-share-alt",
      "type": "system",
      "color": "#9C27B0",
      "priority": 1,
      "enabled": true
    },
    {
      "id": "qr",
      "label": "QR Kod",
      "icon": "fas fa-qrcode",
      "type": "system",
      "color": "#FFD700",
      "priority": 2,
      "enabled": true
    },
    {
      "id": "instagram",
      "label": "Instagram",
      "icon": "fab fa-instagram",
      "type": "social",
      "color": "#E4405F",
      "priority": 3,
      "enabled": true
    },
    {
      "id": "facebook",
      "label": "Facebook",
      "icon": "fab fa-facebook",
      "type": "social",
      "color": "#1877F2",
      "priority": 4,
      "enabled": true
    },
    {
      "id": "twitter",
      "label": "Twitter",
      "icon": "fab fa-twitter",
      "type": "social",
      "color": "#1DA1F2",
      "priority": 5,
      "enabled": true
    },
    {
      "id": "linkedin",
      "label": "LinkedIn",
      "icon": "fab fa-linkedin",
      "type": "social",
      "color": "#0A66C2",
      "priority": 6,
      "enabled": true
    },
    {
      "id": "youtube",
      "label": "YouTube",
      "icon": "fab fa-youtube",
      "type": "social",
      "color": "#FF0000",
      "priority": 7,
      "enabled": true
    },
    {
      "id": "tiktok",
      "label": "TikTok",
      "icon": "fab fa-tiktok",
      "type": "social",
      "color": "#000000",
      "priority": 8,
      "enabled": true
    },
    {
      "id": "telefon",
      "label": "Telefon",
      "icon": "fas fa-phone",
      "type": "communication",
      "color": "#4CAF50",
      "priority": 9,
      "enabled": true
    },
    {
      "id": "eposta",
      "label": "E-posta",
      "icon": "fas fa-envelope",
      "type": "communication",
      "color": "#FF5722",
      "priority": 10,
      "enabled": true
    },
    {
      "id": "whatsapp",
      "label": "WhatsApp",
      "icon": "fab fa-whatsapp",
      "type": "communication",
      "color": "#25D366",
      "priority": 11,
      "enabled": true
    },
    {
      "id": "telegram",
      "label": "Telegram",
      "icon": "fab fa-telegram",
      "type": "communication",
      "color": "#0088cc",
      "priority": 12,
      "enabled": true
    },
    {
      "id": "website",
      "label": "Website",
      "icon": "fas fa-globe",
      "type": "communication",
      "color": "#9C27B0",
      "priority": 13,
      "enabled": true
    },
    {
      "id": "harita",
      "label": "Harita",
      "icon": "fas fa-map-marker-alt",
      "type": "communication",
      "color": "#FF9800",
      "priority": 14,
      "enabled": true
    },
    {
      "id": "katalog",
      "label": "Katalog",
      "icon": "fas fa-book",
      "type": "other",
      "color": "#795548",
      "priority": 15,
      "enabled": true
    },
    {
      "id": "banka",
      "label": "Banka Hesapları",
      "icon": "fas fa-university",
      "type": "system",
      "color": "#FFD700",
      "priority": 16,
      "enabled": true
    },
    {
      "id": "vergi",
      "label": "Vergi Bilgileri",
      "icon": "fas fa-file-invoice",
      "type": "system",
      "color": "#2196F3",
      "priority": 17,
      "enabled": true
    },
    {
      "id": "hakkimizda",
      "label": "Hakkımızda",
      "icon": "fas fa-info-circle",
      "type": "system",
      "color": "#2196F3",
      "priority": 18,
      "enabled": true
    }
  ],
  "meta": {
    "total_icons": 18,
    "last_updated": "2024-01-15T10:30:00Z",
    "version": "1.2.0",
    "cache_ttl": 3600
  }
}
```

##### Example Usage

```bash
# Icon sıralamasını al
curl -X GET "https://yourdomain.com/api/settings/icon-order"
```

```javascript
// JavaScript ile kullanım
const getIconOrder = async () => {
  const response = await fetch('/api/settings/icon-order');
  const data = await response.json();
  return data.data;
};

// React hook örneği
import { useQuery } from '@tanstack/react-query';

const useIconOrder = () => {
  return useQuery({
    queryKey: ['icon-order'],
    queryFn: () => fetch('/api/settings/icon-order').then(res => res.json()),
    staleTime: 1000 * 60 * 60, // 1 saat cache
  });
};
```

---

### ✏️ PUT /api/settings/icon-order

Icon sıralamasını günceller (Admin gerekli).

#### Request

##### Headers

```http
Content-Type: application/json
Authorization: Bearer {admin_token}
```

##### Body

```json
{
  "icons": [
    {
      "id": "instagram",
      "priority": 1,
      "enabled": true
    },
    {
      "id": "linkedin", 
      "priority": 2,
      "enabled": true
    },
    {
      "id": "whatsapp",
      "priority": 3,
      "enabled": true
    },
    {
      "id": "telefon",
      "priority": 4,
      "enabled": true
    },
    {
      "id": "facebook",
      "priority": 5,
      "enabled": false
    }
  ]
}
```

##### Validation Rules

| Alan | Zorunlu | Tip | Min | Max | Açıklama |
|------|---------|-----|-----|-----|----------|
| `icons` | Evet | array | 1 | 50 | Icon listesi |
| `icons[].id` | Evet | string | 2 | 50 | Icon identifier |
| `icons[].priority` | Evet | integer | 1 | 999 | Sıralama önceliği |
| `icons[].enabled` | Hayır | boolean | - | - | Aktif durumu |

#### Response

##### Success Response (200 OK)

```json
{
  "message": "Icon sıralaması başarıyla güncellendi",
  "data": {
    "updated_icons": 5,
    "disabled_icons": 1,
    "total_icons": 18,
    "updated_at": "2024-01-15T11:00:00Z"
  }
}
```

##### Error Response (400 Bad Request)

```json
{
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": {
      "icons[0].priority": "Priority must be unique",
      "icons[2].id": "Unknown icon id 'invalid-icon'"
    }
  }
}
```

##### Error Response (401 Unauthorized)

```json
{
  "error": {
    "message": "Admin authentication required",
    "code": "UNAUTHORIZED"
  }
}
```

---

### 🎨 GET /api/settings/templates

Kullanılabilir template'leri ve özelliklerini döner.

#### Response

##### Success Response (200 OK)

```json
{
  "data": {
    "templates": [
      {
        "id": 1,
        "name": "Gold Classic",
        "slug": "gold-classic",
        "description": "Elegant gold design with classic layout",
        "preview_image": "/templates/previews/template-1.jpg",
        "category": "classic",
        "colors": {
          "primary": "#FFD700",
          "secondary": "#FFA500",
          "background": "#FFFFFF",
          "text": "#333333"
        },
        "features": [
          "QR Code Support",
          "Social Media Icons",
          "Contact Information",
          "Bank Details",
          "Company Logo"
        ],
        "supported_languages": ["tr", "en"],
        "mobile_optimized": true,
        "created_at": "2024-01-01T00:00:00Z",
        "version": "1.0.0",
        "active": true
      },
      {
        "id": 2,
        "name": "Modern Blue",
        "slug": "modern-blue",
        "description": "Clean modern design with blue accents",
        "preview_image": "/templates/previews/template-2.jpg",
        "category": "modern",
        "colors": {
          "primary": "#2196F3",
          "secondary": "#1976D2",
          "background": "#F5F5F5",
          "text": "#212121"
        },
        "features": [
          "Responsive Design",
          "Animation Effects",
          "QR Code Integration",
          "Multi-language Support"
        ],
        "supported_languages": ["tr", "en", "ar"],
        "mobile_optimized": true,
        "created_at": "2024-01-05T00:00:00Z",
        "version": "1.1.0",
        "active": true
      }
    ],
    "categories": [
      {
        "id": "classic",
        "name": "Klasik Tasarımlar",
        "description": "Geleneksel ve şık tasarımlar"
      },
      {
        "id": "modern", 
        "name": "Modern Tasarımlar",
        "description": "Çağdaş ve minimalist tasarımlar"
      },
      {
        "id": "creative",
        "name": "Yaratıcı Tasarımlar",
        "description": "Özgün ve artistik tasarımlar"
      }
    ]
  },
  "meta": {
    "total_templates": 2,
    "active_templates": 2,
    "total_categories": 3,
    "last_updated": "2024-01-15T10:30:00Z"
  }
}
```

---

### ⚙️ GET /api/settings/system

Sistem geneli ayarları döner.

#### Response

##### Success Response (200 OK)

```json
{
  "data": {
    "app": {
      "name": "Dijital Kartvizit",
      "version": "1.2.0",
      "build": "2024.01.15",
      "environment": "production"
    },
    "features": {
      "qr_code_generation": true,
      "social_media_integration": true,
      "bank_info_display": true,
      "catalog_upload": true,
      "multi_template_support": true,
      "custom_colors": true,
      "analytics_tracking": true
    },
    "limits": {
      "max_companies_per_user": 10,
      "max_file_upload_size": 10485760,
      "max_catalog_size": 52428800,
      "max_image_dimensions": 2048,
      "rate_limit_per_minute": 100
    },
    "supported_formats": {
      "images": ["jpg", "jpeg", "png", "webp"],
      "documents": ["pdf"],
      "export_formats": ["pdf", "vcard", "png", "html"]
    },
    "integrations": {
      "cloudinary": {
        "enabled": true,
        "max_file_size": 10485760
      },
      "supabase": {
        "enabled": true,
        "version": "2.x"
      },
      "analytics": {
        "enabled": true,
        "provider": "vercel"
      }
    },
    "cdn": {
      "base_url": "https://cdn.yourdomain.com",
      "enabled": true,
      "regions": ["us-east-1", "eu-west-1"]
    }
  },
  "meta": {
    "server_time": "2024-01-15T10:30:00Z",
    "timezone": "UTC+3",
    "locale": "tr-TR"
  }
}
```

---

## Icon Types ve Categories

### Icon Types

| Type | Açıklama | Örnek İconlar |
|------|----------|---------------|
| `system` | Sistem fonksiyonları | paylaş, qr, banka, vergi, hakkımızda |
| `social` | Sosyal medya platformları | instagram, facebook, linkedin, twitter |
| `communication` | İletişim kanalları | telefon, email, whatsapp, website |
| `other` | Diğer özel iconlar | katalog, harita, özel linkler |

### Color Palette

```css
/* Sistem renk paleti */
:root {
  --system-primary: #9C27B0;
  --system-secondary: #FFD700;
  --social-instagram: #E4405F;
  --social-facebook: #1877F2;
  --social-linkedin: #0A66C2;
  --social-twitter: #1DA1F2;
  --communication-phone: #4CAF50;
  --communication-email: #FF5722;
  --communication-whatsapp: #25D366;
}
```

### Font Awesome Integration

```html
<!-- Template içinde kullanım -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

<!-- Icon kullanımı -->
<i class="{{icon}}" style="color: {{color}};"></i>

<!-- Dinamik icon render -->
{{#each icons}}
  <div class="icon-container">
    <i class="{{this.icon}}" style="color: {{this.color}};"></i>
    <span>{{this.label}}</span>
  </div>
{{/each}}
```

---

## Configuration Management

### File-based Configuration

```typescript
// data/icon-order.json
{
  "version": "1.2.0",
  "last_updated": "2024-01-15T10:30:00Z",
  "icons": [
    {
      "id": "paylas",
      "label": "Paylaş",
      "icon": "fas fa-share-alt",
      "type": "system",
      "color": "#9C27B0",
      "priority": 1,
      "enabled": true
    }
  ]
}
```

### Database vs File Storage

```typescript
// Konfigürasyon stratejisi
const CONFIG_STORAGE = {
  ICON_ORDER: 'file', // JSON file (hızlı okuma)
  TEMPLATES: 'database', // Database (complex queries)
  SYSTEM_SETTINGS: 'environment', // Environment variables
  USER_PREFERENCES: 'database' // Database (user-specific)
};
```

### Cache Strategy

```typescript
const SETTINGS_CACHE = {
  ICON_ORDER: {
    ttl: 3600, // 1 saat
    key: 'settings:icon-order:v1'
  },
  TEMPLATES: {
    ttl: 7200, // 2 saat
    key: 'settings:templates:v1'
  },
  SYSTEM: {
    ttl: 86400, // 24 saat
    key: 'settings:system:v1'
  }
};
```

---

## Integration Examples

### React Hook for Settings

```typescript
import { useQuery } from '@tanstack/react-query';

// Icon order hook
export const useIconOrder = () => {
  return useQuery({
    queryKey: ['settings', 'icon-order'],
    queryFn: async () => {
      const response = await fetch('/api/settings/icon-order');
      if (!response.ok) throw new Error('Failed to fetch icon order');
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // 1 saat
  });
};

// Template list hook
export const useTemplates = () => {
  return useQuery({
    queryKey: ['settings', 'templates'],
    queryFn: async () => {
      const response = await fetch('/api/settings/templates');
      if (!response.ok) throw new Error('Failed to fetch templates');
      return response.json();
    },
    staleTime: 1000 * 60 * 30, // 30 dakika
  });
};
```

### Admin Panel Integration

```jsx
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function IconOrderManager() {
  const { data: iconOrder } = useIconOrder();
  const [icons, setIcons] = useState(iconOrder?.data || []);
  
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const newIcons = Array.from(icons);
    const [reorderedItem] = newIcons.splice(result.source.index, 1);
    newIcons.splice(result.destination.index, 0, reorderedItem);
    
    // Update priorities
    const updatedIcons = newIcons.map((icon, index) => ({
      ...icon,
      priority: index + 1
    }));
    
    setIcons(updatedIcons);
  };
  
  const saveOrder = async () => {
    await fetch('/api/settings/icon-order', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ icons })
    });
  };
  
  return (
    <div className="icon-order-manager">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="icons">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {icons.map((icon, index) => (
                <Draggable key={icon.id} draggableId={icon.id} index={index}>
                  {(provided) => (
                    <div 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="icon-item"
                    >
                      <i className={icon.icon} style={{ color: icon.color }} />
                      <span>{icon.label}</span>
                      <input 
                        type="checkbox"
                        checked={icon.enabled}
                        onChange={(e) => {
                          const newIcons = [...icons];
                          newIcons[index].enabled = e.target.checked;
                          setIcons(newIcons);
                        }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={saveOrder}>Kaydet</button>
    </div>
  );
}
```

---

## Performance Considerations

### File I/O Optimization

```typescript
// Singleton pattern ile file cache
class IconOrderService {
  private static instance: IconOrderService;
  private cachedData: any = null;
  private lastLoad: number = 0;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 dakika
  
  public static getInstance() {
    if (!IconOrderService.instance) {
      IconOrderService.instance = new IconOrderService();
    }
    return IconOrderService.instance;
  }
  
  public async getIconOrder() {
    const now = Date.now();
    
    if (!this.cachedData || (now - this.lastLoad) > this.CACHE_TTL) {
      this.cachedData = await this.loadFromFile();
      this.lastLoad = now;
    }
    
    return this.cachedData;
  }
  
  private async loadFromFile() {
    // File loading implementation
  }
}
```

### Memory Usage

```typescript
// Memory-efficient icon loading
const ICON_MEMORY_LIMITS = {
  MAX_ICONS: 100,
  MAX_CACHE_SIZE: 1024 * 1024, // 1MB
  CLEANUP_THRESHOLD: 0.8 // 80% usage
};
```

---

*Son güncelleme: 2025-08-25 | API Version: 1.0.0*
# 💻 Geliştirme Ortamı

Bu bölümde geliştirme ortamının kurulumu, geliştirme iş akışı ve kodlama standartları yer almaktadır.

## 📋 İçerik Listesi

### 📁 Geliştirme Kılavuzları
- `setup-guide.md` - Geliştirme ortamı kurulum kılavuzu
- `coding-standards.md` - Kod yazım standartları
- `git-workflow.md` - Git iş akışı
- `debugging-guide.md` - Hata ayıklama teknikleri
- `environment-variables.md` - Ortam değişkenleri konfigürasyonu

### 🛠️ Araçlar ve Konfigürasyon
- `package-scripts.md` - NPM script'lerinin açıklamaları
- `eslint-config.md` - ESLint konfigürasyonu
- `typescript-config.md` - TypeScript konfigürasyonu
- `prisma-workflow.md` - Prisma ORM iş akışı

### 🔗 İlgili Bölümler
- [Architecture](../01-architecture/) - Sistem mimarisi
- [Database → Migrations](../04-database/migrations/) - Veritabanı migrasyonları
- [Testing](../09-testing/) - Test yazma kılavuzları

## ⚡ Hızlı Başlangıç

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Git

### Kurulum Komutları
```bash
# Repository klonlama
git clone [repo-url]
cd dijital-kartvizit

# Bağımlılık yükleme
npm install

# Ortam değişkenleri
cp .env.example .env.local

# Veritabanı kurulumu
npm run db:push

# Geliştirme sunucusu
npm run dev
```

## 📝 Geliştirme İş Akışı

1. **Feature Branch** oluştur
2. **Local development** yap
3. **Tests** çalıştır
4. **PR** aç
5. **Code review** sonrası merge

---
*Son güncelleme: 2025-08-25*
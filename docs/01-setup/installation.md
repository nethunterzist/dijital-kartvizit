# 🚀 Dijital Kartvizit - Kurulum Rehberi

Bu rehber, yeni geliştiriciler için **Dijital Kartvizit** projesinin kapsamlı kurulum sürecini adım adım açıklar. Tüm işletim sistemleri (Windows, macOS, Linux) için uyumlu yönergeler içerir.

## 📋 İçindekiler

1. [Proje Genel Bakış](#-proje-genel-bakış)
2. [Sistem Gereksinimleri](#-sistem-gereksinimleri)
3. [Geliştirme Araçları Kurulumu](#-geliştirme-araçları-kurulumu)
4. [Proje Kurulumu](#-proje-kurulumu)
5. [IDE Konfigürasyonu](#-ide-konfigürasyonu)
6. [Doğrulama ve Test](#-doğrulama-ve-test)
7. [Sorun Giderme](#-sorun-giderme)

---

## 🎯 Proje Genel Bakış

**Dijital Kartvizit Sistemi**, modern web teknolojileri kullanarak geliştirilmiş, tamamen responsive bir dijital kartvizit oluşturma ve yönetim platformudur.

### Temel Özellikler
- 🎨 **40+ Profesyonel Template** - Sektör bazlı tasarımlar
- 📱 **Tam Responsive** - Mobil-first yaklaşım  
- ⚡ **QR Kod Entegrasyonu** - Anında paylaşım
- 🔒 **Admin Panel** - Kapsamlı yönetim sistemi
- 📤 **Çoklu Export** - PDF, vCard, URL paylaşımı
- 🏦 **Banka Entegrasyonu** - IBAN ve hesap bilgileri
- 🌐 **SEO Optimizasyonu** - Arama motoru dostu

### Teknoloji Yığını
| Katman | Teknoloji | Versiyon | Açıklama |
|--------|-----------|----------|-----------|
| **Frontend** | Next.js | 14.0.4 | React tabanlı full-stack framework |
| **Database** | Supabase (PostgreSQL) | Latest | Cloud-native database |
| **ORM** | Prisma | 6.7.0 | Type-safe database client |
| **Styling** | Tailwind CSS | 3.4.0 | Utility-first CSS framework |
| **Authentication** | NextAuth.js | 4.24.11 | Secure authentication system |
| **Deployment** | Vercel | Latest | Serverless deployment |

---

## 🔧 Sistem Gereksinimleri

### Minimum Gereksinimler
- **Node.js**: 18.0.0 veya üzeri
- **npm**: 9.0.0 veya üzeri (Node.js ile birlikte gelir)
- **Git**: 2.30.0 veya üzeri
- **RAM**: 4GB (8GB önerilen)
- **Disk Alanı**: 2GB boş alan

### Önerilen Gereksinimler
- **Node.js**: 20.x LTS
- **npm**: 10.x 
- **RAM**: 8GB veya daha fazla
- **SSD**: Hızlı geliştirme için

### İşletim Sistemi Desteği
- ✅ **Windows**: 10/11 (PowerShell veya Git Bash)
- ✅ **macOS**: 11.0 (Big Sur) veya üzeri
- ✅ **Linux**: Ubuntu 20.04+, Debian 11+, CentOS 8+

---

## ⚙️ Geliştirme Araçları Kurulumu

### 1. Node.js Kurulumu

#### Windows:
```powershell
# Chocolatey ile (önerilen)
choco install nodejs

# Manuel kurulum: https://nodejs.org/en/download/
```

#### macOS:
```bash
# Homebrew ile (önerilen)
brew install node@20

# Manuel kurulum: https://nodejs.org/en/download/
```

#### Linux (Ubuntu/Debian):
```bash
# NodeSource repository kullanarak
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Snap ile alternatif
sudo snap install node --classic
```

#### Kurulum Doğrulama:
```bash
# Node.js versiyonu kontrol et
node --version
# Beklenen: v20.x.x

# npm versiyonu kontrol et  
npm --version
# Beklenen: 10.x.x
```

### 2. Git Kurulumu

#### Windows:
```powershell
# Chocolatey ile
choco install git

# Manuel: https://git-scm.com/download/win
```

#### macOS:
```bash
# Homebrew ile
brew install git

# Xcode Command Line Tools ile
xcode-select --install
```

#### Linux:
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install git

# CentOS/RHEL
sudo yum install git
```

#### Git Konfigürasyonu:
```bash
# Global kullanıcı bilgileri (ilk kurulumda)
git config --global user.name "Adınız Soyadınız"
git config --global user.email "email@example.com"

# Versiyon kontrolü
git --version
# Beklenen: 2.30+ 
```

### 3. Yarn Kurulumu (İsteğe Bağlı)
```bash
# npm ile global yarn kurulumu
npm install -g yarn

# Versiyon kontrolü
yarn --version
# Beklenen: 1.22.x veya 3.x.x
```

---

## 📦 Proje Kurulumu

### 1. Repository Klonlama

```bash
# HTTPS ile klonlama (önerilen)
git clone https://github.com/username/dijital-kartvizit.git
cd dijital-kartvizit

# SSH ile klonlama (SSH key setup gerekli)
git clone git@github.com:username/dijital-kartvizit.git
cd dijital-kartvizit

# Proje dizini kontrolü
ls -la
```

### 2. Dependencies Kurulumu

#### npm ile:
```bash
# Ana bağımlılıkları yükle
npm install

# Cache temizleme (gerekirse)
npm cache clean --force
npm install
```

#### yarn ile:
```bash
# Ana bağımlılıkları yükle  
yarn install

# Cache temizleme (gerekirse)
yarn cache clean
yarn install
```

### 3. Package.json Scripts Analizi

Proje **package.json** içindeki önemli script'ler:

```json
{
  "scripts": {
    "dev": "next dev",                    // Development server
    "build": "prisma generate && next build",  // Production build
    "start": "next start",                // Production server
    "lint": "next lint",                  // Code linting
    "type-check": "tsc --noEmit",        // TypeScript kontrolü
    "db:push": "prisma db push",         // Database schema push
    "supabase:setup": "node scripts/supabase-auto-setup.js"
  }
}
```

### 4. Environment Variables Hazırlığı

```bash
# .env.local dosyası oluştur (şimdilik boş bırakın)
touch .env.local

# Örnek env dosyasını kontrol edin (varsa)
cat .env.example
```

**⚠️ Önemli Not**: Environment variables konfigürasyonu için [environment-setup.md](./environment-setup.md) rehberini takip edin.

---

## 🛠️ IDE Konfigürasyonu

### Visual Studio Code (Önerilen)

#### 1. VS Code Kurulumu
- **İndirme**: [https://code.visualstudio.com/](https://code.visualstudio.com/)
- Tüm işletim sistemleri için mevcut

#### 2. Önerilen Extensions

```bash
# VS Code terminali veya Command Palette (Ctrl/Cmd + P) ile yükleyin
code --install-extension bradlc.vscode-tailwindcss
code --install-extension prisma.prisma  
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension ms-vscode.vscode-json
code --install-extension ms-vscode.extension-manager
```

**Manuel Extension Kurulumu** (VS Code Extension Marketplace):
1. **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
2. **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss  
3. **Prisma** - Prisma.prisma
4. **Prettier** - esbenp.prettier-vscode
5. **TypeScript Hero** - rbbit.typescript-hero
6. **Auto Rename Tag** - formulahendry.auto-rename-tag
7. **Bracket Pair Colorizer** - CoenraadS.bracket-pair-colorizer
8. **GitLens** - eamodio.gitlens

#### 3. VS Code Settings (Workspace)

Proje root'unda `.vscode/settings.json` oluşturun:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### Alternative IDE'ler

#### WebStorm:
- Node.js plugin aktif edin
- Prettier ve ESLint konfigürasyonunu etkinleştirin

#### Vim/Neovim:
```bash
# CoC (Conquer of Completion) ile TypeScript desteği
:CocInstall coc-tsserver coc-prettier coc-eslint
```

---

## ✅ Doğrulama ve Test

### 1. Development Server Testi

```bash
# Development server'ı başlat
npm run dev

# Alternatif
yarn dev
```

**Beklenen Çıktı:**
```
> dijital-kartvizit@0.1.0 dev
> next dev

  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.100:3000

 ✓ Ready in 2.1s
```

#### Browser Test:
1. **http://localhost:3000** adresine gidin
2. Next.js default sayfasını görebilmelisiniz (henüz database bağlantısı yok)

### 2. TypeScript Kontrolü

```bash
# TypeScript compilation kontrolü
npm run type-check

# Beklenen: hatasız derleme
```

### 3. Linting Kontrolü

```bash
# ESLint kontrolü
npm run lint

# Otomatik düzeltme
npm run lint -- --fix
```

### 4. Build Testi

```bash
# Production build testi (database olmadan hata verebilir)
npm run build

# Build başarılı olmalı (database bağlantısı warnings normal)
```

---

## 🔧 Sorun Giderme

### Yaygın Kurulum Sorunları

#### 1. Node.js Version Uyumsuzluğu
```bash
# Hata: "The engine "node" is incompatible with this module"
# Çözüm: Node.js 18+ versiyonu yükleyin

# nvm kullanıyorsanız
nvm install 20
nvm use 20
```

#### 2. npm Permission Hatası (macOS/Linux)
```bash
# Hata: EACCES permission denied
# Çözüm 1: npm global dizinini değiştirin
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile

# Çözüm 2: Node.js'i nvm ile yükleyin (önerilen)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

#### 3. Git Clone Hatası
```bash
# Hata: "Repository not found" veya SSL hatası
# Çözüm 1: HTTPS kullanın
git clone https://github.com/username/dijital-kartvizit.git

# Çözüm 2: SSL doğrulamasını geçici olarak kapatın
git config --global http.sslVerify false
```

#### 4. Dependencies Installation Hatası
```bash
# Hata: npm install fails
# Çözüm 1: Cache temizleme
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install

# Çözüm 2: yarn kullanın
npm install -g yarn
yarn install
```

#### 5. Port 3000 Already in Use
```bash
# Hata: Port 3000 is already in use
# Çözüm 1: Farklı port kullanın
npm run dev -- -p 3001

# Çözüm 2: Port 3000'deki süreci durdurun
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

#### 6. TypeScript Hatası
```bash
# Hata: TypeScript compilation errors
# Çözüm: TypeScript ve @types paketlerini güncelleyin
npm install typescript@latest @types/node@latest @types/react@latest -D
```

### Performans Optimizasyonu

#### Node.js Memory Heap
```bash
# Büyük projeler için heap size artışı
export NODE_OPTIONS="--max-old-space-size=4096"
npm run dev
```

#### Windows Specific
```powershell
# PowerShell'de
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run dev
```

---

## 📚 Sonraki Adımlar

Kurulum tamamlandığında aşağıdaki rehberleri takip edin:

1. **[Environment Setup](./environment-setup.md)** - `.env.local` konfigürasyonu
2. **[Supabase Setup](./supabase-setup.md)** - Database kurulumu  
3. **[Deployment Setup](./deployment-setup.md)** - Production deployment

---

## 🆘 Yardım ve Destek

### Dokümantasyon
- **[Ana Dokümantasyon](../README.md)** - Proje genel bilgiler
- **[API Dokümantasyonu](../03-api/)** - API endpoint'leri
- **[Troubleshooting](../12-troubleshooting/)** - Detaylı sorun giderme

### İletişim
- **GitHub Issues**: [Proje Issues](https://github.com/username/dijital-kartvizit/issues)
- **Discord**: Proje Discord sunucusu (varsa link ekleyin)

---

**✅ Kurulum Tamamlandı!** 

Artık development server'ınız çalışıyor. Bir sonraki adım olarak [environment-setup.md](./environment-setup.md) rehberini takip ederek environment variables'ları konfigüre edin.

---
*Son güncelleme: 2025-08-25 | Versiyon: 1.0.0*
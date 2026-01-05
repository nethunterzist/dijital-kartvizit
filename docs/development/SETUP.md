# Development Setup Guide

Complete guide to setting up your local development environment for the Dijital Kartvizit project.

---

## Prerequisites

### Required Software

- **Node.js**: 18.x or higher ([Download](https://nodejs.org/))
- **npm**: 9.x or higher (comes with Node.js)
- **PostgreSQL**: 14.x or higher ([Download](https://www.postgresql.org/download/))
- **Git**: Latest version

### Verify Installations

```bash
node --version  # Should be v18.x or higher
npm --version   # Should be v9.x or higher
psql --version  # Should be PostgreSQL 14.x or higher
git --version   # Any recent version
```

---

## Initial Setup

### 1. Clone Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/sanalkartvizitim.git

# Navigate to project directory
cd sanalkartvizitim
```

### 2. Install Dependencies

```bash
# Install all project dependencies
npm install

# This will also run postinstall script (prisma generate)
```

**Expected Output:**
```
added 695 packages in 76s
✔ Generated Prisma Client
```

### 3. Database Setup

#### Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE dijitalkartvizit;

# Create user (optional)
CREATE USER dijital_user WITH PASSWORD 'secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE dijitalkartvizit TO dijital_user;

# Exit
\q
```

#### Configure Database URL

Create `.env` file in project root:

```bash
cp .env.example .env
```

Edit `.env` and set database connection:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/dijitalkartvizit"
```

### 4. Initialize Database Schema

```bash
# Push Prisma schema to database
npx prisma db push

# Verify tables created
npx prisma studio  # Opens GUI at http://localhost:5555
```

**Expected Output:**
```
✔ Your database is now in sync with your Prisma schema
```

### 5. Configure Environment Variables

Complete `.env` configuration:

```env
# Database (required)
DATABASE_URL="postgresql://postgres:password@localhost:5432/dijitalkartvizit"

# NextAuth (required)
NEXTAUTH_SECRET="[run: node -e \"console.log(require('crypto').randomBytes(64).toString('base64'))\"]"
NEXTAUTH_URL="http://localhost:3000"

# Node Environment
NODE_ENV="development"

# Cloudinary (optional - uses local storage if not set)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Upstash Redis (optional - graceful degradation if not set)
KV_URL=""
KV_REST_API_URL=""
KV_REST_API_TOKEN=""
```

**Generate NEXTAUTH_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

### 6. Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Ready in 2.1s
```

### 7. Verify Setup

Visit http://localhost:3000 - you should see the homepage.

**Create Default Admin:**
Visit http://localhost:3000/api/health to auto-create admin:
- Username: `admin`
- Password: `admin123`

**Access Admin Panel:**
Visit http://localhost:3000/admin and login.

---

## Optional Setup

### Cloudinary (Production File Storage)

1. Sign up at [cloudinary.com](https://cloudinary.com/)
2. Get credentials from dashboard
3. Add to `.env`:

```env
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Upstash Redis (Production Cache)

1. Sign up at [upstash.com](https://upstash.com/)
2. Create Redis database
3. Add credentials to `.env`:

```env
KV_URL="rediss://default:xxx@xxx.upstash.io:6379"
KV_REST_API_URL="https://xxx.upstash.io"
KV_REST_API_TOKEN="your-token"
```

---

## Development Workflow

### Daily Workflow

```bash
# 1. Pull latest changes
git pull

# 2. Install new dependencies (if package.json changed)
npm install

# 3. Update database schema (if schema.prisma changed)
npx prisma db push
npx prisma generate

# 4. Start development server
npm run dev
```

### File Upload Directory

Create upload directory for local development:

```bash
mkdir -p public/uploads/{profiles,logos,catalogs,banks}
```

---

## IDE Setup

### VS Code (Recommended)

**Recommended Extensions:**
```json
{
  "recommendations": [
    "prisma.prisma",
    "bradlc.vscode-tailwindcss",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "formulahendry.auto-rename-tag"
  ]
}
```

**Settings (.vscode/settings.json):**
```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## Troubleshooting Setup

### Issue: Database Connection Error

**Error:**
```
Can't reach database server at `localhost:5432`
```

**Solution:**
1. Verify PostgreSQL is running:
   ```bash
   # macOS
   brew services list

   # Linux
   sudo systemctl status postgresql

   # Windows
   services.msc  # Check PostgreSQL service
   ```

2. Check database exists:
   ```bash
   psql -U postgres -l | grep dijitalkartvizit
   ```

3. Verify DATABASE_URL in `.env`

---

### Issue: Prisma Client Not Generated

**Error:**
```
Cannot find module '@prisma/client'
```

**Solution:**
```bash
# Regenerate Prisma Client
npx prisma generate

# Restart dev server
npm run dev
```

---

### Issue: Port 3000 Already in Use

**Error:**
```
Port 3000 is already in use
```

**Solution:**
```bash
# Find and kill process using port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Or use different port
PORT=3001 npm run dev
```

---

### Issue: Module Not Found After Install

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

After completing setup:

1. **Review Architecture** - Read [../architecture/OVERVIEW.md](../architecture/OVERVIEW.md)
2. **Learn Critical Patterns** - Study [../architecture/CRITICAL_PATTERNS.md](../architecture/CRITICAL_PATTERNS.md)
3. **Explore Commands** - See [COMMANDS.md](COMMANDS.md) for development commands
4. **Start Developing** - Follow [WORKFLOWS.md](WORKFLOWS.md) for development workflows

---

## Quick Reference

**Start Development:**
```bash
npm run dev
```

**Type Check:**
```bash
npm run type-check
```

**Database Changes:**
```bash
npx prisma db push
npx prisma generate
```

**Admin Login:**
- URL: http://localhost:3000/admin
- Username: `admin`
- Password: `admin123`

---

**Setup Time:** ~15 minutes
**Last Updated:** January 2026

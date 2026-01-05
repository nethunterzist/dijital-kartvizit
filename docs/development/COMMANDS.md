# Commands Reference

Quick reference for all npm scripts and common commands used in development.

---

## Essential Commands

### Development

```bash
# Start development server (http://localhost:3000)
npm run dev

# Start on different port
PORT=3001 npm run dev
```

### Building

```bash
# Production build (includes prisma generate)
npm run build

# Build without Prisma generation (Docker)
npm run build:docker

# Analyze bundle size
ANALYZE=true npm run build
# Opens analyzer at http://localhost:8888
```

### Production

```bash
# Start production server (runs prisma generate first)
npm start

# Health check
npm run health:check
```

### Code Quality

```bash
# TypeScript type checking (no emit)
npm run type-check

# ESLint
npm run lint

# Both type-check and lint
npm run type-check && npm run lint
```

---

## Database Commands

### Prisma

```bash
# Generate Prisma Client after schema changes
npx prisma generate

# Push schema changes to database (development)
npx prisma db push

# Alias for db push
npm run db:push

# Create migration (production)
npx prisma migrate dev --name your_migration_name

# Deploy migrations (production)
npx prisma migrate deploy

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Format schema file
npx prisma format

# Validate schema
npx prisma validate

# Open Prisma Studio (GUI at http://localhost:5555)
npx prisma studio
```

### Database Inspection

```bash
# Connect to database
psql postgresql://user:pass@host:5432/database

# List tables
\dt

# Describe table
\d firmalar

# Count records
SELECT COUNT(*) FROM firmalar;

# Recent companies
SELECT firma_adi, created_at FROM firmalar ORDER BY created_at DESC LIMIT 10;
```

---

## Testing Commands

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- path/to/test.spec.ts
```

---

## Utility Commands

### File Management

```bash
# Create upload directories
mkdir -p public/uploads/{profiles,logos,catalogs,banks}

# Clean build artifacts
rm -rf .next out node_modules/.cache
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Stage and commit
git add .
git commit -m "feat: your feature description"

# Push to remote
git push origin feature/your-feature-name
```

### Environment

```bash
# Generate NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"

# Check environment variables
node -e "console.log(process.env.DATABASE_URL)"
```

---

## Production Commands (Coolify/Docker)

### Local Docker Build Test

```bash
# Build Docker image
docker build -t dijitalkartvizit .

# Run container
docker run -p 3000:3000 --env-file .env dijitalkartvizit

# View logs
docker logs [container-id] -f

# Stop container
docker stop [container-id]
```

### Remote Server (SSH)

```bash
# Connect to server
ssh root@157.180.78.53

# View application logs
docker logs [container-id] -f

# Restart application
docker restart [container-id]

# Database access
docker exec -it [db-container-id] psql -U postgres

# Run health check
curl https://dijitalkartvizitmerkezi.com/api/health
```

---

## Advanced Commands

### Bundle Analysis

```bash
# Analyze bundle with webpack-bundle-analyzer
ANALYZE=true npm run build

# This opens analyzer at http://localhost:8888 showing:
# - Bundle composition
# - Module sizes
# - Tree-shaking effectiveness
# - Duplicate dependencies
```

### Performance Profiling

```bash
# Build with profiling
npm run build -- --profile

# Lighthouse audit
npx lighthouse http://localhost:3000 --view
```

### Database Seeding

```bash
# Seed initial data (if seed script exists)
npx prisma db seed

# Custom seed scripts
node scripts/seed-admins.js
node scripts/seed-packages.js
node scripts/seed-slider.js
```

---

## Troubleshooting Commands

### Reset Everything

```bash
# Nuclear option - full clean install
rm -rf node_modules package-lock.json .next
npm install
npx prisma generate
npm run dev
```

### Fix Common Issues

```bash
# Fix type errors
npm run type-check

# Regenerate Prisma Client
npx prisma generate

# Clear Next.js cache
rm -rf .next

# Fix dependencies
npm audit fix

# Update dependencies
npm update
```

### Port Management

```bash
# Find process on port 3000
lsof -ti:3000

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Alternative: use different port
PORT=3001 npm run dev
```

---

## Quick Workflows

### After Pulling Changes

```bash
npm install          # Install new dependencies
npx prisma generate  # Regenerate if schema changed
npm run dev          # Start development
```

### Before Committing

```bash
npm run type-check  # Check TypeScript errors
npm run lint        # Check ESLint errors
npm test            # Run tests (if applicable)
git add .
git commit -m "your message"
```

### Deploying to Production

```bash
# Via Coolify (automatic)
git push origin main  # Triggers auto-deploy

# Manual deployment
npm run build         # Test build locally
npm start            # Test production server
# Then push to trigger deploy
```

---

## Related Documentation

- **[SETUP.md](SETUP.md)** - Initial setup guide
- **[WORKFLOWS.md](WORKFLOWS.md)** - Development workflows
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues

---

**Last Updated:** January 2026

# Dijital Kartvizit Documentation

Welcome to the comprehensive documentation for the Dijital Kartvizit platform. This documentation hub provides organized guides for developers, DevOps engineers, and administrators.

## 📚 Documentation by Role

### For Developers
- **[Quick Start](development/SETUP.md)** - Get your development environment running
- **[Commands Reference](development/COMMANDS.md)** - All npm scripts and common commands
- **[Development Workflows](development/WORKFLOWS.md)** - Adding features, database changes, testing
- **[Troubleshooting](development/TROUBLESHOOTING.md)** - Common issues and solutions

### For System Architects
- **[Architecture Overview](architecture/OVERVIEW.md)** - System architecture and tech stack
- **[Critical Patterns](architecture/CRITICAL_PATTERNS.md)** - Prisma lazy-loading, caching, graceful degradation
- **[Database Schema](architecture/DATABASE_SCHEMA.md)** - Complete schema reference
- **[Services](architecture/SERVICES.md)** - Service layer documentation

### For API Consumers
- **[API Endpoints](api/ENDPOINTS.md)** - Complete API reference with examples
- **[Validation Schemas](api/VALIDATION.md)** - Request validation reference
- **[Error Handling](api/ERROR_HANDLING.md)** - Error response formats

### For DevOps Engineers
- **[Production Deployment](infrastructure/PRODUCTION.md)** - Hetzner + Coolify deployment guide
- **[Webhook Setup Guide](infrastructure/WEBHOOK_SETUP_GUIDE.md)** - Automatic deployment configuration
- **[Quick Webhook Setup](infrastructure/QUICK_WEBHOOK_SETUP.md)** - 5-minute webhook setup
- **[Webhook Troubleshooting](infrastructure/WEBHOOK_TROUBLESHOOTING.md)** - Common webhook issues
- **[Monitoring & Health Checks](infrastructure/MONITORING.md)** - Health checks and alerting
- **[Production Snapshot](infrastructure/PRODUCTION_SNAPSHOT.md)** - Current live state (Jan 5, 2026)
- **[Server Deep Dive](infrastructure/SERVER_DEEP_DIVE.md)** - SSH technical analysis (Jan 5, 2026)

## 📖 Documentation Structure

```
docs/
├── README.md                    # This file - Documentation hub
│
├── architecture/                # System architecture
│   ├── OVERVIEW.md             # Architecture and tech stack
│   ├── CRITICAL_PATTERNS.md    # Critical design patterns
│   ├── DATABASE_SCHEMA.md      # Database schema reference
│   └── SERVICES.md             # Service layer docs
│
├── api/                        # API documentation
│   ├── ENDPOINTS.md            # API endpoint reference
│   ├── VALIDATION.md           # Validation schemas
│   └── ERROR_HANDLING.md       # Error responses
│
├── development/                # Development guides
│   ├── SETUP.md                # Local setup guide
│   ├── COMMANDS.md             # Command reference
│   ├── WORKFLOWS.md            # Development workflows
│   └── TROUBLESHOOTING.md      # Common issues
│
├── infrastructure/             # Infrastructure & deployment
│   ├── PRODUCTION.md           # Production deployment
│   ├── WEBHOOK_SETUP_GUIDE.md  # Automatic deployment configuration
│   ├── QUICK_WEBHOOK_SETUP.md  # 5-minute webhook setup
│   ├── WEBHOOK_TROUBLESHOOTING.md # Common webhook issues
│   ├── MONITORING.md           # Monitoring & health checks
│   ├── PRODUCTION_SNAPSHOT.md  # Current production state (Jan 5, 2026)
│   └── SERVER_DEEP_DIVE.md     # SSH technical analysis (Jan 5, 2026)
│
└── deployment-reports/         # Deployment history and reports
    ├── pricing-feature-activation-report.md  # Pricing feature deployment (Dec 2025)
    └── cloudinary-upload-fix-report.md       # Cloudinary upload fix (Jan 5, 2026)
```

## 🚀 Quick Links

### Essential Reading for New Developers
1. [Development Setup](development/SETUP.md) - First-time setup
2. [Critical Patterns](architecture/CRITICAL_PATTERNS.md) - Must-know patterns
3. [Commands Reference](development/COMMANDS.md) - Daily commands

### Essential Reading for Production Deployment
1. [Production Deployment Guide](infrastructure/PRODUCTION.md) - Complete deployment walkthrough
2. [Webhook Setup Guide](infrastructure/WEBHOOK_SETUP_GUIDE.md) - Automatic deployment configuration ⚡
3. [Production Snapshot](infrastructure/PRODUCTION_SNAPSHOT.md) - Current live environment state
4. [Server Deep Dive](infrastructure/SERVER_DEEP_DIVE.md) - SSH technical analysis & security audit
5. [Architecture Overview](architecture/OVERVIEW.md) - Understand the system
6. [Monitoring Setup](infrastructure/MONITORING.md) - Health checks and alerts

## 🔗 Related Documentation

- **[CLAUDE.md](../CLAUDE.md)** - Claude Code development guide (concise reference)
- **[README.md](../README.md)** - Project overview and features (Turkish)
- **[schema.prisma](../schema.prisma)** - Database schema source

## 📝 Contributing to Documentation

When updating documentation:
1. Keep guides focused on a single topic
2. Include code examples where relevant
3. Update this index if adding new guides
4. Cross-reference related documentation
5. Test all commands and examples

## 🆘 Need Help?

- **Can't find what you need?** Check the [Troubleshooting Guide](development/TROUBLESHOOTING.md)
- **Have questions?** See [CLAUDE.md](../CLAUDE.md) for quick reference
- **Found an issue?** Please report it or submit a PR with fixes

---

**Last Updated:** January 2026
**Project:** Dijital Kartvizit Platform
**Live Site:** https://dijitalkartvizitmerkezi.com

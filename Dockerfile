# =================================================================
# Dijital Kartvizit - Production Docker Image
# Multi-stage build optimized for Next.js 14
# Compatible with Coolify v4 deployment
# =================================================================

# Stage 1: Dependencies
# Install production dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY schema.prisma ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Generate Prisma client
RUN npx prisma generate

# =================================================================
# Stage 2: Builder
# Build the Next.js application
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Set environment for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application (without prisma generate - already done in deps)
RUN npm run build:docker

# =================================================================
# Stage 3: Production dependencies
# Create clean production node_modules
FROM node:20-alpine AS prod-deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json package-lock.json* ./
COPY schema.prisma ./

# Install production dependencies only
RUN npm ci --only=production

# Generate Prisma client for production
RUN npx prisma generate

# =================================================================
# Stage 4: Runner
# Production runtime with minimal footprint
FROM node:20-alpine AS runner
WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache libc6-compat openssl wget

# Set environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy built application
COPY --from=builder /app/.next ./.next

# Copy production dependencies
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy necessary config files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/schema.prisma ./

# Set correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set hostname
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the application
CMD ["npm", "start"]

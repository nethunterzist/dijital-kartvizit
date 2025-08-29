#!/bin/bash

echo "🚀 DIRECT DEPLOYMENT TO HETZNER (No Docker)..."

# Variables
HOST="46.62.171.65"
USER="root"
APP_DIR="/opt/dijital-kartvizit"

# Create deployment archive
echo "📦 Creating deployment archive..."
tar -czf dijital-kartvizit.tar.gz --exclude=node_modules --exclude=.git --exclude=.next .

# Upload to server
echo "📤 Uploading to server..."
scp dijital-kartvizit.tar.gz $USER@$HOST:/tmp/

echo "🔄 Deploying on server..."
ssh $USER@$HOST << 'ENDSSH'
    # Install Node.js if not exists
    if ! command -v node &> /dev/null; then
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
        apt-get install -y nodejs
    fi
    
    # Install PM2 if not exists
    if ! command -v pm2 &> /dev/null; then
        npm install -g pm2
    fi
    
    # Setup application directory
    mkdir -p /opt/dijital-kartvizit
    cd /opt/dijital-kartvizit
    
    # Stop existing application
    pm2 stop dijital-kartvizit 2>/dev/null || true
    pm2 delete dijital-kartvizit 2>/dev/null || true
    
    # Extract new code
    tar -xzf /tmp/dijital-kartvizit.tar.gz
    
    # Install dependencies
    npm install
    
    # Set environment variables
    export NODE_ENV=production
    export DATABASE_URL="postgresql://postgres:v1JuQjXhW6g23DdR7TVpFz4z0aanP5uGGzXf2r0GPphCa71fF7qoIj6z197rjR34@46.62.171.65:5432/dijitalkartvizit?sslmode=disable"
    export NEXTAUTH_URL="https://fowksko404s008ogkg4gw0gk.46.62.171.65.sslip.io"
    export NEXTAUTH_SECRET="your_secret_key_here"
    
    # Generate Prisma client
    npx prisma generate
    
    # Build application
    npm run build
    
    # Start with PM2
    pm2 start npm --name "dijital-kartvizit" -- start
    pm2 save
    
    # Setup nginx if not exists
    if ! command -v nginx &> /dev/null; then
        apt update && apt install -y nginx
    fi
    
    # Copy nginx config
    cp /tmp/nginx.conf /etc/nginx/sites-available/dijital-kartvizit 2>/dev/null || echo "nginx.conf not found, skipping"
    ln -sf /etc/nginx/sites-available/dijital-kartvizit /etc/nginx/sites-enabled/ 2>/dev/null || true
    rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
    
    # Test and reload nginx
    nginx -t && systemctl reload nginx 2>/dev/null || echo "nginx setup failed"
    
    echo "✅ DIRECT DEPLOYMENT COMPLETE!"
    echo "🌐 App should be available at: https://fowksko404s008ogkg4gw0gk.46.62.171.65.sslip.io"
ENDSSH

# Cleanup local files
rm -f dijital-kartvizit.tar.gz

echo "🎉 DEPLOYMENT FINISHED!"
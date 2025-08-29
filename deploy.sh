#!/bin/bash

echo "🚀 STARTING MANUAL DEPLOYMENT TO HETZNER..."

# Variables
APP_NAME="dijital-kartvizit"
HOST="46.62.171.65"
USER="root"

# Build and deploy
echo "📦 Building Docker image..."
docker build -t $APP_NAME:latest .

echo "💾 Saving Docker image..."
docker save $APP_NAME:latest | gzip > ${APP_NAME}.tar.gz

echo "📤 Uploading to server..."
scp ${APP_NAME}.tar.gz docker-compose.prod.yml nginx.conf $USER@$HOST:/tmp/

echo "🔄 Deploying on server..."
ssh $USER@$HOST << 'ENDSSH'
    cd /tmp
    
    # Stop existing containers
    docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    
    # Load new image
    docker load < dijital-kartvizit.tar.gz
    
    # Create SSL directory and self-signed cert if not exists
    mkdir -p /etc/nginx/ssl
    if [ ! -f /etc/nginx/ssl/cert.pem ]; then
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout /etc/nginx/ssl/key.pem \
            -out /etc/nginx/ssl/cert.pem \
            -subj "/C=TR/ST=Istanbul/L=Istanbul/O=DijitalKartvizit/CN=fowksko404s008ogkg4gw0gk.46.62.171.65.sslip.io"
    fi
    
    # Start new containers
    docker-compose -f docker-compose.prod.yml up -d
    
    # Setup nginx if not exists
    if ! command -v nginx &> /dev/null; then
        apt update && apt install -y nginx
    fi
    
    # Copy nginx config
    cp nginx.conf /etc/nginx/sites-available/dijital-kartvizit
    ln -sf /etc/nginx/sites-available/dijital-kartvizit /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
    
    # Test and reload nginx
    nginx -t && systemctl reload nginx
    
    echo "✅ DEPLOYMENT COMPLETE!"
    echo "🌐 App should be available at: https://fowksko404s008ogkg4gw0gk.46.62.171.65.sslip.io"
ENDSSH

# Cleanup local files
rm -f ${APP_NAME}.tar.gz

echo "🎉 DEPLOYMENT FINISHED!"
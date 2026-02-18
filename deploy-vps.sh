#!/bin/bash

# Wild Waves Safaris - VPS Deployment Script
# Usage: ./deploy-vps.sh <vps-ip> <ssh-user>

VPS_IP=$1
SSH_USER=$2

if [ -z "$VPS_IP" ] || [ -z "$SSH_USER" ]; then
    echo "Usage: ./deploy-vps.sh <vps-ip> <ssh-user>"
    echo "Example: ./deploy-vps.sh 192.168.1.100 root"
    exit 1
fi

echo "🚀 Deploying Wild Waves Safaris to VPS: $VPS_IP"

# Build frontend
echo "📦 Building frontend..."
npm run build

# Build admin
echo "📦 Building admin..."
cd admin && npm run build && cd ..

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf deploy.tar.gz \
    dist/ \
    admin/dist/ \
    backend/ \
    --exclude=backend/node_modules \
    --exclude=backend/backend.log

# Upload to VPS
echo "📤 Uploading to VPS..."
scp deploy.tar.gz $SSH_USER@$VPS_IP:/tmp/

# Deploy on VPS
echo "🔧 Deploying on VPS..."
ssh $SSH_USER@$VPS_IP << 'ENDSSH'
    # Install dependencies
    apt-get update
    apt-get install -y nginx postgresql nodejs npm

    # Create app directory
    mkdir -p /var/www/wildwavesafaris
    cd /var/www/wildwavesafaris

    # Extract files
    tar -xzf /tmp/deploy.tar.gz
    rm /tmp/deploy.tar.gz

    # Setup backend
    cd backend
    npm install --production
    
    # Setup PostgreSQL
    sudo -u postgres psql << EOF
CREATE DATABASE wildwave_safaris;
CREATE USER wildwave_user WITH PASSWORD 'wildwave_pass';
GRANT ALL PRIVILEGES ON DATABASE wildwave_safaris TO wildwave_user;
EOF

    # Import database schema
    sudo -u postgres psql -d wildwave_safaris -f schema.sql

    # Setup PM2 for backend
    npm install -g pm2
    pm2 start src/server.js --name wildwave-backend
    pm2 save
    pm2 startup

    # Setup Nginx
    cat > /etc/nginx/sites-available/wildwavesafaris << 'NGINX'
# Frontend
server {
    listen 80;
    server_name _;
    root /var/www/wildwavesafaris/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Admin
server {
    listen 3000;
    server_name _;
    root /var/www/wildwavesafaris/admin/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
NGINX

    ln -sf /etc/nginx/sites-available/wildwavesafaris /etc/nginx/sites-enabled/
    nginx -t && systemctl restart nginx

    echo "✅ Deployment complete!"
    echo "Frontend: http://$VPS_IP"
    echo "Admin: http://$VPS_IP:3000"
    echo "Backend: http://$VPS_IP/api"
ENDSSH

echo "✅ Deployment complete!"
echo "Frontend: http://$VPS_IP"
echo "Admin: http://$VPS_IP:3000"

# Cleanup
rm deploy.tar.gz

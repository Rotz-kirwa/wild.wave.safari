# Wild Waves Safaris - Deployment Guide

## Contabo VPS Deployment

### Prerequisites
- Contabo VPS with Ubuntu 20.04+
- SSH access to your VPS
- Domain name (optional)

### Quick Deployment

1. **Update API URLs**
   ```bash
   # Update backend URL in all frontend files
   # Replace http://localhost:5000 with http://YOUR_CONTABO_IP:5000
   ```

2. **Run Deployment Script**
   ```bash
   chmod +x deploy-vps.sh
   ./deploy-vps.sh YOUR_CONTABO_IP root
   ```

### Manual Deployment Steps

#### 1. Prepare VPS
```bash
ssh root@YOUR_CONTABO_IP

# Update system
apt-get update && apt-get upgrade -y

# Install dependencies
apt-get install -y nginx postgresql nodejs npm git

# Install PM2
npm install -g pm2
```

#### 2. Setup Database
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE wildwave_safaris;
CREATE USER wildwave_user WITH PASSWORD 'wildwave_pass';
GRANT ALL PRIVILEGES ON DATABASE wildwave_safaris TO wildwave_user;
\q

# Import schema
sudo -u postgres psql -d wildwave_safaris -f /path/to/backend/schema.sql
```

#### 3. Deploy Backend
```bash
# Create app directory
mkdir -p /var/www/wildwavesafaris/backend
cd /var/www/wildwavesafaris/backend

# Upload backend files (from local machine)
scp -r backend/* root@YOUR_CONTABO_IP:/var/www/wildwavesafaris/backend/

# Install dependencies
npm install --production

# Start with PM2
pm2 start src/server.js --name wildwave-backend
pm2 save
pm2 startup
```

#### 4. Deploy Frontend
```bash
# Build frontend (on local machine)
npm run build

# Upload to VPS
scp -r dist/* root@YOUR_CONTABO_IP:/var/www/wildwavesafaris/frontend/
```

#### 5. Deploy Admin
```bash
# Build admin (on local machine)
cd admin
npm run build

# Upload to VPS
scp -r dist/* root@YOUR_CONTABO_IP:/var/www/wildwavesafaris/admin/
```

#### 6. Configure Nginx
```bash
# Create Nginx config
nano /etc/nginx/sites-available/wildwavesafaris
```

Paste this configuration:
```nginx
# Frontend
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;
    root /var/www/wildwavesafaris/frontend;
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

# Admin Panel
server {
    listen 3000;
    server_name YOUR_DOMAIN_OR_IP;
    root /var/www/wildwavesafaris/admin;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable site and restart Nginx:
```bash
ln -s /etc/nginx/sites-available/wildwavesafaris /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Access Your Application

- **Frontend**: http://YOUR_CONTABO_IP
- **Admin Panel**: http://YOUR_CONTABO_IP:3000
- **Backend API**: http://YOUR_CONTABO_IP:5000

### Default Admin Credentials
- Email: admin@wildwavesafaris.com
- Password: admin123

**⚠️ IMPORTANT: Change admin password immediately after first login!**

### Post-Deployment

1. **Setup SSL (Optional but Recommended)**
   ```bash
   apt-get install certbot python3-certbot-nginx
   certbot --nginx -d yourdomain.com
   ```

2. **Configure Firewall**
   ```bash
   ufw allow 80/tcp
   ufw allow 443/tcp
   ufw allow 3000/tcp
   ufw allow 5000/tcp
   ufw enable
   ```

3. **Monitor Application**
   ```bash
   pm2 logs wildwave-backend
   pm2 monit
   ```

### Troubleshooting

**Backend not starting:**
```bash
pm2 logs wildwave-backend
cd /var/www/wildwavesafaris/backend
node src/server.js
```

**Database connection issues:**
```bash
sudo -u postgres psql -d wildwave_safaris -c "SELECT 1;"
```

**Nginx errors:**
```bash
nginx -t
tail -f /var/log/nginx/error.log
```

### Update Deployment

```bash
# Pull latest changes
cd /var/www/wildwavesafaris
git pull

# Rebuild and restart
cd backend
npm install
pm2 restart wildwave-backend

# Update frontend/admin (upload new builds)
```

## GitHub Repository

Push to GitHub:
```bash
cd /home/user/Public/wild-waves-safaris/savanna-vision-craft
git add .
git commit -m "Prepare for Contabo deployment"
git push origin main
```

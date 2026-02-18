# Wild Waves Safaris - Hostinger Deployment Guide

## Prerequisites
- Hostinger VPS or Business Hosting plan
- SSH access enabled
- Domain name connected to Hostinger

## Step 1: Prepare Your Local Project

### Update API URLs
Before deployment, update all API URLs to use your Hostinger domain:

**Files to update:**
- `src/pages/Index.tsx`
- `src/pages/Destinations.tsx`
- `src/pages/Packages.tsx`
- `src/pages/Blog.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Booking.tsx`
- `src/pages/Auth.tsx`
- `src/components/PromotionalPopup.tsx`
- `admin/src/lib/api.ts`

Replace `http://localhost:5000` with `https://yourdomain.com/api` or `https://api.yourdomain.com`

## Step 2: Build Your Applications

```bash
# Build frontend
cd /home/user/Public/wild-waves-safaris/savanna-vision-craft
npm run build

# Build admin panel
cd admin
npm run build
cd ..
```

This creates:
- `dist/` - Frontend build
- `admin/dist/` - Admin panel build

## Step 3: Setup Database on Hostinger

### Option A: Using Hostinger's Database Manager (Recommended)

1. Log into Hostinger hPanel
2. Go to **Databases** → **MySQL Databases**
3. Click **Create Database**
   - Database name: `wildwave_safaris`
   - Username: `wildwave_user`
   - Password: Create a strong password
4. Click **Create**
5. Note down the database credentials

### Option B: Using phpMyAdmin

1. Access phpMyAdmin from hPanel
2. Create new database: `wildwave_safaris`
3. Import schema:
   - Click on the database
   - Go to **Import** tab
   - Upload `backend/schema.sql`
   - Click **Go**

## Step 4: Upload Files to Hostinger

### Using File Manager (Easy Method)

1. Log into Hostinger hPanel
2. Go to **Files** → **File Manager**
3. Navigate to `public_html/`
4. Create folder structure:
   ```
   public_html/
   ├── (frontend files here - from dist/)
   ├── admin/
   │   └── (admin files here - from admin/dist/)
   └── api/
       └── (backend files here - from backend/)
   ```

5. Upload files:
   - Upload contents of `dist/` to `public_html/`
   - Upload contents of `admin/dist/` to `public_html/admin/`
   - Upload entire `backend/` folder to `public_html/api/`

### Using FTP/SFTP (Alternative Method)

```bash
# Using FileZilla or similar FTP client
Host: ftp.yourdomain.com
Username: Your Hostinger username
Password: Your Hostinger password
Port: 21 (FTP) or 22 (SFTP)

# Upload structure as above
```

## Step 5: Configure Backend

### Update Database Connection

SSH into your Hostinger VPS:
```bash
ssh username@yourdomain.com
```

Edit backend database config:
```bash
cd public_html/api/src
nano db.js
```

Update with your Hostinger database credentials:
```javascript
const pool = new Pool({
  host: 'localhost',  // or your Hostinger DB host
  database: 'wildwave_safaris',
  user: 'wildwave_user',
  password: 'YOUR_HOSTINGER_DB_PASSWORD',
  port: 3306
});
```

### Install Backend Dependencies

```bash
cd public_html/api
npm install --production
```

### Start Backend with PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start backend
pm2 start src/server.js --name wildwave-backend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

## Step 6: Configure .htaccess Files

### Frontend .htaccess
Create `public_html/.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # API proxy
  RewriteRule ^api/(.*)$ http://localhost:5000/$1 [P,L]
  
  # Frontend routing
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

### Admin .htaccess
Create `public_html/admin/.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /admin/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /admin/index.html [L]
</IfModule>
```

## Step 7: Configure Node.js in Hostinger

1. Go to hPanel → **Advanced** → **Node.js**
2. Click **Create Application**
3. Settings:
   - Node.js version: 18.x or higher
   - Application mode: Production
   - Application root: `/public_html/api`
   - Application startup file: `src/server.js`
   - Port: 5000
4. Click **Create**

## Step 8: SSL Certificate (HTTPS)

1. Go to hPanel → **Security** → **SSL**
2. Install free SSL certificate for your domain
3. Enable **Force HTTPS**

## Step 9: Test Your Deployment

### Access URLs:
- **Frontend**: https://yourdomain.com
- **Admin Panel**: https://yourdomain.com/admin
- **Backend API**: https://yourdomain.com/api

### Test Checklist:
- [ ] Frontend loads correctly
- [ ] Images display properly
- [ ] Destinations page shows data
- [ ] Packages page shows data
- [ ] Blog page shows posts
- [ ] Contact form submits
- [ ] Admin login works (admin@wildwavesafaris.com / admin123)
- [ ] Admin can manage destinations
- [ ] Customer signup/login works
- [ ] Booking form submits

## Step 10: Post-Deployment Tasks

### Change Admin Password
1. Login to admin panel
2. Go to Admin Users
3. Change default admin password

### Update Contact Information
1. Go to Contact Info in admin
2. Update with real contact details

### Monitor Backend
```bash
# View logs
pm2 logs wildwave-backend

# Check status
pm2 status

# Restart if needed
pm2 restart wildwave-backend
```

## Troubleshooting

### Backend Not Running
```bash
ssh username@yourdomain.com
cd public_html/api
pm2 logs wildwave-backend
node src/server.js  # Test directly
```

### Database Connection Error
- Verify database credentials in `backend/src/db.js`
- Check if database exists in phpMyAdmin
- Ensure user has proper permissions

### 404 Errors on Routes
- Check .htaccess files are uploaded
- Verify mod_rewrite is enabled in Hostinger

### API Calls Failing
- Check CORS settings in `backend/src/server.js`
- Verify API URL in frontend files
- Check browser console for errors

### Images Not Loading
- Ensure all files from `dist/assets/` are uploaded
- Check file permissions (644 for files, 755 for folders)

## Environment Variables

Create `.env` file in `public_html/api/`:
```env
PORT=5000
DB_HOST=localhost
DB_NAME=wildwave_safaris
DB_USER=wildwave_user
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=production
```

## Backup Strategy

### Database Backup
```bash
# From SSH
mysqldump -u wildwave_user -p wildwave_safaris > backup_$(date +%Y%m%d).sql
```

Or use Hostinger's automatic backup feature in hPanel.

### File Backup
Download via FTP or use Hostinger's backup feature.

## Updates and Maintenance

### Deploy Updates
1. Build locally: `npm run build`
2. Upload new `dist/` files to `public_html/`
3. If backend changed:
   ```bash
   cd public_html/api
   git pull  # if using git
   npm install
   pm2 restart wildwave-backend
   ```

## Support

- Hostinger Support: https://www.hostinger.com/support
- Check PM2 logs: `pm2 logs wildwave-backend`
- Check error logs in hPanel → Files → error_log

---

## Quick Deployment Checklist

- [ ] Build frontend and admin locally
- [ ] Create database in Hostinger
- [ ] Upload files via File Manager/FTP
- [ ] Update database credentials
- [ ] Install backend dependencies
- [ ] Start backend with PM2
- [ ] Create .htaccess files
- [ ] Configure Node.js app in hPanel
- [ ] Install SSL certificate
- [ ] Test all functionality
- [ ] Change default passwords
- [ ] Setup backups

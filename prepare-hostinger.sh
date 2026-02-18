#!/bin/bash

# Wild Waves Safaris - Hostinger Deployment Preparation Script

echo "🚀 Preparing Wild Waves Safaris for Hostinger Deployment"

# Build frontend
echo "📦 Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

# Build admin
echo "📦 Building admin panel..."
cd admin
npm run build
cd ..

if [ $? -ne 0 ]; then
    echo "❌ Admin build failed"
    exit 1
fi

# Create deployment package
echo "📦 Creating deployment package..."
mkdir -p hostinger-deploy

# Copy frontend build
echo "Copying frontend files..."
cp -r dist/* hostinger-deploy/

# Copy admin build
echo "Copying admin files..."
mkdir -p hostinger-deploy/admin
cp -r admin/dist/* hostinger-deploy/admin/

# Copy backend
echo "Copying backend files..."
mkdir -p hostinger-deploy/api
cp -r backend/* hostinger-deploy/api/
rm -rf hostinger-deploy/api/node_modules
rm -f hostinger-deploy/api/backend.log

# Create .htaccess for frontend
echo "Creating .htaccess files..."
cat > hostinger-deploy/.htaccess << 'EOF'
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

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
EOF

# Create .htaccess for admin
cat > hostinger-deploy/admin/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /admin/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /admin/index.html [L]
</IfModule>
EOF

# Create README for deployment
cat > hostinger-deploy/UPLOAD_INSTRUCTIONS.txt << 'EOF'
HOSTINGER UPLOAD INSTRUCTIONS
==============================

1. Upload all files (except this file) to your Hostinger public_html/ folder

2. File structure should be:
   public_html/
   ├── index.html (and other frontend files)
   ├── assets/
   ├── .htaccess
   ├── admin/
   │   ├── index.html
   │   ├── assets/
   │   └── .htaccess
   └── api/
       ├── src/
       ├── schema.sql
       └── package.json

3. After upload:
   - Create database in Hostinger (wildwave_safaris)
   - Import api/schema.sql via phpMyAdmin
   - Update database credentials in api/src/db.js
   - SSH into server and run:
     cd public_html/api
     npm install --production
     pm2 start src/server.js --name wildwave-backend
     pm2 save

4. Access your site:
   - Frontend: https://yourdomain.com
   - Admin: https://yourdomain.com/admin
   - API: https://yourdomain.com/api

5. Default admin login:
   Email: admin@wildwavesafaris.com
   Password: admin123
   (CHANGE THIS IMMEDIATELY!)

For detailed instructions, see HOSTINGER_DEPLOYMENT.md
EOF

# Create zip file
echo "Creating zip file..."
cd hostinger-deploy
zip -r ../wildwave-safaris-hostinger.zip . -x "*.DS_Store"
cd ..

echo ""
echo "✅ Deployment package ready!"
echo ""
echo "📁 Files prepared in: hostinger-deploy/"
echo "📦 Zip file created: wildwave-safaris-hostinger.zip"
echo ""
echo "Next steps:"
echo "1. Read HOSTINGER_DEPLOYMENT.md for detailed instructions"
echo "2. Upload wildwave-safaris-hostinger.zip to Hostinger"
echo "3. Extract in public_html/"
echo "4. Follow the setup instructions"
echo ""

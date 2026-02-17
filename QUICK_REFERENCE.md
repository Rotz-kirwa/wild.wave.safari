# 🚀 WildWave Safaris - Quick Reference

## Start System (All Services)
```bash
./start-all.sh
```

## Individual Services

### Backend
```bash
cd backend
npm run dev
```

### Frontend
```bash
npm run dev
```

### Admin
```bash
cd admin
npm run dev
```

## Database

### Setup Database
```bash
cd backend
./setup-db.sh
```

### Manual Database Commands
```bash
# Create database
psql -U postgres -c "CREATE DATABASE wild_waves_safaris"

# Run migrations
psql -U postgres -d wild_waves_safaris -f db/migrations.sql

# Seed data
psql -U postgres -d wild_waves_safaris -f db/seed.sql

# Connect to database
psql -U postgres -d wild_waves_safaris
```

## URLs

- Frontend: http://localhost:8080
- Backend: http://localhost:5000
- Admin: http://localhost:3000

## Admin Login

- Email: `admin@wildwavesafaris.com`
- Password: `admin123`

## Test API

```bash
# Health check
curl http://localhost:5000/health

# Get destinations
curl http://localhost:5000/api/public/destinations

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@wildwavesafaris.com","password":"admin123"}'
```

## Common Issues

### Port in use
```bash
lsof -ti:5000 | xargs kill -9
lsof -ti:8080 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### PostgreSQL not running
```bash
sudo service postgresql start
sudo service postgresql status
```

### Reset admin password
```bash
psql -U postgres -d wild_waves_safaris -c \
  "UPDATE users SET password_hash='$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6O4apm' \
   WHERE email='admin@wildwavesafaris.com'"
```

## File Structure

```
savanna-vision-craft/
├── src/              # Frontend
├── backend/          # API
├── admin/            # Dashboard
├── start-all.sh      # Start everything
├── SETUP_GUIDE.md    # Full setup
├── STATUS_REPORT.md  # What's fixed
└── README.md         # Overview
```

## Key Files

- `backend/.env` - Backend config
- `admin/.env.local` - Admin config
- `backend/db/migrations.sql` - Database schema
- `backend/db/seed.sql` - Sample data

## NPM Scripts

### Backend
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm start` - Run production
- `npm run setup` - Setup database

### Frontend
- `npm run dev` - Start dev server
- `npm run build` - Build for production

### Admin
- `npm run dev` - Start dev server
- `npm run build` - Build for production

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/wild_waves_safaris
JWT_SECRET=wildwave_safari_secret_key_2024_production_ready
PORT=5000
FRONTEND_URL=http://localhost:8080
ADMIN_URL=http://localhost:3000
```

### Admin (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Database Tables

- users
- destinations
- bookings
- enquiries
- safari_packages
- testimonials
- blog_posts
- destination_gallery
- faqs
- admin_logs

## API Endpoints

### Public
- GET `/api/public/destinations`
- POST `/api/public/bookings`
- POST `/api/public/enquiries`

### Auth
- POST `/api/auth/login`
- POST `/api/auth/register`

### Admin (Protected)
- GET `/api/admin/dashboard`
- GET `/api/admin/bookings`
- PUT `/api/admin/bookings/:id`
- GET `/api/admin/destinations`
- POST `/api/admin/destinations`
- PUT `/api/admin/destinations/:id`
- DELETE `/api/admin/destinations/:id`
- GET `/api/admin/enquiries`
- PUT `/api/admin/enquiries/:id`
- GET `/api/admin/analytics`

## Status

✅ Database: Connected
✅ Backend: Running
✅ Frontend: Running
✅ Admin: Running
✅ Authentication: Working
✅ CRUD Operations: Working
✅ Real-time Data: Working

## Support

📧 wildwavesafaris@gmail.com
📱 +254 713 241 666
💬 WhatsApp: +254 713 241 666

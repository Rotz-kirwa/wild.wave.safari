# WildWave Safaris - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+
- Git

### 1. Database Setup

```bash
# Start PostgreSQL service
sudo service postgresql start

# Create database and run migrations
cd backend
chmod +x setup-db.sh
./setup-db.sh

# Or manually:
psql -U postgres -c "CREATE DATABASE wild_waves_safaris"
psql -U postgres -d wild_waves_safaris -f db/migrations.sql
psql -U postgres -d wild_waves_safaris -f db/seed.sql
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
# Backend runs on http://localhost:5000
```

**Default Admin Login:**
- Email: admin@wildwavesafaris.com
- Password: admin123

### 3. Frontend Setup

```bash
cd ..  # Back to root
npm install
npm run dev
# Frontend runs on http://localhost:8080
```

### 4. Admin Dashboard Setup

```bash
cd admin
npm install
npm run dev
# Admin runs on http://localhost:3000
```

## 📋 API Endpoints

### Public (No Auth Required)
- `GET /api/public/destinations` - List destinations
- `POST /api/public/bookings` - Submit booking
- `POST /api/public/enquiries` - Submit enquiry

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - User registration

### Admin (Auth Required)
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/bookings` - List bookings
- `PUT /api/admin/bookings/:id` - Update booking
- `GET /api/admin/destinations` - List destinations
- `POST /api/admin/destinations` - Create destination
- `PUT /api/admin/destinations/:id` - Update destination
- `DELETE /api/admin/destinations/:id` - Delete destination
- `GET /api/admin/enquiries` - List enquiries
- `PUT /api/admin/enquiries/:id` - Update enquiry
- `GET /api/admin/analytics` - Analytics data

## 🔧 Configuration

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

## 🧪 Testing

### Test Backend
```bash
curl http://localhost:5000/health
curl http://localhost:5000/api/test
curl http://localhost:5000/api/public/destinations
```

### Test Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@wildwavesafaris.com","password":"admin123"}'
```

## 📦 Production Deployment

### Backend (Railway/Render/Heroku)
1. Set environment variables
2. Run migrations: `npm run migrate`
3. Start: `npm start`

### Frontend (Vercel)
1. Connect GitHub repo
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Admin (Vercel)
1. Connect GitHub repo
2. Set root directory: `admin`
3. Set environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

## 🔐 Security Notes

- Change JWT_SECRET in production
- Use strong database passwords
- Enable HTTPS in production
- Set proper CORS origins
- Implement rate limiting

## 📊 Database Schema

**Tables:**
- users (authentication)
- destinations (safari locations)
- bookings (customer bookings)
- enquiries (contact form)
- safari_packages (tour packages)
- testimonials (reviews)
- blog_posts (content)
- destination_gallery (images)
- faqs (help content)
- admin_logs (audit trail)

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Check credentials in .env
cat backend/.env
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
```

### Admin Can't Login
```bash
# Verify admin user exists
psql -U postgres -d wild_waves_safaris -c "SELECT * FROM users WHERE role='admin'"

# Reset password if needed
psql -U postgres -d wild_waves_safaris -c "UPDATE users SET password_hash='$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxF6O4apm' WHERE email='admin@wildwavesafaris.com'"
```

## 📱 Features Implemented

✅ Complete database schema
✅ Backend API with authentication
✅ Admin dashboard with real-time data
✅ Booking management system
✅ Destination management
✅ Enquiry management
✅ Public API for frontend
✅ JWT authentication
✅ Rate limiting
✅ Error handling
✅ CORS configuration
✅ Socket.IO for real-time updates

## 🎯 Next Steps

1. Add payment gateway (Stripe/PayPal)
2. Implement email notifications
3. Add image upload to cloud storage
4. Complete blog functionality
5. Add user accounts for customers
6. Implement search functionality
7. Add analytics tracking
8. Create mobile app

## 📞 Support

For issues, check logs:
- Backend: Console output
- Frontend: Browser console
- Database: PostgreSQL logs

Contact: wildwavesafaris@gmail.com

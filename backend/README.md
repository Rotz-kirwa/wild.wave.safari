# WildWave Safaris Backend API

Express.js backend with PostgreSQL database for WildWave Safaris platform.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Make sure PostgreSQL is running
sudo service postgresql start

# Create database and tables
psql -U postgres -f schema.sql
```

### 3. Configure Environment
Edit `.env` file if needed (default values work for local development)

### 4. Start Server
```bash
npm run dev
```

Server runs on: http://localhost:5000

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Authentication
```
POST /api/auth/login
Body: { email, password }
```

### Admin (Requires JWT Token)
```
GET  /api/admin/dashboard
GET  /api/admin/bookings
PUT  /api/admin/bookings/:id
GET  /api/admin/destinations
POST /api/admin/destinations
PUT  /api/admin/destinations/:id
DELETE /api/admin/destinations/:id
GET  /api/admin/enquiries
PUT  /api/admin/enquiries/:id
```

### Public
```
GET  /api/public/destinations
GET  /api/public/destinations/:id
POST /api/public/bookings
POST /api/public/enquiries
```

## 🔐 Default Admin Credentials
- Email: `admin@wildwavesafaris.com`
- Password: `admin123`

## 🗄️ Database
- Database: `wildwave_safaris`
- User: `wildwave_user`
- Password: `wildwave_pass`

## 📦 Dependencies
- express - Web framework
- pg - PostgreSQL client
- bcrypt - Password hashing
- jsonwebtoken - JWT authentication
- cors - CORS middleware
- dotenv - Environment variables

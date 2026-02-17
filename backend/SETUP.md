# 🚀 Backend Setup Complete

## ✅ What Was Created

### Backend Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # PostgreSQL connection
│   ├── middleware/
│   │   └── authenticate.js    # JWT authentication
│   ├── routes/
│   │   ├── auth.js           # Login endpoint
│   │   ├── admin.js          # Admin CRUD endpoints
│   │   └── public.js         # Public endpoints
│   └── server.js             # Main server file
├── .env                       # Environment variables
├── .gitignore
├── package.json
├── schema.sql                 # Database schema
├── setup-db.sh               # Database setup script
└── README.md
```

## 🗄️ Database Setup

### Option 1: Using PostgreSQL (Recommended)
```bash
# Start PostgreSQL
sudo service postgresql start

# Create database and user
sudo -u postgres psql << EOF
CREATE USER wildwave_user WITH PASSWORD 'wildwave_pass';
CREATE DATABASE wildwave_safaris OWNER wildwave_user;
GRANT ALL PRIVILEGES ON DATABASE wildwave_safaris TO wildwave_user;
EOF

# Run schema
psql -U wildwave_user -d wildwave_safaris -f schema.sql
```

### Option 2: Using SQLite (Simpler, for testing)
If PostgreSQL is not available, the backend can be modified to use SQLite.

## 🚀 Start Backend

```bash
cd backend
npm install
npm run dev
```

Backend will run on: **http://localhost:5000**

## 🧪 Test Backend

```bash
# Health check
curl http://localhost:5000/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@wildwavesafaris.com","password":"admin123"}'
```

## 🔗 Connect Admin Dashboard

The admin dashboard is already configured to connect to the backend at `http://localhost:5000/api`.

Once backend is running:
1. Start admin: `cd admin && npm run dev`
2. Open: http://localhost:3000
3. Login with: `admin@wildwavesafaris.com` / `admin123`

## 📊 Database Tables

- **users** - Admin users with hashed passwords
- **destinations** - Safari packages/destinations
- **bookings** - Customer bookings
- **enquiries** - Contact form submissions

## 🔐 Security Features

- ✅ JWT authentication
- ✅ Bcrypt password hashing
- ✅ CORS protection
- ✅ SQL injection prevention (parameterized queries)

## 🛠️ Troubleshooting

### Backend won't start
- Check PostgreSQL is running: `pg_isready`
- Check port 5000 is free: `lsof -i :5000`
- Check logs for errors

### Database connection fails
- Verify DATABASE_URL in .env
- Check PostgreSQL credentials
- Ensure database exists

### Admin can't connect
- Ensure backend is running on port 5000
- Check CORS settings in server.js
- Verify VITE_API_URL in admin/.env

## 📝 Next Steps

1. Start PostgreSQL
2. Run database setup
3. Start backend server
4. Start admin dashboard
5. Login and test

## 🎉 Success Indicators

- ✅ `curl http://localhost:5000/health` returns `{"status":"OK"}`
- ✅ Login works in admin dashboard
- ✅ Dashboard shows real data from database
- ✅ No CORS errors in browser console

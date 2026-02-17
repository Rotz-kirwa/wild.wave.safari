#!/bin/bash

echo "🦁 Starting WildWave Safaris System"
echo "===================================="

# Check if PostgreSQL is running
if ! pgrep -x "postgres" > /dev/null; then
    echo "⚠️  PostgreSQL not running. Starting..."
    sudo service postgresql start
fi

# Start backend
echo "🚀 Starting Backend (Port 5000)..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "🌐 Starting Frontend (Port 8080)..."
cd ..
npm run dev &
FRONTEND_PID=$!

# Start admin
echo "👨‍💼 Starting Admin Dashboard (Port 3000)..."
cd admin
npm run dev &
ADMIN_PID=$!

echo ""
echo "✅ All services started!"
echo ""
echo "📍 URLs:"
echo "   Frontend:  http://localhost:8080"
echo "   Backend:   http://localhost:5000"
echo "   Admin:     http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID $ADMIN_PID; exit" INT
wait

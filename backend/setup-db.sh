#!/bin/bash

echo "🗄️  Setting up WildWave Safaris Database..."

# Create database and user
sudo -u postgres psql << EOF
-- Create user if not exists
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'wildwave_user') THEN
    CREATE USER wildwave_user WITH PASSWORD 'wildwave_pass';
  END IF;
END
\$\$;

-- Drop database if exists and recreate
DROP DATABASE IF EXISTS wildwave_safaris;
CREATE DATABASE wildwave_safaris OWNER wildwave_user;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE wildwave_safaris TO wildwave_user;
EOF

# Create tables
PGPASSWORD=wildwave_pass psql -U wildwave_user -d wildwave_safaris << 'EOF'

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Destinations table
CREATE TABLE destinations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  duration VARCHAR(100),
  image_url TEXT,
  category VARCHAR(100),
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  safari_type VARCHAR(255),
  number_of_people INTEGER,
  start_date DATE,
  total_price DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enquiries table
CREATE TABLE enquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@wildwavesafaris.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIeWEHaSuu', 'admin');

-- Insert sample destinations
INSERT INTO destinations (name, description, price, duration, image_url, category) VALUES
('Masai Mara Safari', 'Experience the great wildebeest migration', 3500.00, '5 days', 'https://images.unsplash.com/photo-1516426122078-c23e76319801', 'Kenya'),
('Serengeti Adventure', 'Explore the endless plains of Tanzania', 4200.00, '7 days', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e', 'Tanzania'),
('Gorilla Trekking Uganda', 'Meet mountain gorillas in their habitat', 5500.00, '4 days', 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44', 'Uganda'),
('Rwanda Wildlife Tour', 'Discover the land of a thousand hills', 4800.00, '6 days', 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e', 'Rwanda'),
('Amboseli Elephant Safari', 'See elephants with Kilimanjaro backdrop', 3200.00, '4 days', 'https://images.unsplash.com/photo-1549366021-9f761d450615', 'Kenya'),
('Zanzibar Beach Escape', 'Relax on pristine white sand beaches', 2800.00, '5 days', 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f', 'Tanzania');

-- Insert sample bookings
INSERT INTO bookings (customer_name, email, phone, safari_type, number_of_people, start_date, total_price, status) VALUES
('John Smith', 'john@example.com', '+1234567890', 'Kenya Safari', 2, '2026-04-15', 7000.00, 'confirmed'),
('Sarah Johnson', 'sarah@example.com', '+1234567891', 'Tanzania Adventure', 4, '2026-05-20', 16800.00, 'pending'),
('Mike Brown', 'mike@example.com', '+1234567892', 'Uganda Gorilla Trek', 2, '2026-06-10', 11000.00, 'confirmed');

-- Insert sample enquiries
INSERT INTO enquiries (name, email, phone, message, status) VALUES
('Alice Cooper', 'alice@example.com', '+1234567893', 'I would like to know more about family safari packages', 'new'),
('Bob Wilson', 'bob@example.com', '+1234567894', 'Do you offer group discounts for 10+ people?', 'new');

EOF

echo "✅ Database setup complete!"
echo ""
echo "📊 Database: wildwave_safaris"
echo "👤 User: wildwave_user"
echo "🔑 Password: wildwave_pass"
echo ""
echo "🔐 Admin Login:"
echo "   Email: admin@wildwavesafaris.com"
echo "   Password: admin123"

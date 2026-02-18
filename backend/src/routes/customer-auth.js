import express from 'express';
import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'wildwave-customer-secret-key';

// Customer Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // Check if customer exists
    const existing = await pool.query('SELECT * FROM customers WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create customer
    const result = await pool.query(
      'INSERT INTO customers (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING id, name, email, phone',
      [name, email, hashedPassword, phone]
    );
    
    const customer = result.rows[0];
    const token = jwt.sign({ id: customer.id, email: customer.email, type: 'customer' }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token, customer });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Customer Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await pool.query('SELECT * FROM customers WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const customer = result.rows[0];
    const validPassword = await bcrypt.compare(password, customer.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: customer.id, email: customer.email, type: 'customer' }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      token,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;

import express from 'express';
import pool from '../config/db.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

// Dashboard statistics
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const bookingsCount = await pool.query('SELECT COUNT(*) FROM bookings');
    const revenueSum = await pool.query('SELECT SUM(total_price) FROM bookings WHERE status = $1', ['confirmed']);
    const customersCount = await pool.query('SELECT COUNT(DISTINCT email) FROM bookings');
    const activeToursCount = await pool.query('SELECT COUNT(*) FROM bookings WHERE status = $1', ['confirmed']);

    const recentBookings = await pool.query(
      'SELECT * FROM bookings ORDER BY created_at DESC LIMIT 5'
    );

    const countryData = await pool.query(`
      SELECT safari_type as country, COUNT(*) as bookings 
      FROM bookings 
      GROUP BY safari_type
    `);

    const revenueData = await pool.query(`
      SELECT TO_CHAR(created_at, 'Mon') as month, SUM(total_price) as revenue
      FROM bookings
      WHERE created_at >= NOW() - INTERVAL '6 months'
      GROUP BY TO_CHAR(created_at, 'Mon'), EXTRACT(MONTH FROM created_at)
      ORDER BY EXTRACT(MONTH FROM created_at)
    `);

    res.json({
      totalBookings: parseInt(bookingsCount.rows[0].count),
      totalRevenue: parseFloat(revenueSum.rows[0].sum || 0),
      totalCustomers: parseInt(customersCount.rows[0].count),
      activeTours: parseInt(activeToursCount.rows[0].count),
      bookingGrowth: 12.5,
      revenueGrowth: 18.3,
      recentBookings: recentBookings.rows,
      countryData: countryData.rows.map(row => ({
        country: row.country,
        bookings: parseInt(row.bookings),
        percentage: 0
      })),
      revenueData: revenueData.rows
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Bookings
router.get('/bookings', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

router.put('/bookings/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const result = await pool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Destinations
router.get('/destinations', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM destinations ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Destinations error:', error);
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
});

router.post('/destinations', authenticate, async (req, res) => {
  try {
    const { name, description, price, duration, image_url, category, country, tags, best_months } = req.body;
    
    const result = await pool.query(
      'INSERT INTO destinations (name, description, price, duration, image_url, category, country, tags, best_months) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [name, description, price, duration, image_url, category, country, tags, best_months]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Create destination error:', error);
    res.status(500).json({ error: 'Failed to create destination' });
  }
});

router.put('/destinations/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, duration, image_url, category, country, tags, best_months } = req.body;
    
    const result = await pool.query(
      'UPDATE destinations SET name = $1, description = $2, price = $3, duration = $4, image_url = $5, category = $6, country = $7, tags = $8, best_months = $9 WHERE id = $10 RETURNING *',
      [name, description, price, duration, image_url, category, country, tags, best_months, id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update destination error:', error);
    res.status(500).json({ error: 'Failed to update destination' });
  }
});

router.delete('/destinations/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM destinations WHERE id = $1', [id]);
    res.json({ message: 'Destination deleted' });
  } catch (error) {
    console.error('Delete destination error:', error);
    res.status(500).json({ error: 'Failed to delete destination' });
  }
});

// Enquiries
router.get('/enquiries', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM enquiries ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Enquiries error:', error);
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

router.put('/enquiries/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const result = await pool.query(
      'UPDATE enquiries SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update enquiry error:', error);
    res.status(500).json({ error: 'Failed to update enquiry' });
  }
});

// Blogs
router.get('/blogs', authenticate, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Blogs error:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

router.post('/blogs', authenticate, async (req, res) => {
  try {
    const { title, category, excerpt, content, image_url, read_time, published } = req.body;
    
    const result = await pool.query(
      'INSERT INTO blogs (title, category, excerpt, content, image_url, read_time, published) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, category, excerpt, content, image_url, read_time, published !== false]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

router.put('/blogs/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, excerpt, content, image_url, read_time, published } = req.body;
    
    const result = await pool.query(
      'UPDATE blogs SET title = $1, category = $2, excerpt = $3, content = $4, image_url = $5, read_time = $6, published = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *',
      [title, category, excerpt, content, image_url, read_time, published, id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

router.delete('/blogs/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM blogs WHERE id = $1', [id]);
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

export default router;

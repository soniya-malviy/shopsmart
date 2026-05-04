const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../public')));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ShopSmart Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Products Route
const PRODUCTS = [
  { id: 1, name: 'Premium Wireless Headphones', price: 12999, category: 'Electronics', inStock: true },
  { id: 2, name: 'Organic Cotton T-Shirt', price: 2499, category: 'Clothing', inStock: true },
  { id: 3, name: 'Ceramic Coffee Mug', price: 1450, category: 'Home', inStock: false },
  { id: 4, name: 'Smartphone Pro Max', price: 89999, category: 'Electronics', inStock: true },
  { id: 5, name: 'Classic Analog Watch', price: 7999, category: 'Accessories', inStock: true },
  { id: 6, name: 'Retro Gaming Console', price: 24999, category: 'Electronics', inStock: true },
];

app.get('/api/products/search', (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  if (!query) return res.json(PRODUCTS);
  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
  );
  res.json(filtered);
});

// Catch-all: serve frontend for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = app;

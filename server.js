const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Make Uploads folder public so images can be viewed via URL
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/news', require('./routes/news'));
app.use('/api/contact', require('./routes/contact'));

// Health Check
app.get('/', (req, res) => {
  res.send('Radiant Intellectuals College Website API is Running...');
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(' Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
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
app.use('/api/home-settings', require('./routes/homeSettings'));
// Health Check
app.get('/', (req, res) => {
  res.send('Radiant Intellectuals College Website API is Running...');
});

// Auto-seed Admin Function
const seedAdmin = async () => {
  try {
    const User = require('./models/User'); 
    const adminUsername = 'admin';
    const rawPassword = 'RicoAdmin2026!';

    const existingAdmin = await User.findOne({ username: adminUsername });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(rawPassword, 10);
      await User.create({ username: adminUsername, password: hashedPassword });
      console.log('✅ Admin user auto-seeded successfully!');
    } else {
      console.log('ℹ️ Admin user already exists.');
    }
  } catch (err) {
    console.error('❌ Auto-seed failed:', err.message);
  }
};

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log(' Connected to MongoDB');
    
    // Seed admin on database connection
    await seedAdmin();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });
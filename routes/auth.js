const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/login - Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || 'secretkey123',
      { expiresIn: '1d' }
    );

    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

// POST /api/auth/seed - Seed Default Admin (Run once)
router.post('/seed', async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('RicoAdmin2026!', salt);

    const newAdmin = new User({
      username: 'admin',
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Default admin created: admin / RicoAdmin2026!' });
  } catch (err) {
    res.status(500).json({ error: 'Error seeding admin' });
  }
});

module.exports = router;
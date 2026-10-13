const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;
    const newContact = new Contact({ fullName, email, phone, subject, message });
    await newContact.save();
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(400).json({ error: 'Error submitting contact form' });
  }
});

// GET /api/contact - Fetch messages for Admin
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching contact messages' });
  }
});

module.exports = router;
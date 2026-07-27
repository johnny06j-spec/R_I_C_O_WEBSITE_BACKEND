const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const News = require('../models/News');
const auth = require('../middleware/auth');

// Ensure uploads directory exists automatically
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// GET /api/news - Fetch all news & events
router.get('/', async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching news' });
  }
});

// POST /api/news - Add news/event with file upload (Admin)
router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const { title, category, date, summary, isUpcomingEvent, eventLocation } = req.body;

    // Build image URL if file was attached
    const imageUrl = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : req.body.imageUrl || '';

    const newArticle = new News({
      title,
      category,
      date,
      summary,
      imageUrl,
      isUpcomingEvent: isUpcomingEvent === 'true' || isUpcomingEvent === true,
      eventLocation,
    });

    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    console.error('Error posting news:', err);
    res.status(400).json({ error: 'Error creating news post' });
  }
});

// DELETE /api/news/:id - Delete news post (Protected Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting news' });
  }
});

module.exports = router;
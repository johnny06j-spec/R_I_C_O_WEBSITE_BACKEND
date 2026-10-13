const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const News = require('../models/News');
const auth = require('../middleware/auth');

// Configure Cloudinary explicitly from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'rico_news',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
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

// POST /api/news - Add news/event with Cloudinary upload (Admin)
router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const { title, category, date, summary, isUpcomingEvent, eventLocation } = req.body;

    // req.file.path automatically contains the Cloudinary HTTPS URL
    const imageUrl = req.file ? req.file.path : req.body.imageUrl || '';

    const newArticle = new News({
      title,
      category: category || 'Announcement',
      date,
      summary,
      imageUrl,
      isUpcomingEvent: isUpcomingEvent === 'true' || isUpcomingEvent === true,
      eventLocation: eventLocation || '',
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
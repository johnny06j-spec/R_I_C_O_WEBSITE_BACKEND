const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Gallery = require('../models/Gallery');
const auth = require('../middleware/auth');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dvaidjie7',
  api_key: process.env.CLOUDINARY_API_KEY || '278625761173774',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'n33IEZPhmtekibqWOFvzmm0d1x8'
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'rico_gallery',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
  }
});

const upload = multer({ storage });

// GET /api/gallery - Fetch all gallery items
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching gallery items' });
  }
});

// POST /api/gallery - Upload new gallery photo file to Cloudinary (Admin)
router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const { title, category, caption } = req.body;

    // Cloudinary automatically returns the hosted secure HTTPS URL in req.file.path
    const imageUrl = req.file ? req.file.path : req.body.imageUrl;

    if (!imageUrl) {
      return res.status(400).json({ error: 'Please upload an image file' });
    }

    const newItem = new Gallery({ title, category, imageUrl, caption });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(400).json({ error: 'Error uploading gallery item' });
  }
});

// DELETE /api/gallery/:id - Delete gallery item
router.delete('/:id', auth, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting item' });
  }
});

module.exports = router;
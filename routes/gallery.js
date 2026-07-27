const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Gallery = require('../models/Gallery');
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

// GET /api/gallery - Fetch all gallery items
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching gallery items' });
  }
});

// POST /api/gallery - Upload new gallery photo file (Admin)
router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const { title, category, caption } = req.body;
    
    // Construct local file URL path
    const imageUrl = req.file 
      ? `http://localhost:5000/uploads/${req.file.filename}` 
      : req.body.imageUrl;

    if (!imageUrl) {
      return res.status(400).json({ error: 'Please upload an image file' });
    }

    const newItem = new Gallery({ title, category, imageUrl, caption });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
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
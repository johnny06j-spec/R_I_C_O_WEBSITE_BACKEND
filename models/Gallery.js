const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Academic', 'Sports', 'Events', 'Campus'],
    default: 'Events',
  },
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Gallery', gallerySchema);
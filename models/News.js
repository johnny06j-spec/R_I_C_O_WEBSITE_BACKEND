const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    default: 'Announcement',
    trim: true,
  },
  date: {
    type: String, // e.g. "AUG 15, 2026"
    required: true,
    trim: true,
  },
  summary: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  isUpcomingEvent: {
    type: Boolean,
    default: false,
  },
  eventLocation: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('News', newsSchema);
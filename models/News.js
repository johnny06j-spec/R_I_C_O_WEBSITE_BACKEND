const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Announcement', 'Academic', 'Sports', 'Event'],
    default: 'Announcement',
  },
  date: {
    type: String, // e.g. "AUG 15, 2026"
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  isUpcomingEvent: {
    type: Boolean,
    default: false,
  },
  eventLocation: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('News', newsSchema);
const express = require('express');
const router = express.Router();
const HomeSettings = require('../models/HomeSettings');
const auth = require('../middleware/auth');

// GET /api/home-settings
router.get('/', async (req, res) => {
  try {
    let settings = await HomeSettings.findOne();
    if (!settings) {
      settings = await HomeSettings.create({});
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching settings' });
  }
});

// PUT /api/home-settings (Admin Protected)
router.put('/', auth, async (req, res) => {
  try {
    let settings = await HomeSettings.findOne();
    if (!settings) {
      settings = new HomeSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Server error updating settings' });
  }
});

module.exports = router;
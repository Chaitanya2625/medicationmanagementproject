const express = require('express');
const router = express.Router();
const multer = require('multer');
const Medication = require('../models/Medication');
const requireAuth = require('../middleware/requireAuth');
const path = require('path');
const fs = require('fs');

// Set up file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Mark medication as taken, with optional photo
router.post('/:id/mark-taken', requireAuth, upload.single('photo'), async (req, res) => {
  try {
    const med = await Medication.findOne({ _id: req.params.id, user: req.user._id });
    if (!med) return res.status(404).json({ error: 'Medication not found' });

    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    med.takenHistory.push({
      dateTaken: new Date(),
      ...(photoUrl && { photoUrl }),
    });

    await med.save();
    res.json({ success: true, med });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not mark as taken' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db'); // Make sure this points to your SQLite DB connection

// Mock calendar data (keep this if needed for testing)
const mockAdherence = {
  '1': [
    { date: '2025-06-18', status: 'taken' },
    { date: '2025-06-19', status: 'missed' },
    { date: '2025-06-20', status: 'taken' }
  ]
};

router.get('/:id/adherence', (req, res) => {
  const { id } = req.params;
  const data = mockAdherence[id] || [];
  res.json(data);
});

// ✅ Add medication route
router.post('/:id/medications', async (req, res) => {
  const { name, dosage, frequency } = req.body;
  const userId = req.params.id;

  if (!name || !dosage || !frequency) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await db.run(
      'INSERT INTO medications (user_id, name, dosage, frequency) VALUES (?, ?, ?, ?)',
      [userId, name, dosage, frequency]
    );
    res.status(201).json({ message: 'Medication added' });
  } catch (err) {
    console.error('Failed to add medication:', err);
    res.status(500).json({ error: 'Failed to add medication' });
  }
});

module.exports = router;

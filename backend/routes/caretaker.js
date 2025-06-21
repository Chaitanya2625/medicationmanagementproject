// backend/routes/caretaker.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Ensure this is correctly set up

// GET all patients with adherence summary
router.get('/patients', async (req, res) => {
  try {
    const patients = await db.all(`
      SELECT
        u.id as patientId,
        u.name,
        COUNT(m.id) as totalMeds,
        SUM(CASE WHEN mh.taken = 1 THEN 1 ELSE 0 END) as takenMeds,
        MAX(mh.date) as lastTakenDate
      FROM users u
      LEFT JOIN medications m ON m.user_id = u.id
      LEFT JOIN med_history mh ON mh.med_id = m.id
      WHERE u.role = 'patient'
      GROUP BY u.id
    `);

    const enriched = patients.map(p => ({
      id: p.patientId,
      name: p.name,
      lastTaken: p.lastTakenDate,
      takenCount: p.takenMeds || 0,
      totalCount: p.totalMeds || 0,
      adherenceRate:
        p.totalMeds && p.takenMeds
          ? Math.round((p.takenMeds / p.totalMeds) * 100)
          : 0,
      streak: Math.floor(Math.random() * 10), // TODO: Replace with real logic
    }));

    res.json(enriched);
  } catch (err) {
    console.error('Error fetching caretaker patients:', err);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

module.exports = router; // ✅ VERY IMPORTANT

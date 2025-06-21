const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/adherence — Return list of all patients with adherence stats
router.get('/', async (req, res) => {
  try {
    const patients = await db.all(`
      SELECT users.id, users.name,
             COUNT(meds.id) as total_meds,
             SUM(CASE WHEN meds.taken = 1 THEN 1 ELSE 0 END) as taken_meds,
             MAX(meds.taken_at) as last_taken
      FROM users
      LEFT JOIN medications meds ON meds.user_id = users.id
      WHERE users.role = 'patient'
      GROUP BY users.id
    `);

    const enriched = patients.map(p => {
      const adherence = p.total_meds > 0 ? Math.round((p.taken_meds / p.total_meds) * 100) : 0;
      const streak = Math.min(p.taken_meds, 7); // simple mock streak
      return {
        id: p.id,
        name: p.name,
        adherence,
        streak,
        lastTaken: p.last_taken,
      };
    });

    res.json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch adherence data' });
  }
});

module.exports = router;

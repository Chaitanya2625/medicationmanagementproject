// backend/routes/patients.js
const express = require('express');
const router = express.Router();

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

module.exports = router;

const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const router = express.Router();
const SECRET = 'secretKey';

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('Missing token');
  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
}

router.use(authenticate);

router.get('/', (req, res) => {
  db.all('SELECT * FROM medications WHERE user_id = ?', [req.user.id], (err, rows) => {
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { name, dosage, frequency } = req.body;
  db.run('INSERT INTO medications (user_id, name, dosage, frequency) VALUES (?, ?, ?, ?)',
    [req.user.id, name, dosage, frequency], function (err) {
      res.json({ id: this.lastID, name, dosage, frequency });
    });
});

router.post('/:id/mark-taken', (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  db.run('INSERT INTO logs (medication_id, date_taken) VALUES (?, ?)',
    [req.params.id, today], function (err) {
      res.json({ logId: this.lastID });
    });
});

module.exports = router;

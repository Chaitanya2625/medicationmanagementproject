const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();
const SECRET = 'secretKey';

router.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
    [username, hash, role],
    function (err) {
      if (err) return res.status(400).json({ error: 'User exists' });
      const token = jwt.sign({ id: this.lastID, role }, SECRET);
      res.json({ token, role });
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
    if (!row) return res.status(400).json({ error: 'User not found' });
    const valid = await bcrypt.compare(password, row.password_hash);
    if (!valid) return res.status(400).json({ error: 'Invalid password' });
    const token = jwt.sign({ id: row.id, role: row.role }, SECRET);
    res.json({ token, role: row.role });
  });
});

module.exports = router;

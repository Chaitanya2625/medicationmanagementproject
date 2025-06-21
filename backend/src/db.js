// backend/src/db.js

const sqlite3 = require('sqlite3').verbose();

// ✅ Create database connection
const db = new sqlite3.Database('./data.db');

// ✅ Initialize tables
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password_hash TEXT,
    role TEXT
  )`);

  // Medications table
  db.run(`CREATE TABLE IF NOT EXISTS medications (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    name TEXT,
    dosage TEXT,
    frequency TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // Medication logs table
  db.run(`CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY,
    medication_id INTEGER,
    date_taken TEXT,
    FOREIGN KEY(medication_id) REFERENCES medications(id)
  )`);

  // ✅ Patient-Caretaker relationship table
  db.run(`CREATE TABLE IF NOT EXISTS patient_caretaker (
    patient_id INTEGER,
    caretaker_id INTEGER,
    PRIMARY KEY (patient_id, caretaker_id),
    FOREIGN KEY (patient_id) REFERENCES users(id),
    FOREIGN KEY (caretaker_id) REFERENCES users(id)
  )`);
});

// ✅ Export db so others can use it
module.exports = db;

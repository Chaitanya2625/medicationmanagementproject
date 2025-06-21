const express = require('express');
const cors = require('cors');
const path = require('path');

const patientRoutes = require('./routes/patients');     // Patients API
const caretakerRoutes = require('./routes/caretaker');  // Caretaker API

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/patients', patientRoutes);       // e.g. GET /api/patients/:id/adherence
app.use('/api/caretaker', caretakerRoutes);    // e.g. GET /api/caretaker/patients

// Root route
app.get('/', (req, res) => {
  res.send('Medication Management Backend is running ✅');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

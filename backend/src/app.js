const express = require('express');
const cors = require('cors');
const app = express();

// Route imports
const authRoutes = require('./routes/auth');
const medRoutes = require('./routes/meds');
const caretakerRoutes = require('./routes/caretaker');
const adherenceRoutes = require('./routes/adherenceRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/medications', medRoutes);
app.use('/caretaker', caretakerRoutes);
app.use('/api/adherence', adherenceRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Medication Management API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// src/app.js

require('dotenv').config();
const express = require('express');
const accessRoutes = require('./routes/access');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', accessRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
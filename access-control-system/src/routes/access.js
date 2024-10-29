// src/routes/access.js

const express = require('express');
const router = express.Router();
const { authenticate, accessControl } = require('../middleware/auth');

// Routes with access control
router.get('/admin', 
  authenticate, 
  accessControl.adminOnly, 
  (req, res) => {
    res.json({ message: 'Welcome to admin panel' });
});

router.get('/hr-department', 
  authenticate, 
  accessControl.hrDepartment, 
  (req, res) => {
    res.json({ message: 'Welcome to HR department' });
});

router.get('/finance-manager', 
  authenticate, 
  accessControl.financeManager, 
  (req, res) => {
    res.json({ message: 'Welcome to finance manager panel' });
});

router.get('/it-clearance-2', 
  authenticate, 
  accessControl.itClearance, 
  (req, res) => {
    res.json({ message: 'Welcome to IT secured area' });
});

router.get('/legal-director', 
  authenticate, 
  accessControl.legalDirector, 
  (req, res) => {
    res.json({ message: 'Welcome to legal director panel' });
});

router.get('/ops-combined', 
  authenticate, 
  accessControl.opsStaff, 
  (req, res) => {
    res.json({ message: 'Welcome to operations staff area' });
});

router.get('/exec-clearance-3', 
  authenticate, 
  accessControl.execClearance, 
  (req, res) => {
    res.json({ message: 'Welcome to executive area' });
});

module.exports = router;
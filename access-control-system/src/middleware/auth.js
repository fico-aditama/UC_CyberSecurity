// src/middleware/auth.js

const users = require('../config/users');

const authenticate = (req, res, next) => {
  const username = req.headers['x-user-id'];
  if (!username || !users[username]) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.user = users[username];
  next();
};

const accessControl = {
  // 1. Admin-only route
  adminOnly: (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admin only' });
    }
    next();
  },

  // 2. HR department route
  hrDepartment: (req, res, next) => {
    if (req.user.department !== 'HR') {
      return res.status(403).json({ error: 'Access denied: HR department only' });
    }
    next();
  },

  // 3. Finance manager route
  financeManager: (req, res, next) => {
    if (req.user.department !== 'Finance' || 
        req.user.role !== 'manager' || 
        req.user.seniority < 5) {
      return res.status(403).json({ 
        error: 'Access denied: Finance managers with 5+ years seniority only' 
      });
    }
    next();
  },

  // 4. IT clearance level route
  itClearance: (req, res, next) => {
    if (req.user.department !== 'IT' || req.user.clearanceLevel < 2) {
      return res.status(403).json({ 
        error: 'Access denied: IT department with clearance level 2+ only' 
      });
    }
    next();
  },

  // 5. Legal director route
  legalDirector: (req, res, next) => {
    if (req.user.department !== 'Legal' || 
        req.user.role !== 'director' || 
        req.user.clearanceLevel !== 3) {
      return res.status(403).json({ 
        error: 'Access denied: Legal directors with clearance level 3 only' 
      });
    }
    next();
  },

  // 6. Operations staff route
  opsStaff: (req, res, next) => {
    if (req.user.department !== 'Operations' || 
        req.user.role !== 'staff' || 
        req.user.clearanceLevel !== 1 || 
        req.user.seniority >= 3) {
      return res.status(403).json({ 
        error: 'Access denied: Operations staff with clearance level 1 and <3 years seniority only' 
      });
    }
    next();
  },

  // 7. Executive clearance route
  execClearance: (req, res, next) => {
    if (req.user.clearanceLevel !== 3 || 
        !['manager', 'director'].includes(req.user.role) || 
        req.user.seniority < 7) {
      return res.status(403).json({ 
        error: 'Access denied: Managers/Directors with clearance level 3 and 7+ years seniority only' 
      });
    }
    next();
  }
};

module.exports = {
  authenticate,
  accessControl
};
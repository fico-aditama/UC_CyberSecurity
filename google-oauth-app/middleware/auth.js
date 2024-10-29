// middleware/auth.js

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/profile');
  } else {
    return next();
  }
};

module.exports = {
  ensureAuth,
  ensureGuest
};

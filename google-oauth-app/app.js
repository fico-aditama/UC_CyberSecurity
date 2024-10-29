// app.js

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const { ensureAuth, ensureGuest } = require('./middleware/auth');

const app = express();

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// View engine
app.set('view engine', 'ejs');

// Routes
app.use('/auth', require('./routes/auth'));

// Home route
app.get('/', ensureGuest, (req, res) => {
  res.render('home');
});

// Profile route
app.get('/profile', ensureAuth, (req, res) => {
  res.render('profile', {
    user: req.user
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

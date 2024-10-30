// app.js

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const { ensureAuth, ensureGuest } = require('./middleware/auth');
const path = require('path');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
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

// Make user available in all templates
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

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

// Debug route
app.get('/debug', (req, res) => {
  res.json({
    session: req.session,
    user: req.user,
    viewsPath: app.get('views'),
    dirname: __dirname
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Views directory: ${app.get('views')}`);
});
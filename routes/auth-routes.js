const router = require('express').Router();
const passport = require('passport');

// Auth login

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/logout', (req, res) => {
  res.send('logging out');
});

// Auth with Google

router.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}));

// Callback route for Google login

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('reached callback URI');
});

module.exports = router;

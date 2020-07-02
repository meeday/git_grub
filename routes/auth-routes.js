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

module.exports = router;

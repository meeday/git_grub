const router = require('express').Router();
const { authCheck, guestCheck } = require('../middleware/auth');

router.get('/guest', guestCheck, (req, res) => {
  res.render('guest');
});

router.get('/member', authCheck, (req, res) => {
  res.render('member');
});

router.get('/dashboard', authCheck, (req, res) => {
  res.render('dashboard');
});

router.get('*', guestCheck, (req, res) => {
  res.render('guest');
});

module.exports = router;

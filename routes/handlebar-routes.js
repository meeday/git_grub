const express = require('express');

const router = express.Router();
const { authCheck, guestCheck } = require('../middleware/auth');

router.get('/guest', guestCheck, (req, res) => {
  res.render('guest');
});

router.get('/member', authCheck, (req, res) => {
  res.render('member', {
    name: req.user.displayName,
    avatar: req.user.avatar,
  });
});

router.get('/dashboard', authCheck, (req, res) => {
  res.render('dashboard', {
    displayName: req.user.displayName,
    firstName: req.user.firstName,
    suername: req.user.surname,
    avatar: req.user.avatar,
  });
});

router.get('*', guestCheck, (req, res) => {
  res.render('guest');
});

module.exports = router;

const express = require('express');

const router = express.Router();
const { authCheck, guestCheck } = require('../middleware/auth');

router.get('/guest', guestCheck, (req, res) => {
  res.render('guest');
});

router.get('/member', authCheck, (req, res) => {
  res.render('member', {
    displayName: req.user.displayName,
    firstName: req.user.firstName,
    surname: req.user.surname,
    avatar: req.user.avatar,
    id: req.user.googleId,
  });
});

router.get('/dashboard', authCheck, (req, res) => {
  console.log(req.user);
  res.render('dashboard', {
    displayName: req.user.displayName,
    firstName: req.user.firstName,
    surname: req.user.surname,
    avatar: req.user.avatar,
    id: req.user.googleId,
  });
});

router.get('/error', authCheck, (req, res) => {
  res.render('error');
});

router.get('*', guestCheck, (req, res) => {
  res.render('guest');
});

module.exports = router;

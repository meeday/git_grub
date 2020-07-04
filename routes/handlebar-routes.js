const { Router } = require('express');

const router = require('express').Router();

router.get('/guest', (req, res) => {
    res.render('guest');
});

router.get('/member', (req, res) => {
    res.render('member');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

module.exports = router;
const { Router } = require('express');

const router = require('express').Router();

router.get('/guest', (req, res) => {
    res.render('index');
})
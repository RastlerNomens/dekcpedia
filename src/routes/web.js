const express = require('express');
const router = express.Router();

const {showSignin,signin,showSignup,signup,logout} = require('../controllers/users');

router.get('/', (req,res) => {
    res.render('index');
});

router.get('/about', (req,res) => {
    res.render('about');
});

router.get('/logs', (req,res) => {
    res.render('logs');
});

/* USERS */
router.get('/users/signin',showSignin);
router.post('/users/signin',signin);
router.get('/users/signup',showSignup);
router.post('/users/signup',signup);
router.get('/logout',logout);


module.exports = router;
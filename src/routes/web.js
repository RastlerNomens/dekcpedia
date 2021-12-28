const express = require('express');
const router = express.Router();

const { isAdmin, isAuthenticated } = require('../helpers/auth');

const {showSignin,signin,showSignup,signup,logout} = require('../controllers/users');
const {getAllFaction,createFaction,getFaction,updateFaction,getChampions,deleteFaction} = require('../controllers/factions');

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

/* FACTIONS */
router.get('/factions',isAuthenticated,getAllFaction);
router.get('/factions/add',isAdmin,(req,res) => { res.render('factions/new-faction');})
router.post('/factions/new-faction',isAdmin,createFaction);
router.get('/factions/edit/:id',isAdmin,getFaction);
router.put('/factions/edit/:id',isAdmin,updateFaction);
router.get('/factions/:slug',isAuthenticated,getChampions);
router.delete('/factions/delete/:id',isAdmin,deleteFaction);

module.exports = router;
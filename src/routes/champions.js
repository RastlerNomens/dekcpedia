const express = require('express');
const router = express.Router();

const Champion = require('../models/Champion');
const Faction  = require('../models/Faction');
const { isAuthenticated, isAdmin } = require('../helpers/auth');

router.get('/champions/add', async (req,res) => {
    const factions = await Faction.find().lean();
    res.render('champions/new-champion',{factions});
});

router.post('/champions/new-champion', async(req,res) => {
    const body = req.body;

    console.log(body);
    res.redirect('/champions/add');
});

module.exports = router;
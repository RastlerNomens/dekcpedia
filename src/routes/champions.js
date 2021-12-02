const express = require('express');
const router = express.Router();

const Champion = require('../models/Champion');
const Faction  = require('../models/Faction');

const { isAuthenticated, isAdmin } = require('../helpers/auth');

router.get('/champions/add', isAdmin, async (req,res) => {
    const factions = await Faction.find().lean();
    res.render('champions/new-champion',{factions});
});

router.post('/champions/new-champion', isAdmin, async(req,res) => {
    const body = req.body;

    var bodyChamp = [];

    bodyChamp['name'] = body.name;
    bodyChamp['image'] = body.image;
    bodyChamp['type'] = body.type;
    bodyChamp['faction'] = body.faction;
    bodyChamp['rarity'] = body.rarity;
    bodyChamp['affinity'] = body.affinity;

    bodyChamp['stats'] = [];
    bodyChamp['stats']['hp'] = body.hp;
    bodyChamp['stats']['atk'] = body.atk;
    bodyChamp['stats']['def'] = body.def;
    bodyChamp['stats']['vel'] = body.vel;
    bodyChamp['stats']['pcrit'] = body.pcrit;
    bodyChamp['stats']['dcrit'] = body.dcrit;
    bodyChamp['stats']['resist'] = body.resist;
    bodyChamp['stats']['punt'] = body.punt;

    bodyChamp['points'] = [];
    bodyChamp['points']['campaign'] = body.campaign;
    bodyChamp['points']['defarena'] = body.defarena;
    bodyChamp['points']['atkarena'] = body.atkarena;
    bodyChamp['points']['minotaurus'] = body.minotaurus;
    bodyChamp['points']['clan'] = body.clan;
    bodyChamp['points']['golem'] = body.golem;
    bodyChamp['points']['spider'] = body.spider;
    bodyChamp['points']['drake'] = body.drake;
    bodyChamp['points']['fire'] = body.fire;
    bodyChamp['points']['force'] = body.force;
    bodyChamp['points']['magic'] = body.magic;
    bodyChamp['points']['spirit'] = body.spirit;
    bodyChamp['points']['void'] = body.void;
    bodyChamp['points']['factions'] = body.factions;

    const newChampion = new Champion(bodyChamp);
    await newChampion.save();
    req.flash('success_msg', 'Champion Added Successfully');
    res.redirect('/factions');
});

router.get('/champions/:id', isAuthenticated, async(req,res) => {
    const role = req.user.role; 
    if(role=='admin') {
        admin = true; 
    } else {
        admin = false;
    }
    const champion = await Champion.findById(req.params.id).lean();

    res.render('champions/profile',{champion,admin});
});

module.exports = router;
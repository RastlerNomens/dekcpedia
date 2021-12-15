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
    const files = req.files;

    var bodyChamp = getChampion(body,files);

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

router.get('/champions/edit/:id', isAdmin, async(req,res) => {

});

function getChampion(body,files) {
    var bodyChamp = [];
    
    if(files) {
        let EDFile = files.image;

        EDFile.mv(`./src/public/img/champions/${EDFile.name}`,err => {
            if(err) return res.status(500).send({message:err});
        })

        bodyChamp['image'] = EDFile.name;
    }

    bodyChamp['name'] = body.name;
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
    bodyChamp['points']['hidra'] = body.hidra;
    bodyChamp['points']['golem'] = body.golem;
    bodyChamp['points']['spider'] = body.spider;
    bodyChamp['points']['drake'] = body.drake;
    bodyChamp['points']['fire'] = body.fire;
    bodyChamp['points']['force'] = body.force;
    bodyChamp['points']['magic'] = body.magic;
    bodyChamp['points']['spirit'] = body.spirit;
    bodyChamp['points']['void'] = body.void;
    bodyChamp['points']['factions'] = body.factions;

    return bodyChamp;
}

module.exports = router;
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
    console.log(bodyChamp);
    console.log(bodyChamp['stats']['hp']);
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
    const champion = await Champion.findById(req.params.id).lean();
    res.render('champions/edit-champion');
});

router.put('/champions/edit/:id', isAdmin, async(req,res) => {

});

router.delete('/champions/delete/:id', isAdmin, async(req,res) => {
    await Champion.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Champion Deleted Successfully');
    res.redirect('/factions');
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
    bodyChamp['stats'][0] = body.hp;
    bodyChamp['stats'][1] = body.atk;
    bodyChamp['stats'][2] = body.def;
    bodyChamp['stats'][3] = body.vel;
    bodyChamp['stats'][4] = body.pcrit;
    bodyChamp['stats'][5] = body.dcrit;
    bodyChamp['stats'][6] = body.resist;
    bodyChamp['stats'][7] = body.punt;

    bodyChamp['points'] = [];
    bodyChamp['points'][0] = body.campaign;
    bodyChamp['points'][1] = body.defarena;
    bodyChamp['points'][2] = body.atkarena;
    bodyChamp['points'][3] = body.minotaurus;
    bodyChamp['points'][4] = body.clan;
    bodyChamp['points'][5] = body.hidra;
    bodyChamp['points'][6] = body.golem;
    bodyChamp['points'][7] = body.spider;
    bodyChamp['points'][8] = body.drake;
    bodyChamp['points'][9] = body.fire;
    bodyChamp['points'][10] = body.force;
    bodyChamp['points'][11] = body.magic;
    bodyChamp['points'][12] = body.spirit;
    bodyChamp['points'][13] = body.void;
    bodyChamp['points'][14] = body.factions;

    return bodyChamp;
}

module.exports = router;
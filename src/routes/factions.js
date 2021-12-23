const express = require('express');
const router = express.Router();

const Faction = require('../models/Faction');
const Champion = require('../models/Champion');
const { isAdmin, isAuthenticated } = require('../helpers/auth');

router.get('/factions', isAuthenticated, async (req,res) => {
    const role = req.user.role; 
    if(role=='admin') {
        admin = true; 
    } else {
        admin = false;
    }

    let telerianos = await Faction.find({alliance:0}).lean();
    
    res.render('factions/all-factions',{telerianos,admin}); 
});

router.get('/factions/add', isAdmin,  (req,res) => {
    res.render('factions/new-faction');
});

router.post('/factions/new-faction', isAdmin, async(req,res) => {
    const {name, slug, alliance} = req.body;
    const errors = [];

    if(!name) {
        errors.push({text: 'Please write a name'});
    }
    if(!slug) {
        errors.push({text: 'Please write a slug'});
    }
    if(!alliance) {
        errors.push({text: 'Please select alliance'});
    }
    if(errors.length > 0) {
        res.render('factions/new-faction',errors,name,slug,alliance);
    } else {
        const faction = await Faction.findOne({slug: slug});
        if(faction) {
            req.flash('error_message','This slug is already exist');
            res.render('factions/new-faction',name,slug,alliance);
        }
        
        let EDFile = req.files.image;
        
        EDFile.mv(`./src/public/img/factions/${EDFile.name}`,err => {
            if(err) return res.status(500).send({ message : err });
        })
        let image = EDFile.name;
        req.flash('success_msg','New Faction Created!');
        
        const newFaction = new Faction({name,image,slug,alliance});
        await newFaction.save();
        res.redirect('/factions');
    }
});

router.get('/factions/edit/:id', isAdmin, async(req,res) => {
    const faction = await Faction.findById(req.params.id).lean();
    res.render('factions/edit-faction',{faction});
});

router.put('/factions/edit/:id', isAdmin, async(req,res) => {
    const {name, slug, alliance} = req.body;

    if(req.files) {
        console.log('dins');
        let EDFile = req.files.image;
        
        EDFile.mv(`./src/public/img/factions/${EDFile.name}`,err => {
            if(err) return res.status(500).send({ message : err });
        })

        let image = EDFile.name;

        await Faction.findByIdAndUpdate(req.params.id,{name,image,slug,alliance})
    } else {
        await Faction.findByIdAndUpdate(req.params.id,{name,slug,alliance})
    }
        
    req.flash('success_msg', 'Faction Updated Successfully');
    res.redirect('/factions');
});

router.get('/factions/:slug', isAuthenticated, async (req,res) => {
    const role = req.user.role; 
    if(role=='admin') {
        admin = true; 
    } else {
        admin = false;
    }
    const legendarios = await Champion.find({slug: req.params.slug,rarity:4}).lean();
    const epicos = await Champion.find({slug: req.params.slug,rarity:3}).lean();
    const raros = await Champion.find({slug: req.params.slug,rarity:2}).lean();
    const infrecuentes = await Champion.find({slug: req.params.slug,rarity:1}).lean();
    const comun = await Champion.find({slug: req.params.slug,rarity:0}).lean();

    res.render('champions/faction-champion',{admin,legendarios,epicos,raros,infrecuentes,comun});
});

router.delete('/factions/delete/:id', isAdmin, async(req,res) => {
    await Faction.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Faction Deleted Successfully');
    res.redirect('/factions');
});

module.exports = router;
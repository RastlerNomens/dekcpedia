const express = require('express');
const router = express.Router();

const Faction = require('../models/Faction');
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

router.get('/factions/add', isAdmin, (req,res) => {
    res.render('factions/new-faction');
});

router.post('/factions/new-faction', isAdmin, async(req,res) => {
    const {name, image, slug, alliance} = req.body;
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
        res.render('factions/new-faction',errors,name,image,slug,alliance);
    } else {
        const faction = await Faction.findOne({slug: slug});
        if(faction) {
            req.flash('error_message','This slug is already exist');
            res.render('factions/new-faction',name,image,slug,alliance);
        }
        const newFaction = new Faction({name,image,slug,alliance});
        await newFaction.save();
        req.flash('success_msg','New Faction Created!');
        res.redirect('/factions');
    }
});

router.get('/factions/edit/:id', isAdmin, async(req,res) => {
    const faction = await Faction.findById(req.params.id).lean();
    res.render('factions/edit-faction',{faction});
});

router.put('/factions/edit/:id', isAdmin, async(req,res) => {
    const {name, image, slug, alliance} = req.body;
    await Faction.findByIdAndUpdate(req.params.id,{name,image,slug,alliance});
    req.flash('success_msg', 'Faction Updated Successfully');
    res.redirect('/factions');
});

router.get('/factions/:slug', isAuthenticated, (req,res) => {
    res.send(req.params.slug);
});

router.delete('/factions/delete/:id', isAdmin, async(req,res) => {
    await Faction.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Faction Deleted Successfully');
    res.redirect('/factions');
});

module.exports = router;
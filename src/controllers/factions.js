const Faction = require('../models/Faction');
const Champion = require('../models/Champion');
const passport = require('passport');

module.exports = {
    getAllFaction: async function(req,res) {
        const role = req.user.role;
        let admin = (role == 'admin');

        let telerianos  = await Faction.find({alliance:0}).lean();
        let pactos      = await Faction.find({alliance:1}).lean();
        let corrompidos = await Faction.find({alliance:2}).lean();
        let union       = await Faction.find({alliance:3}).lean();

        res.render('factions/all-factions',{telerianos,pactos,corrompidos,union,admin});
    },
    createFaction: async function(req,res) {
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

            EDFile.mv(`./src/public/img/factions${EDFile.name}`,err => {
                if(err) return res.status(500).send({message:err});
            })
            let image = EDFile.name;
            
            const newFaction = new Faction({name,image,slug,alliance});
            await newFaction.save();
            req.flash('success_msg','New Faction Created!');
            res.redirect('/factions');
        }
    },
    updateFaction: async function(req,res) {
        const {name,slug,alliance} = req.body;

        if(req.files) {
            let EDFile = req.files.image;

            EDFile.mv(`./src/public/img/factions/${EDFile.name}`, err => {
                if(err) return res.status(500).send({message: err});
            })

            let image = EDFile.name;
            await Faction.findByIdAndUpdate(req.params.id,{name,image,slug,alliance});
        } else {
            await Faction.findByIdAndUpdate(req.params.id,{name,slug,alliance});
        }

        req.flash('success_msg','Faction Updated Successfully');
        res.redirect('/factions');
    },
    getFaction: async function(req,res) {
        const faction = await Faction.findById(req.params.id).lean();
        res.render('factions/edit-faction',{faction});
    },
    getChampions: async function(req,res) {
        const role = req.user.role;
        let admin = (role == 'admin');

        const legendarios   = await Champion.find({faction: req.params.slug, rarity:4}).lean();
        const epicos        = await Champion.find({faction: req.params.slug, rarity:3}).lean();
        const infrecuentes  = await Champion.find({faction: req.params.slug, rarity:2}).lean();
        const raros         = await Champion.find({faction: req.params.slug, rarity:1}).lean();
        const comun         = await Champion.find({faction: req.params.slug, rarity:0}).lean();

        res.render('champions/faction-champion',{admin,legendarios,epicos,raros,infrecuentes,comun});

    },
    deleteFaction: async function(req,res) {
        await Faction.findByIdAndDelete(req.params.id);
        req.flash('success_msg','Faction Deleted Successfully');
        res.redirect('/factions');
    }
}


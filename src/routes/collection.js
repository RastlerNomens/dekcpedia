const express = require('express');
const router = express.Router();

const Collection = require('../models/Collection');

router.get('/collection', (req,res) => {
    res.render('collection/all');
});

module.exports = router;
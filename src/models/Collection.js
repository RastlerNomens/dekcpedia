const mongoose = require('mongoose');
const {Schema} = mongoose;

const CollectionSchema = new Schema({
    champion_id: {type: String},
    owner: {type: String},
    level: {type: Number},
    stars: {type: Number},
    notes: {type: String}
});

module.exports = mongoose.model('Collection',CollectionSchema);
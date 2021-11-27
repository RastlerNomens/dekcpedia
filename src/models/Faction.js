const mongoose = require('mongoose');
const {Schema} = mongoose;

const FactionSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String},
    slug: {type: String, required: true},
    alliance: {type: Number} //0 Telerianos, 1 Gaellen, 2 corrompidos, 3 unión
});

module.exports = mongoose.model('Faction',FactionSchema);
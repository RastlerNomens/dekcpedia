const mongoose = require('mongoose');
const {Schema} = mongoose;

const ChampionSchema = new Schema({
    name: {type: String, required: true},
    faction: {type: String},
    rarity: {type: Number}, //0 comun, 1 poco frecuente, 2 raro, 3 epico, 4 legendario
    affinity: {type: Number}, //0 Azul, 1 Rojo, 2 Verde, 3 Vacio
    description: {type: String},
    stats: [{type:String, value: Number}],
    points: [{dungeon: String, value: Number}]
});

module.exports = mongoose.model('Champion',ChampionSchema);
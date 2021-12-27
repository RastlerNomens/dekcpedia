const mongoose = require('mongoose');
const {Schema} = mongoose;

const ChampionSchema = new Schema({
    name: {type: String, required: true},
    faction: {type: String},
    type: {type: String}, // 0 hp, 1 apoyo, 2 ataque, 3 defensa 
    image: {type: String},
    rarity: {type: Number}, //0 comun, 1 poco frecuente, 2 raro, 3 epico, 4 legendario
    affinity: {type: Number}, //0 Azul, 1 Rojo, 2 Verde, 3 Vacio
    stats: [{type:String, value: Number}], //hp, atk, def, vel, p.crit, d.crit, resist, punt
    points: [{dungeon: String, value: Number}], //campaign, def.arena, atk.arena, mino, clan, golem, araña, drake, fuego, fuerza, magia, espiritu, vacio, facciones
});

module.exports = mongoose.model('Champion',ChampionSchema);
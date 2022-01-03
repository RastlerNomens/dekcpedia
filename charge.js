var fs = require('fs');
var request = require('request');

//require('./src/database');

const Champion = require('./src/models/Champion');

var obj = JSON.parse(fs.readFileSync('champion.json', 'utf8'));

let database = [];

for(let champ of obj) {

    let name = champ['name'].replace(' ', '-');
    download(champ['img'],`src/public/img/champions/${name}.png`,function() {});

    let bodyChamp = {'name': '','type': ''};
    bodyChamp['name'] = champ.name;
    bodyChamp['type'] = champ.type;
    bodyChamp['img'] = `${name}.png`;

    bodyChamp['stats'] = [];
    bodyChamp['stats'][0] = champ.stats[1];
    bodyChamp['stats'][1] = champ.stats[3];
    bodyChamp['stats'][2] = champ.stats[5];
    bodyChamp['stats'][3] = champ.stats[11];
    bodyChamp['stats'][4] = champ.stats[7].substring(0, champ.stats[7].length - 1);
    bodyChamp['stats'][5] = champ.stats[9].substring(0, champ.stats[9].length - 1);
    bodyChamp['stats'][6] = champ.stats[13];
    bodyChamp['stats'][7] = champ.stats[15];

    switch(champ.type) {
        case 'HP':
            bodyChamp['type'] = 2; break;
        case 'Assist':
            bodyChamp['type'] = 1; break;
        case 'Attack':
            bodyChamp['type'] = 2; break;
        case 'Def':
            bodyChamp['type'] = 3; break;
    }

    switch(champ.rarity) {
        case 'Common':
            bodyChamp['rarity'] = 0; break;
        case 'Uncommon':
            bodyChamp['rarity'] = 1; break;
        case 'Rare':
            bodyChamp['rarity'] = 2; break;
        case 'Epic':
            bodyChamp['rarity'] = 3; break;
        case 'Legendary':
            bodyChamp['rarity'] = 4; break;
    }

    switch(champ.affinity) {
        case 'Magic':
            bodyChamp['affinity'] = 0; break;
        case 'Force':
            bodyChamp['affinity'] = 1; break;
        case 'Spirit':
            bodyChamp['affinity'] = 2; break;
        case 'Void':
            bodyChamp['affinity'] = 3; break;
    }

    switch(champ.faction) {
        case 'banner-lords':
            bodyChamp['faction'] = 'hidalgos'; break;
        case 'barbarians':
            bodyChamp['faction'] = 'barbaros'; break; 
        case 'dark-elves':
            bodyChamp['faction'] = 'elfos-oscuros'; break;
        case 'demonspawn':
            bodyChamp['faction'] = 'engendros'; break;
        case 'dwarves':
            bodyChamp['faction'] = 'enanos'; break;   
        case 'high-elves':
            bodyChamp['faction'] = 'altos-elfos'; break;   
        case 'knight-revenant':
            bodyChamp['faction'] = 'aparecidos'; break;
        case 'lizardmen':
            bodyChamp['faction'] = 'hombres-lagarto'; break;
        case 'ogryn-tribes':
            bodyChamp['faction'] = 'ogretes'; break;
        case 'orcs':
            bodyChamp['faction'] = 'orcos'; break;
        case 'sacred-order':
            bodyChamp['faction'] = 'orden-sagrada'; break;
        case 'shadowkin':
            bodyChamp['faction'] = 'sombrios'; break;
        case 'skinwalkers':
            bodyChamp['faction'] = 'cambiapieles'; break;
        case 'undead-hordes':
            bodyChamp['faction'] = 'no-muertos'; break;
    }
    database.push(bodyChamp);   
}

console.log(database);

fs.writeFileSync('database.json', JSON.stringify(database));

console.log('empezamos a insertar');
Champion.insertMany(database)
.then(function(mongooseDocuments) {
     console.log('insert data!');
})
.catch(function(err) {
    console.log(err);
    console.log('errrrrrrrr');
});

function download(uri,filename,callback) {
    request.head(uri,function(err,res,body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close',callback);
    })
}

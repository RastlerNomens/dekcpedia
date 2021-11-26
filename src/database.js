const mongoose = require('mongoose');

mongoose.connect('mongodb://u4o9qlqck2xftqnnqkts:yXWTuOM5EZEAOtfHFaw2@b5vm68slfxamy5c-mongodb.services.clever-cloud.com:27017/b5vm68slfxamy5c', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));
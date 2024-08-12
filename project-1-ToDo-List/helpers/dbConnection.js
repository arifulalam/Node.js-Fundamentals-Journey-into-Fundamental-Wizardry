const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect(process.env.environment == 'development' ? process.env.LOCALDB_URL : process.env.MONGODB_URL).then(() => {
        console.log('MongoDB connected ' + (process.env.environment == 'development' ? 'locally.' : 'online'));
        console.log(process.env.environment, process.env.LOCALDB_URL);
    }).catch((error) => {
        console.log('==ERROR==')
        console.log(error)
        console.log('==END ERROR==')
    });
}

module.exports = dbConnection;
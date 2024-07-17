const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log('MongoDB connected.');
    });
}

module.exports = dbConnection;
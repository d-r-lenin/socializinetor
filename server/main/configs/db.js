const mongoose = require('mongoose');

module.exports.connect = () => {
    const uri = process.env.MONGO_URI;
    mongoose.connect(
        uri, 
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
}

// module.exports.db = mongoose.connection;
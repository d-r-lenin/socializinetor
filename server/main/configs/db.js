const mongoose = require('mongoose');


module.exports.connect = () => {
    const uri = process.env.MONGO_URI;
    mongoose.connect(
        uri,
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).catch(e=>{
        console.error(e.message);
    })
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
        
        var bucket = new mongoose.mongo.GridFSBucket(db.db, {
            bucketName: 'media'
        });
        var proBucket = new mongoose.mongo.GridFSBucket(db.db, {
            bucketName: 'profile'
        });

        mongoose.connection.bucket = bucket;
        mongoose.connection.proBucket = proBucket;
    });
}

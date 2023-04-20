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
        bucket = new mongoose.mongo.GridFSBucket(db.db, {
            bucketName: 'media'
        });
        mongoose.connection.bucket = bucket;
    });
}

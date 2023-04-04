const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    key:{
        type: String,
        required: true,
    },
    value:{
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

const Master = mongoose.model('Master', schema);

module.exports = Master;
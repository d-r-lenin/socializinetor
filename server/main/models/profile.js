// create profile model
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    bio: {
        type: String,
        default: '',
        trim: true
    }
}, 
{
    timestamps: true,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;

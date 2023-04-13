const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true,
        default: ''
    },
    image: {
        type: String,
        default: null
    },
    likes: {
        type: [String],
        default: []
    },
    dislikes: {
        type: [String],
        default: []
    },
    comments: {
        type: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    default: () => mongoose.Types.ObjectId(),
                    unique: true
                },
                username: {
                    type: String,
                    required: true,
                },
                body: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                },
                updatedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        default: []
    }
}, {
    timestamps: true,
});


postSchema.index({ "comments._id": 1 }, { unique: true });
postSchema.index({ "comments.createdAt": 1 });
postSchema.index({ "username": 1 });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;


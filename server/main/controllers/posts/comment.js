const Post = require('../../models/Post');

const controller = {
    async addComment(req,res){
        try {
            const post = await Post.findById(req.params.postId);
            post.comments.push({
                username: req.user.username,
                body: req.body.body,
                createdAt: Date.now(),
                updatedAt: Date.now()
            });
            const savedPost = await post.save();
            res.json(savedPost);
        } catch(err){
            console.error(err);
            res.status(400).json({message: err});
        }
    },

    async updateComment(req,res){
        try {
            const post = await Post.findById(req.params.postId);
            const comment = post.comments.id(req.params.commentId);
            console.log(comment);
            
            if (!comment) 
                return res.status(400).json({message: 'Comment not found'});

            if(comment.username === req.user.username){
                comment.body = req.body.body;
                comment.updatedAt = Date.now();
                const savedPost = await post.save();
                res.json(savedPost);
            } else {
                res.status(400).json({message: 'You cannot edit this comment'});
            }
        } catch(err){
            console.error(err);
            res.status(400).json({message: err});
        }
    },

    async deleteComment(req,res){
        try {
            const post = await Post.findById(req.params.postId);
            const comment = post.comments.id(req.params.commentId);
            console.log(comment);
            if(!comment) 
                return res.status(400).json({message: 'Comment not found'});

            if(comment.username === req.user.username){
                post.comments.pull(comment);
                const savedPost = await post.save();
                res.json(savedPost);
            } else {
                res.status(400).json({message: 'You cannot delete this comment'});
            }
        } catch(err){
            console.error(err);
            res.status(400).json({message: err});
        }
    }
}

module.exports = controller;
const Post = require('../../models/post.js');

const controller = {
    async addComment(req,res){
        try {
            const post = await Post.findById(req.params.postId);

            if(!post)
                throw new Error("Post not found$404");

            if(req.body.body.trim() === '')
                throw new Error("Comment body must not be empty$400");
            
            if(req.body.body.length > 300)
                throw new Error("Comment body must not be longer than 300 characters$400");

            // check if user is already in the commenters array
            if(post.comments.some(
                    comment => comment.username === req.user.username)
                ){
                throw new Error("You already commented on this post$400");
            }

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
            res.sendError(err);
        }
    },

    async updateComment(req,res){
        try {
            const post = await Post.findById(req.params.postId);

            if(!post)
                throw new Error("Post not found$404");

            if(req.body.body.trim() === '')
                throw new Error("Comment body must not be empty$400");

            if(req.body.body.length > 300)
                throw new Error("Comment body must not be longer than 300 characters$400");


            const comment = post.comments.id(req.params.commentId);
            // console.log(comment);
            
            if (!comment) 
                throw new Error("Comment not found$404");

            if(comment.username === req.user.username){
                comment.body = req.body.body;
                comment.updatedAt = Date.now();
                const savedPost = await post.save();
                res.json(savedPost);
            } else {
                throw new Error("You cannot update this comment$400");
            }
        } catch(err){
            console.error(err);
            res.sendError(err);
        }
    },

    async deleteComment(req,res){
        try {
            const post = await Post.findById(req.params.postId);
            const comment = post.comments.id(req.params.commentId);
            console.log(comment);

            if(!comment) 
                throw new Error("Comment not found$404");

            if(comment.username === req.user.username){
                post.comments.pull(comment);
                const savedPost = await post.save();
                res.json(savedPost);
            } else {
                throw new Error("You cannot delete this comment$400");
            }
        } catch(err){
            console.error(err);
            res.sendError(err);
        }
    }
}

module.exports = controller;
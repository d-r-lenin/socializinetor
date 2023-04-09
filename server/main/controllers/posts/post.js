const Post = require('../../models/Post');

const controller = {
    async getPosts(req,res){
        try{
            const posts = await Post.find();
            res.json(posts);
        } catch(err){
            res.status(400).json({message: err});
        }
    },

    async createPost(req,res){
        const post = new Post({
            title: req.body.title,
            body: req.body.body
        });
        try{
            const savedPost = await post.save();
            res.json(savedPost);
        } catch(err){
            res.status(400).json({message: err});
        }
    },

    async getPost(req,res){
        try{
            const post = await Post.findById(req.params.postId);
            res.json(post);
        } catch(err){
            res.status(400).json({message: err});
        }
    },

    async deletePost(req,res){
        try{
            const removedPost = await Post.findByIdAndDelete(req.params.postId);
            res.json(removedPost);
        } catch(err){
            console.log(err);
            res.status(400).json({message: err});
        }
    },

    async updatePost(req,res){
        try{
            const updatedPost = await Post.updateOne(
                {_id: req.params.postId},
                {$set: {title: req.body.title}}
            )
            res.json(updatedPost);
        } catch(err){
            res.status(400).json({message: err});
        }
    }
}

module.exports = controller;
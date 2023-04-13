const Post = require('../../models/Post');

const controller = {
    async getPosts(req,res){
        try{
            let page = req.query.page || 1;
            let limit = req.query.limit || 20;

            if(page < 1 || typeof page !== 'number' )
                page = 1;
            if(limit < 1 || typeof limit !== 'number' )
                limit = 20;

            const posts = await Post.aggregate([
                {
                    $facet: {
                        posts: [
                            { $skip: (page - 1) * limit },
                            { $limit: limit },
                        ],
                        totalCount: [{ $count: "count" }]
                    }
                }
            ]);

            if(!posts)
                throw new Error("No posts found$404");

            res.json(posts);
        } catch(err){
            console.log(err)
            res.sendError(err);
        }
    },

    async createPost(req,res){

        if (!req.body.title || !req.body.body)
            throw new Error("Title and body are required$400");

        const post = new Post({
            username: req.user.username,
            title: req.body.title,
            body: req.body.body
        });
        console.log(post);

        try{
            const savedPost = await post.save();
            res.json(savedPost);
        } catch(err){
            console.log(err);
            res.sendError(err);
        }
    },

    async getPost(req,res){
        try{
            
            if (!req.params.postId)
                throw new Error("Post ID is required$400");

            const post = await Post.findById(req.params.postId);
            if(!post)
                throw new Error("Post not found$404");
            
            res.json(post);
        } catch(err){
            res.sendError(err);
        }
    },

    async deletePost(req,res){
        try{

            if (!req.params.postId)
                throw new Error("Post ID is required$400");

            const post = await Post.findById(req.params.postId);

            if(!post)
                throw new Error("Post not found$404");

            if(post.username !== req.user.username)
                throw new Error("You can not delete this post$403");

            const removedPost = await Post.findByIdAndDelete(req.params.postId);
            
            res.json(removedPost);
        } catch(err){
            console.log(err);
            res.sendError(err);
        }
    },

    async updatePost(req,res){
        try{
            delete(req.body.username);

            if (!req.params.postId)
                throw new Error("Post ID is required$400");

            if (req.body.title == '' || req.body.body == '')
                throw new Error("Title and body can not be empty$400");
    
            const post = await Post.findById(req.params.postId);

            if(!post)
                throw new Error("Post not found$404");
            
            if(post.username !== req.user.username)
                throw new Error("You can not update this post$403");
            
            const updatedPost = await Post.updateOne(
                {_id: req.params.postId},
                {$set: {title: req.body.title}}
            );

            if(!updatedPost)
                throw new Error("Post not found$404");
            
            res.json(updatedPost);
        } catch(err){
            console.error(err);
            res.sendError(err);
        }
    }
}

module.exports = controller;
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const Post = require('../../models/post.js');

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

        try {
            const bucket = mongoose.connection.bucket;
            console.log(bucket)
            if (!req.body.title || !req.body.body) throw new Error("Title and body are required$400");

            const post = new Post({
                username: req.user.username,
                title: req.body.title,
                body: req.body.body,
            });
            console.log(post);

            const file = req.file;
            if (file) {
                const { originalname, mimetype, buffer } = file;
                const uploadStream = bucket.openUploadStream(originalname, {
                    contentType: mimetype,
                });
                const id = uploadStream.id;
                uploadStream.write(buffer);
                await uploadStream.end();

                post.image = id;
            }
            
            const savedPost = await post.save();
            res.json(savedPost);
        } catch (err) {
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

            const file = req.file;
            if (file) {
                const bucket = mongoose.connection.bucket;

                bucket.delete(new ObjectId(post.image));

                const { originalname, mimetype, buffer } = file;
                const uploadStream = bucket.openUploadStream(originalname, {
                    contentType: mimetype,
                });
                const id = uploadStream.id;
                uploadStream.write(buffer);
                await uploadStream.end();

                req.body.image = new ObjectId(id);
            }

            const updatedPost = await Post.updateOne(
                {_id: req.params.postId},
                {$set: {
                    title: req.body.title,
                    body: req.body.body,
                    image: req.body.image,
                }}
            );

            if(!updatedPost)
                throw new Error("Post not found$404");
            
            res.json(updatedPost);
        } catch(err){
            console.error(err);
            res.sendError(err);
        }
    },


    async getMedia(req, res) {
        try {
            const bucket = mongoose.connection.bucket;
            const id = req.params.id;
            if (!id) throw new Error("ID is required$400");


            // get file
            const downloadStream = bucket.openDownloadStream(new ObjectId(id));
            downloadStream.pipe(res);
        } catch (err) {
            res.sendError(err);
        }
    }
}

module.exports = controller;
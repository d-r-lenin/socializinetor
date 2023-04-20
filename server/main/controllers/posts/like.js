const express = require('express');

const Post = require('../../models/post.js');

const controller = {
    async addLike(req,res){
        try {
            const post = await Post.findById(req.params.postId);
            
            if(!post) 
                throw new Error({ 
                    message: "Post not found", 
                    stCode: 404
                });
            if(post.likes.includes(req.user.username)) 
                throw new Error("You already liked this post.$400");

            post.likes.push(req.user.username);
            const savedPost = await post.save();
            res.json(savedPost);
        } catch(err){
            res.sendError(err);
        }
    },

    async removeLike(req,res){
        try {
            const post = await Post.findById(req.params.postId);

            if(!post)
                throw new Error("Post not found$404");
            if(!post.likes.includes(req.user.username))
                throw new Error("You haven't liked this post yet$400");

            post.likes.pull(req.user.username);
            const savedPost = await post.save();
            res.json(savedPost);
        } catch(err){
            res.sendError(err);
        }
    },

    async dislike(req,res){
        try {
            const post = await Post.findById(req.params.postId);

            if(!post)
                throw new Error("Post not found$404");
            
            if(post.dislikes.includes(req.user.username))
                throw new Error("You already disliked this post$400");

            post.dislikes.push(req.user.username);
            const savedPost = await post.save();
            res.json(savedPost);
        } catch(err){
            res.sendError(err);
        }
    },

    async removeDislike(req,res){
        try {
            const post = await Post.findById(req.params.postId);
            if(!post)
                throw new Error("Post not found$404");

            if(!post.dislikes.includes(req.user.username))
                throw new Error("You haven't disliked this post yet$400");

            post.dislikes.pull(req.user.username);
            const savedPost = await post.save();
            res.json(savedPost);
        } catch(err){
            res.sendError(err);
        }
    }
}

module.exports = controller;
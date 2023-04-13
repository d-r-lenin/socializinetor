const express = require('express');

const Post = require('../../models/Post');

const controller = {
    async addLike(req,res){
        try {
            const post = await Post.findById(req.params.postId);
            post.likes.push(req.user.username);
            const savedPost = await post.save();
            res.json(savedPost);
        } catch(err){
            res.status(400).json({message: err});
        }
    },

    async removeLike(req,res){
        try {
            const post = await Post.findById(req.params.postId);
            post.likes.pull(req.user.username);
            const savedPost = await post.save();
            res.json(savedPost);
        } catch(err){
            res.status(400).json({message: err});
        }
    },

    async dislike(req,res){
        try {
            const post = await Post.findById(req.params.postId);
            post.dislikes.push(req.user.username);
            const savedPost = await post.save();
            res.json(savedPost);
        } catch(err){
            res.status(400).json({message: err});
        }
    },

    async removeDislike(req,res){
        try {
            const post = await Post.findById(req.params.postId);
            post.dislikes.pull(req.user.username);
            const savedPost = await post.save();
            res.json(savedPost);
        } catch(err){
            res.status(400).json({message: err});
        }
    }
}

module.exports = controller;
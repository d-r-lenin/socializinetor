// create route
const express = require('express');

const router = express.Router();

const postController = require('../../controllers/posts/post');

router.get('/', postController.getPosts);
router.post('/', postController.createPost);
router.get('/:postId', postController.getPost);
router.delete('/:postId', postController.deletePost);
router.patch('/:postId', postController.updatePost);


module.exports = router;
// create route
const express = require('express');

const router = express.Router();

const {
    getPosts,
    createPost,
    getPost,
    deletePost,
    updatePost
} = require('../../controllers/posts/post');

const {
    addLike,
    removeLike,
    dislike,
    removeDislike
} = require('../../controllers/posts/like');

const {
    addComment,
    deleteComment,
    updateComment
} = require('../../controllers/posts/comment');

// post routes
router
    .get('/', getPosts)
    .post('/', createPost)
    .get('/:postId', getPost)
    .delete('/:postId', deletePost)
    .patch('/:postId', updatePost)

// like routes
router
    .patch('/:postId/like', addLike)
    .patch('/:postId/unlike', removeLike)
    .patch('/:postId/dislike', dislike)
    .patch('/:postId/undislike', removeDislike)


// comment routes
router
    .post('/:postId/comment', addComment)
    .delete('/:postId/comment/:commentId', deleteComment)
    .patch('/:postId/comment/:commentId', updateComment)

//  export router
module.exports = router;
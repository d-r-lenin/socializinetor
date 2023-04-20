// create route
const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

const {
    getPosts,
    createPost,
    getPost,
    deletePost,
    updatePost,
    getMedia
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


router
    .get('/media/:id', getMedia);

// post routes
router
    .get('/', getPosts)
    .post('/', upload.single('media') ,createPost)
    .get('/:postId', getPost)
    .delete('/:postId', deletePost)
    .patch('/:postId', upload.single('media'), updatePost)

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
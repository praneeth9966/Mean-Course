const express = require('express');

const router = express.Router();

const PostController = require('../controllers/posts');

const checkAuth = require('../middleware/check-auth');

router.post("", checkAuth, PostController.createPost);

router.get('', PostController.getPosts);

router.put("/:id", checkAuth, PostController.updatePost);

router.get('/:id', PostController.getPost);

router.delete('/:id', checkAuth, PostController.deletePost);

module.exports = router;
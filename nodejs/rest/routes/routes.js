const express = require('express');
const feedController = require('../controller/feed');
const auth = require('../controller/auth');
const isAuth = require('../controller/is-auth');

const router = express.Router();

router.get('/posts', isAuth, feedController.getPosts);

router.post('/post', isAuth, feedController.postPost);

router.post('/login', auth.login);

module.exports = router;

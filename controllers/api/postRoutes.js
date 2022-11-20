const router = require('express').Router();
const { User, Post, Comment } = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id,
    })
    .then((newPostData) => {
        res.json(newPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});


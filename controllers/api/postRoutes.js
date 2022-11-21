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

router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then((updatePostData) => {
        if (!updatePostData) {
            res.status(404).json({ message: 'Invalid ID' });
            return;
        } else {
            res.json(updatePostData)
        }
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    })
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then((deletePostData) => {
        if (!deletePostData) {
            res.status(404).json({ message: 'Invalid ID' });
            return;
        } else {
            res.json(deletePostData)
        }
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    })
});

module.exports = router;
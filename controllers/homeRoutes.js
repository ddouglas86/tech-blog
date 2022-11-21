const router = require("express").Router();
const { User, Post, Comment } = require("../models");

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            id,
            title,
            content,
            date_created,
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: [
                    id,
                    content,
                    post_id,
                    user_id,
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then((postData) => {
            const allPosts = postData.map(post => post.get({ plain: true }));
            res.render('homepage', {
                allPosts
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'date_created',
        ],
        include: [
            {
                model: User,
                attributes: [
                    'username'
                ]
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'content',
                    'post_id',
                    'user_id',
                ],
                include: {
                    model: User,
                    attributes: [
                        'username'
                    ]
                }
            }
        ]
    })
        .then((postData) => {
            if (!postData) {
                res.status(404).json({ message: 'Invalid ID' });
                return;
            } else {
                const post = postData.get({ plain: true });
                res.render('single-post', {
                    post
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;
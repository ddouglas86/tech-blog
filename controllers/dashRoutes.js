const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id,
        },
        attributes: [
            'id',
            'title',
            'content',
            'user_id'
        ],
        include: [
            {
                model: User,
                attributes: [
                    'username'
                ],
            },
            {
                model: Comment,
                attributes: [
                    'id', 
                    'content', 
                    'user_id'
                ],
                include: [
                    {
                        model: User,
                        attributes: [
                            'username'
                        ],
                    }
                ]
            }
        ]
    })
})
.then(postData => {
    if (!postData) {
        res.status(404).json({ message: 'No posts'});
        return;
    }
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: req.session.loggedIn});
})
.catch((err) => {
    console.log(err);
    res.status(500).json(err);
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'dateCreated',
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'content',
                    'post_id',
                    'user_id'
                ],
                include: {
                    model: User,
                    attributes: [
                        'username'
                    ]
                }
            },
            {
                model: User,
                attributes: [
                    'username'
                ]
            }
        ]
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'Invalid ID' });
            return;
        } else {
            const post = postData.get({ plain: true });
            res.render('editPost', { post, loggedIn: true });
        }
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

module.exports = router;
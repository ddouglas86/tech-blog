const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");

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
    .then(postData => {
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


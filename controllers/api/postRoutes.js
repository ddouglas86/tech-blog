const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newPostData = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newPostData);

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePostData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        if (!updatePostData) {
            res.status(404).json({ message: 'Invalid ID' });
            return;
        } else {
            res.status(200).json(updatePostData)
        };

    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePostData = await Post.destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        );

        if (!deletePostData) {
            res.status(404).json({ message: 'Invalid ID' });
            return;
        } else {
            res.json(deletePostData)
        };

    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
});

module.exports = router;
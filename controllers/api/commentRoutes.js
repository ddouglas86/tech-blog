const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, (req, res) => {
    Comment.create({
        content: req.body.content,
        user_id: req.session.user_id,
        post_id: req.session.post_id,
    })
        .then((newCommentData) => {
            if (!newCommentData) {
                res.status(404).json({ message: 'Invalid ID' });
                return;
            } else {
                res.json(newCommentData)
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json(err);
        })
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then((deleteCommentData) => {
            if (!deleteCommentData) {
                res.status(404).json({ message: 'Invalid ID' });
                return;
            } else {
                res.json(deleteCommentData)
            }
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
});

module.exports = router;
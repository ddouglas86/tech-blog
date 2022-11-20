const router = require('express').Router();
const { User } = require('../../models');

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(newUserData => {
        req.session.save(() => {
            req.session.user_id = newUserData.id;
            req.session.username = newUserData.username;
            req.session.loggedIn = true;
            res.json(newUserData)
        })
    })
    .catch(err => {
        res.status(500).json(err);
    })
});
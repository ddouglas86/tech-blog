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

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(400).json({ message: 'Invalid email address' });
            return;
        }

        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Invalid password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are logged in!' });
        })
    })
});


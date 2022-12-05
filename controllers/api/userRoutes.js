const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
    try{
        const newUserData = await User.create(req.body)
        
            req.session.save(() => {
                req.session.user_id = newUserData.id;
                req.session.loggedIn = true;
                res.json(newUserData)
            })
       
        }
        catch(err) {
            res.status(500).json(err);
        }
});

router.post('/login', async (req, res) => {
    try { 
        const userData = await User.findOne({
        where: {
            email: req.body.email
        }
    });
        
            if (!userData) {
                res.status(400).json({ message: 'Invalid email address' });
                return;
            }

            const validPassword = await userData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Invalid password' });
                return;
            }

            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.loggedIn = true;
                res.json({ user: userData, message: 'You are logged in!' });
            })
    } 
    catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
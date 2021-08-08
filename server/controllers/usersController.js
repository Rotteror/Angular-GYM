const router = require('express').Router();
const { authCookieName } = require('../config');
const { register, login } = require('../services/users');

router.post('/register', async (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try {
        if (!email.trim()) {
            throw new Error('Email is required');
        }
        if (password.trim().length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        const userData = await register(username, email.toLocaleLowerCase(), password.trim());
        res.cookie(authCookieName, userData.accessToken, { httpOnly: true })
        res.json(userData)
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
})

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const userData = await login(email, password);
        res.cookie(authCookieName, userData.accessToken, { httpOnly: true })
        res.json(userData)
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
})

router.get('/logout', async (req, res) => {
    res.clearCookie(authCookieName).status(204).send({message: 'Logget Out'});
})

module.exports = router;
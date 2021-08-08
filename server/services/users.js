const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

async function register(username, email, password) {
    //check if user exist
    const existing = await User.findOne({ email });
    if (existing) {
        const err = new Error('User already exist !');
        err.status = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        email,
        hashedPassword
    });
    //hashed password

    //store user
    await user.save();
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        accessToken: createToken(user)
    };

};

async function login(email, password) {
    //check if user exist
    const user = await User.findOne({ email });
    if (!user) {
        const err = new Error('Incorrect email or password!');
        err.status = 401;
        throw err;
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        const err = new Error('Incorrect email or password!');
        err.status = 401;
        throw err;
    }
       

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        accessToken: createToken(user)
    };

};

function createToken(user) {
    const token = jwt.sign({
        _id: user.id,
        username: user.username,
        email: user.email
    }, SECRET)

    return token;
}

// function readToken(req) {
//     const token = req.cookies[COOKIE_NAME];
//     if (token) {
//         try {
//             const userData = jwt.verify(data, TOKEN_SECRET);
//             req.user = userData;
//             res.locals.user = userData;
//         } catch (err) {
//             res.clearCookie(COOKIE_NAME);
//             res.redirect('/auth/login');
//             return false;
//         }
//         return true;
//     }
// }



module.exports = {
    register,
    login,
}
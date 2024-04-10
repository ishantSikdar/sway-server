const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { logger } = require('../config/logger')
const User = require("../db/model/User");

const JWT_SECRET = process.env.JWT_SECRET;

exports.signUp = async (req) => {
    const existingUser = await User.findOne({
        $or: [
            { username: req.body.username },
            { email: req.body.email },
            { mobile: req.body.mobile }
        ]
    });

    if (existingUser) {
        req.status = 409;
        throw new Error('User already exists');
    }

    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        mobile: req.body.mobile,
    })

    const user = await newUser.save();
    logger.info(`User ${user._id} Registered`);
}

exports.signIn = async (req) => {
    const user = await User.findOne({
        $or: [
            { username: req.body.username },
            { email: req.body.username },
            { mobile: req.body.username }
        ]
    });

    if (!user) {
        req.status = 404;
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if (!isPasswordValid) {
        req.status = 401;
        throw new Error('Invalid Username or Password');
    }

    return jwt.sign({ username: user.username }, JWT_SECRET);
}
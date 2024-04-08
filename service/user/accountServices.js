const jwt = require('jsonwebtoken')
const User = require("../../db/model/User");

exports.signUp = async (req) => {
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
    })

    await newUser.save();
}

exports.signIn = async (req) => {
    const reqUsername = req.body.username;
    const reqPassword = req.body.password;

    const user = User.find({
        username: reqUsername,
        password: reqPassword,
    })

    return jwt.sign(user.username, JWT_SECRET)
}

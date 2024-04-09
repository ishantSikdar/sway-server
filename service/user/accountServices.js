const jwt = require('jsonwebtoken')
const User = require("../../db/model/User");
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET;

exports.signUp = async (req) => {
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        mobile: req.body.mobile,
    })

    await newUser.save()
        .then(() => {
            console.log("User Saved SuccessFully");
        })
        .catch((err) => {
            console.log(`Server error: ${err.message}`)
        });
}

exports.signIn = async (req) => {
    const user = await User.find({ username: req.body.username });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(user.password, req.body.password);
    if (!isPasswordValid) {
        throw new Error('Invalid username or password');
    }

    return jwt.sign({ username: user.username }, JWT_SECRET);
}

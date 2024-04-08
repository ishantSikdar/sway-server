const jwt = require('jsonwebtoken');
const accountServices = require('../service/user/accountServices');

exports.signup = async (req, res) => {
    try {
        await accountServices.signUp(req);
        return res.status(200).json({
            message: `New Account Registered`
        })

    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error.message}`,
        })
    }
}

exports.signin = async (req, res) => {
    try {
        const token = await accountServices.signIn(req);
        return res.status(200).json({
            auth: token
        })

    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error.message}`,
        })
    }
}
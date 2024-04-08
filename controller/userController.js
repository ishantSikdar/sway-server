const jwt = require('jsonwebtoken');
const accountServices = require('../service/user/account');

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    try {
        await accountServices.signUp(req);
        return res.status(200).json({
            message: `New User Added Successfully`
        })

    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error.message}`,
        })
    }
}

exports.signin = async (req, res) => {
    try {

        return res.status(200).json({
            auth: `Bearer ${token}`
        })

    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error.message}`,
        })
    }
}
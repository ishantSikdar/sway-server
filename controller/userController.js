const jwt = require('jsonwebtoken');
const accountServices = require('../service/user/accountServices');
const { logger } = require('../config/logger');

exports.signup = async (req, res) => {
    try {
        await accountServices.signUp(req);
        return res.status(200).json({
            message: `New Account Registered`
        })

    } catch (error) {
        logger.error(`Error Registering New User of Email: ${req.body.email}, Cause: ${error.message}`);

        if (req.status === 409) {
            return res.status(req.status).json({
                message: `User already Exists By Username, Email or Mobile`,
            })
        }

        return res.status(500).json({
            message: `Failed to register new user`,
        })
    }
}

exports.signin = async (req, res) => {
    try {
        const token = await accountServices.signIn(req);
        return res.status(200).json({
            authToken: token
        })

    } catch (error) {
        logger.error(`Error Signing in user of username: ${req.body.username}, Cause: ${error.message}`)

        if (req.status === 404) {
            return res.status(req.status).json({
                message: `User not found`,
            })
        }

        if (req.status === 401) {
            return res.status(req.status).json({
                message: `Invalid username or password`,
            })
        }

        return res.status(500).json({
            message: `Error occurred in Login`,
        })
    }
}
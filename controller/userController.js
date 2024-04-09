const jwt = require('jsonwebtoken');
const accountServices = require('../service/user/accountServices');
const { logger } = require('../config/logger');
const { ApiResponse } = require('../classes/ApiResponse');

exports.signup = async (req, res) => {
    try {
        await accountServices.signUp(req);
        return res.status(200).json(
            new ApiResponse(`New account registered`)
        );

    } catch (error) {
        logger.error(`Error Registering New User of Email: ${req.body.email}, Cause: ${error.message}`);

        if (req.status === 409) {
            return res.status(req.status).json(
                new ApiResponse(`User already exists`)
            );
        }

        return res.status(500).json(
            new ApiResponse(`Failed to register new user`)
        );
    }
}

exports.signin = async (req, res) => {
    try {
        const token = await accountServices.signIn(req);
        return res.status(200).json(
            new ApiResponse(`Signin Successful`, { authToken: token })
        );

    } catch (error) {
        logger.error(`Error Signing in user of username: ${req.body.username}, Cause: ${error.message}`)

        if (req.status === 404) {
            return res.status(req.status).json(
                new ApiResponse(`User not found`)
            );
        }

        if (req.status === 401) {
            return res.status(req.status).json(
                new ApiResponse(`Invalid username or password`)
            );
        }

        return res.status(500).json(
            new ApiResponse(`Error occured during login`)
        );
    }
}
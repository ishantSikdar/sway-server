const jwt = require('jsonwebtoken');
const accountServices = require('../service/user/accountServices');
const { logger } = require('../config/logger');
const { ApiResponse } = require('../classes/ApiResponse');
const { API_REQ_LOG } = require('../constant/logConstants');

exports.signup = async (req, res) => {
    try {
        await accountServices.signUp(req);
        const apiResponse = new ApiResponse(`New account registered`)
        logger.info(API_REQ_LOG(apiResponse.requestId, `Success`, `Sign Up operation successful`));
        return res.status(200).json(apiResponse);

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
        const apiResponse = new ApiResponse(`Signin Successful`, { authToken: token });
        logger.info(API_REQ_LOG(apiResponse.requestId, `Success`, `Sign In operation successful`));

        return res.status(200).json(apiResponse);

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
const accountServices = require('../service/user/accountServices');
const { logger } = require('../config/logger');
const { ApiResponse } = require('../classes/ApiResponse');
const { API_REQ_LOG } = require('../constant/logConstants');

exports.signup = async (req, res) => {
    try {
        await accountServices.signUp(req);
        const apiResponse = new ApiResponse(`New account registered`)
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, `Sign Up operation successful`));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Error Registering New User of Email: ${req.body.email}, Cause: ${error.message}`;

        if (req.status === 409) {
            const apiResponse = new ApiResponse(`User already exists`)
            logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause));
            return res.status(req.status).json(apiResponse);
        }

        const apiResponse = new ApiResponse(`Failed to register new user`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause));
        return res.status(500).json(apiResponse);
    }
}

exports.signin = async (req, res) => {
    try {
        const token = await accountServices.signIn(req);
        const apiResponse = new ApiResponse(`Signin Successful`, { authToken: token });
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, `Sign In operation successful`));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Error Signing in user of username: ${req.body.username}, Cause: ${error.message}`;

        if (req.status === 404) {
            const apiResponse = new ApiResponse(`User not found`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause));
            return res.status(req.status).json(apiResponse);
        }

        if (req.status === 401) {
            const apiResponse = new ApiResponse(`Invalid username or password`)
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause));
            return res.status(req.status).json(apiResponse);
        }

        const apiResponse = new ApiResponse(`Error occured during login`)
        logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause));
        return res.status(500).json(apiResponse);
    }
}
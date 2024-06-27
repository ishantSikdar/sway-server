const accountServices = require('../service/accountServices');
const { logger } = require('../config/logger');
const { ApiResponse } = require('../classes/ApiResponse');
const { API_REQ_LOG } = require('../constant/logConstants');

exports.signupRoute = async (req, res) => {
    try {
        await accountServices.signUp(req);
        const apiResponse = new ApiResponse(`New account registered`)
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, `Sign Up operation successful`, req.url));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Error Registering New User of Email: ${req.body.email}, Cause: ${error.message}`;

        if (req.status === 409) {
            const apiResponse = new ApiResponse(`User already exists`);
            logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }

        const apiResponse = new ApiResponse(`Failed to register new user`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}

exports.signinRoute = async (req, res) => {
    try {
        const token = await accountServices.signIn(req);
        const apiResponse = new ApiResponse(`Signin Successful`, { authToken: token });
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, `Sign In operation successful`, req.url));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Error Signing in user of username: ${req.body.username}, Cause: ${error.message}`;

        if (req.status === 404) {
            const apiResponse = new ApiResponse(`User not found`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }

        if (req.status === 401) {
            const apiResponse = new ApiResponse(`Invalid username or password`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }

        const apiResponse = new ApiResponse(`Error occured during login`);
        logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}

exports.userDetailsRoute = async (req, res) => {
    try {
        const user = await accountServices.getUserDetails(req);
        const apiResponse = new ApiResponse(`Fetched User Details`, { loggedInUser: user });
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, `User Details fetched successfully`, req.url));
        return res.status(200).json(apiResponse);

    } catch(error) {
        const cause = `Error fetching user details of username: ${req.userId}, Cause: ${error.message}`;

        if (req.status === 404) {
            const apiResponse = new ApiResponse(`User not found`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }

        const apiResponse = new ApiResponse(`Error occured fetching User Details`);
        logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);

    }
}

exports.editUserDetailsRoute = async (req, res) => {
    try {
        await accountServices.editUserDetails(req);
        const apiResponse = new ApiResponse(`Edited User Details`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, `User Details edited successfully`, req.url));
        return res.status(200).json(apiResponse);

    } catch(error) {
        const cause = `Error editing user details of username: ${req.userId}, Cause: ${error.message}`;

        if (req.status === 404) {
            const apiResponse = new ApiResponse(`User not found`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }

        const apiResponse = new ApiResponse(`Error occured editing User Details`);
        logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);

    }
}

exports.editUserProfilePictureRoute = async (req, res) => {
    try {
        await accountServices.editProfilePicture(req);
        const apiResponse = new ApiResponse(`Edited Profile Picture`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, `User Profile picture edited successfully`, req.url));
        return res.status(200).json(apiResponse);

    } catch(error) {
        const cause = `Error editing user profile picture, ${req.userId}, Cause: ${error.message}`;

        if (req.status === 404) {
            const apiResponse = new ApiResponse(`User not found`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }

        const apiResponse = new ApiResponse(`Error occured editing User profile picture`);
        logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);

    }
}

exports.editUserBannerPictureRoute = async (req, res) => {
    try {
        await accountServices.editBannerPicture(req);
        const apiResponse = new ApiResponse(`Edited Banner Picture`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, `User Banner picture edited successfully`, req.url));
        return res.status(200).json(apiResponse);

    } catch(error) {
        const cause = `Error editing user banner picture, ${req.userId}, Cause: ${error.message}`;

        if (req.status === 404) {
            const apiResponse = new ApiResponse(`User not found`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }

        const apiResponse = new ApiResponse(`Error occured editing User banner picture`);
        logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);

    }
}

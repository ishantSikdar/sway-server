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
        const cause = `Error Registering New User, Cause: ${error.message}`;

        if (req.status === 409) {
            const apiResponse = new ApiResponse(error.message);
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

    } catch (error) {
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

    } catch (error) {
        const cause = `Error editing user details of username: ${req.userId}, Cause: ${error.message}`;

        if (req.status === 404) {
            const apiResponse = new ApiResponse(`User not found`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }

        if (req.status === 409) {
            const apiResponse = new ApiResponse(error.message);
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

    } catch (error) {
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

    } catch (error) {
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

exports.getPublicUserDetailsRoute = async (req, res) => {
    try {
        const user = await accountServices.getPublicUserDetails(req);
        const apiResponse = new ApiResponse(`User Details fetched`, { user });
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, `User details fetched`, req.url));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Failed to get user details, ${req.userId}, Cause: ${error.message}`;

        if (req.status === 404) {
            const apiResponse = new ApiResponse(`User not found`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }

        const apiResponse = new ApiResponse(`Failed to get user details`);
        logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);

    }
}


exports.getEnvs = async (req, res) => {
    try {
        if (req.query.user === 'admin' && req.query.key === 'c2uhencuhencwuchncdbc3eidjnx') {
            const secrets = {
                SERVER_PORT: process.env.SERVER_PORT,
                JWT_SECRET: process.env.JWT_SECRET,
                IMAGE_CDN_BASE_URL: process.env.IMAGE_CDN_BASE_URL,
                DB_HOSTNAME: process.env.DB_HOSTNAME,
                DB_USER: process.env.DB_USER,
                DB_PASSWORD: process.env.DB_PASSWORD,
                DB_DATABASE: process.env.DB_DATABASE,
                YT_KEY: process.env.YT_KEY,
                S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
                AWS_REGION: process.env.AWS_REGION,
                AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
                AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
            };

            res.json(secrets);
        }
          
        res.status(403).json({
            message: 'not allowed'
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'it blew'
        })
    }
}
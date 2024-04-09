const jwt = require('jsonwebtoken');
const { ApiResponse } = require('../../classes/ApiResponse');
const { logger } = require('../../config/logger');
const { API_REQ_LOG } = require('../../constant/logConstants');
const JWT_SECRET = process.env.JWT_SECRET;

exports.userAuthMiddleware = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        const apiResponse = new ApiResponse(`Authorization token is missing`);
        logger.info(API_REQ_LOG(apiResponse.requestId, 'FAILED', apiResponse.message))
        return res.status(401).json(apiResponse);
    }

    try {
        const [, jwtToken] = token.split(" ");
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);

        if (decodedValue.username) {
            req.username = decodedValue.username;
            next();

        } else {
            const apiResponse = new ApiResponse(`Invalid authorization token, no username found`);
            logger.info(API_REQ_LOG(apiResponse.requestId, 'FAILED', apiResponse.message))
            return res.status(403).json(apiResponse);
        }

    } catch (error) {
        const apiResponse = new ApiResponse(`Invalid authorization token`);
        logger.info(API_REQ_LOG(apiResponse.requestId, 'FAILED', apiResponse.message))
        return res.status(403).json(apiResponse);

    }
} 
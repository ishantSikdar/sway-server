const { createCommunity } = require("../service/communityServices");
const { ApiResponse } = require("../classes/ApiResponse");
const { logger } = require("../config/logger");
const { API_REQ_LOG } = require("../constant/logConstants");

exports.createCommunityRoute = async (req, res) => {
    try {
        await createCommunity(req);
        const apiResponse = new ApiResponse(`Community Created`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Failed to create community: ${error.message}`;
        const apiResponse = new ApiResponse(`Failed to create community`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    } 
}
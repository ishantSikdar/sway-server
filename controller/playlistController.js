const { ApiResponse } = require("../classes/ApiResponse");
const { API_REQ_LOG } = require("../constant/logConstants");
const { processTopicGeneration } = require("../service/playlistServices");

exports.generateTopicsRoute = async (req, res) => {
    try {
        const topicsJSON = await processTopicGeneration(req);
        const apiResponse = new ApiResponse(`Topic Generated`, { struct: topicsJSON });
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, `Topics Generated Successfully`, req.url));

    } catch (error) {
        const cause = `Enable to generate topics: ${error.message}`;
        const apiResponse = new ApiResponse(`Topic Generation Failed`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
} 
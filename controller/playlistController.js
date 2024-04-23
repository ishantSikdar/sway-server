const { ApiResponse } = require("../classes/ApiResponse");
const { logger } = require("../config/logger");
const { API_REQ_LOG } = require("../constant/logConstants");
const { getAllSubjects } = require("../service/playlistServices");


exports.getSubjectsListRoute = async (req, res) => {
    try {
        const courses = await getAllSubjects(req);
        const apiResponse = new ApiResponse(`Subjects List Retreived`, courses);
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Failed to get subjects: ${error.message}`;
        const apiResponse = new ApiResponse(`Failed to get subject list`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}

exports.getSubjectDetailsRoute = async (req, res) => {
    try {
        const courses = await (req);
        const apiResponse = new ApiResponse(`Subject Retreived`, courses);
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Failed to get subject: ${error.message}`;
        const apiResponse = new ApiResponse(`Failed to get subject`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}

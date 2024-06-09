const { ApiResponse } = require("../classes/ApiResponse");
const { logger } = require("../config/logger");
const { API_REQ_LOG } = require("../constant/logConstants");
const { getSubjectsByName, getSubjectById } = require("../service/playlistServices");


exports.getSubjectsListRoute = async (req, res) => {
    try {
        const subjects = await getSubjectsByName(req.query.searchTag);
        const apiResponse = new ApiResponse(`Subjects List Retreived`, subjects);
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Failed to get subjects: ${error.message}`;
        const apiResponse = new ApiResponse(`Failed to get subject list`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}

exports.getSubjectByIdRoute = async (req, res) => {
    try {
        const subject = await getSubjectById(req.query.subjectId);
        const apiResponse = new ApiResponse(`Subjects Retreived`, subject);
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Failed to get subject: ${error.message}`;
        const apiResponse = new ApiResponse(`Failed to get subject`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}
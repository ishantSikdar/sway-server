const { ApiResponse } = require("../classes/ApiResponse");
const { getAllCourses, getCourseInfo, updateCourseDetails } = require("../service/courseServices");
const { logger } = require("../config/logger");
const { API_REQ_LOG } = require("../constant/logConstants");


exports.getCoursesRoute = async (req, res) => {
    try {
        const courses = await getAllCourses(req);
        const apiResponse = new ApiResponse(`Course List Retreived`, courses);
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Failed to get courses: ${error.message}`;
        const apiResponse = new ApiResponse(`Failed to get course list`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}

exports.getCourseRoute = async (req, res) => {
    try {
        const course = await getCourseInfo(req);
        const apiResponse = new ApiResponse(`Course Retreived`, course);
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Failed to get course: ${error.message}`;
        const apiResponse = new ApiResponse(`Failed to find course`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}

exports.updateCourseRoute = async (req, res) => {
    try {
        await updateCourseDetails(req);
        const apiResponse = new ApiResponse(`Course Details Updated`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Failed to update course: ${error.message}`;
        const apiResponse = new ApiResponse(`Failed to update course`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    } 
}
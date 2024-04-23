const { logger } = require("../config/logger");
const Course = require("../db/model/Course");

exports.getAllCourses = async (req) => {
    const courses = await Course.find();
    return courses;
}

exports.getCourseInfo = async (req) => {
    const course = await Course.findOne({
        _id: req.params.courseId
    });

    if (!course) {
        throw new Error(`Course of Id: ${req.params.courseId} not found`);
    }
    return course;
}

exports.updateCourseDetails = async (req) => {
    try {
        const updatedCourse = await Course.updateOne(
            { _id: req.body.courseId },
            req.body.updatedCourseDetails
        );

        if (updatedCourse.nModified > 0) {
            logger.info(`Course: ${req.body.courseId} details updated`);
        } else {
            logger.warn(`Course: ${req.body.courseId} not found or details unchanged`);
        }

        return updatedCourse;
    } catch (error) {
        logger.error(`Course: ${req.body.courseId} details failed to update, Cause: ${error.message}`);
        throw new Error(`Course: ${req.body.courseId} details failed to update`);
    }
}

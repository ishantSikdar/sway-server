import Course from "../db/model/Course"

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
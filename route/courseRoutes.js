import { Router } from "express";
import { API_URI_COURSE, API_URI_COURSES } from "../constant/endpoints";
import { getCourseRoute, getCoursesRoute, updateCourseRoute } from "../controller/courseController";
const router = Router();

router.get(API_URI_COURSES, getCoursesRoute); // get all courses
router.get(API_URI_COURSE, getCourseRoute); // get a course
router.patch(API_URI_COURSE, updateCourseRoute);


module.export = router;
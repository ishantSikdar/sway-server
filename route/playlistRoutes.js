import { Router } from 'express';
import { API_URI_SUBJECT, API_URI_SUBJECTS } from '../constant/endpoints';
import { getSubjectsListRoute, getSubjectDetailsRoute } from '../controller/playlistController';
const router = Router();

router.get(API_URI_SUBJECTS, getSubjectsListRoute);
router.get(API_URI_SUBJECT, getSubjectDetailsRoute);


module.exports = router;
const { Router } = require('express');
const { API_URI_SUBJECT, API_URI_SUBJECTS } = require('../constant/endpoints');
const { getSubjectsListRoute, getSubjectDetailsRoute } = require('../controller/playlistController');
const router = Router();

router.get(API_URI_SUBJECTS, getSubjectsListRoute);
router.get(API_URI_SUBJECT, getSubjectDetailsRoute);


module.exports = router;
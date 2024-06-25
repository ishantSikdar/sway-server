const { Router } = require('express');
const { API_URI_SUBJECT, API_URI_SUBJECTS, API_URI_SUBJECT_TOPIC } = require('../constant/endpoints');
const { getSubjectsListRoute, getSubjectByIdRoute, getTopicVideosByTitleRoute } = require('../controller/playlistController');
const router = Router();

router.get(API_URI_SUBJECTS, getSubjectsListRoute);
router.get(API_URI_SUBJECT, getSubjectByIdRoute);
router.get(API_URI_SUBJECT_TOPIC, getTopicVideosByTitleRoute);

module.exports = router;
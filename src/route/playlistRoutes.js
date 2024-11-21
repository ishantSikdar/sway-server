const { Router } = require('express');
const { API_URI_SUBJECT, API_URI_SUBJECTS, API_URI_SUBJECT_TOPIC, API_URI_SUBJECT_BY_AI } = require('../constant/endpoints');
const { getSubjectsListRoute, getSubjectByIdRoute, getTopicVideosByTitleRoute, getSubjectGeneratedByAI } = require('../controller/playlistController');
const router = Router();

router.get(API_URI_SUBJECTS, getSubjectsListRoute);
router.get(API_URI_SUBJECT, getSubjectByIdRoute);
router.get(API_URI_SUBJECT_TOPIC, getTopicVideosByTitleRoute);
router.post(API_URI_SUBJECT_BY_AI, getSubjectGeneratedByAI);

module.exports = router;
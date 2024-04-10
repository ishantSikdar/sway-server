const { Router } = require('express');
const { API_URI_GENERATE_TOPICS } = require('../constant/endpoints');
const { generateTopicsRoute } = require('../controller/playlistController');
const router = Router();

router.post(API_URI_GENERATE_TOPICS, generateTopicsRoute);

module.exports = router;
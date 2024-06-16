const { Router } = require('express');
const { API_URI_CREATE_COMMUNITY } = require('../constant/endpoints');
const { userAuthMiddleware } = require('../middleware/authentication/jwtAuthMiddleware');
const { createCommunityRoute } = require('../controller/communityController');
const router = Router();

router.post(API_URI_CREATE_COMMUNITY, userAuthMiddleware, createCommunityRoute);

module.exports = router;
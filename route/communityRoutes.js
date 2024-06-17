const { Router } = require('express');
const { API_URI_CREATE_COMMUNITY, API_URI_JOIN_COMMUNITY } = require('../constant/endpoints');
const { userAuthMiddleware } = require('../middleware/authentication/jwtAuthMiddleware');
const { createCommunityRoute, joinCommunityRoute } = require('../controller/communityController');
const router = Router();

router.post(API_URI_CREATE_COMMUNITY, userAuthMiddleware, createCommunityRoute);
router.patch(API_URI_JOIN_COMMUNITY, userAuthMiddleware, joinCommunityRoute);

module.exports = router;
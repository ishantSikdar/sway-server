const { Router } = require('express');
const { API_URI_CREATE_COMMUNITY, API_URI_JOIN_COMMUNITY, API_URI_GET_INVITATION_CODE, API_URI_GET_JOINED_COMMUNITIES } = require('../constant/endpoints');
const { userAuthMiddleware } = require('../middleware/authentication/jwtAuthMiddleware');
const { createCommunityRoute, joinCommunityRoute, generateInvitationCodeRoute, getJoinedCommunities } = require('../controller/communityController');
const { multerUpload } = require('../config/multerConfig');

const router = Router();

router.post(API_URI_CREATE_COMMUNITY, userAuthMiddleware, multerUpload.single('image'), createCommunityRoute);
router.patch(API_URI_JOIN_COMMUNITY, userAuthMiddleware, joinCommunityRoute);
router.get(API_URI_GET_INVITATION_CODE, userAuthMiddleware, generateInvitationCodeRoute);
router.get(API_URI_GET_JOINED_COMMUNITIES, userAuthMiddleware, getJoinedCommunities)

module.exports = router;
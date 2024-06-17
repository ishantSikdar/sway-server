const { Router } = require('express');
const { API_URI_CREATE_COMMUNITY, API_URI_JOIN_COMMUNITY, API_URI_GET_INVITATION_CODE } = require('../constant/endpoints');
const { userAuthMiddleware } = require('../middleware/authentication/jwtAuthMiddleware');
const { createCommunityRoute, joinCommunityRoute, generateInvitationCodeRoute } = require('../controller/communityController');
const { multerUpload } = require('../config/multerConfig');

const router = Router();

router.post(API_URI_CREATE_COMMUNITY, userAuthMiddleware, multerUpload.single('profile'), createCommunityRoute);
router.patch(API_URI_JOIN_COMMUNITY, userAuthMiddleware, joinCommunityRoute);
router.get(API_URI_GET_INVITATION_CODE, userAuthMiddleware, generateInvitationCodeRoute);

module.exports = router;
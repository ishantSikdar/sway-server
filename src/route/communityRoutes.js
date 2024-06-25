const { Router } = require('express');
const { userAuthMiddleware } = require('../middleware/authentication/jwtAuthMiddleware');
const { multerUpload } = require('../config/multerConfig');
const { API_URI_CREATE_COMMUNITY,
    API_URI_JOIN_COMMUNITY,
    API_URI_GET_INVITATION_CODE,
    API_URI_GET_JOINED_COMMUNITIES,
    API_URI_GET_COMMUNITY_DETAILS
} = require('../constant/endpoints');
const { createCommunityRoute,
    joinCommunityRoute,
    generateInvitationCodeRoute,
    getCommunityDetailsRoute,
    getJoinedCommunitiesRoute
} = require('../controller/communityController');

const router = Router();

router.post(API_URI_CREATE_COMMUNITY, userAuthMiddleware, multerUpload.single('image'), createCommunityRoute);
router.patch(API_URI_JOIN_COMMUNITY, userAuthMiddleware, joinCommunityRoute);
router.get(API_URI_GET_INVITATION_CODE, userAuthMiddleware, generateInvitationCodeRoute);
router.get(API_URI_GET_JOINED_COMMUNITIES, userAuthMiddleware, getJoinedCommunitiesRoute)
router.get(API_URI_GET_COMMUNITY_DETAILS, userAuthMiddleware, getCommunityDetailsRoute)

module.exports = router;
const { Router } = require('express');
const { userAuthMiddleware } = require('../middleware/authentication/jwtAuthMiddleware');
const { multerUpload } = require('../config/multerConfig');
const { API_URI_CREATE_COMMUNITY,
    API_URI_JOIN_COMMUNITY,
    API_URI_GET_INVITATION_CODE,
    API_URI_GET_JOINED_COMMUNITIES,
    API_URI_GET_COMMUNITY_DETAILS,
    API_URI_GET_COMMUNITY_CHATS,
    API_URI_GET_COMMUNITY_MEMBERS,
    API_URI_GET_PUBLIC_COMMUNITIES
} = require('../constant/endpoints');
const { createCommunityRoute,
    joinCommunityRoute,
    generateInvitationCodeRoute,
    getCommunityDetailsRoute,
    getJoinedCommunitiesRoute,
    getCommunityChatsByIdRoute,
    getCommunityMembersRoute,
    getPublicCommunitiesRoute
} = require('../controller/communityController');

const router = Router();

router.post(API_URI_CREATE_COMMUNITY, userAuthMiddleware, multerUpload.single('image'), createCommunityRoute);
router.patch(API_URI_JOIN_COMMUNITY, userAuthMiddleware, joinCommunityRoute);
router.get(API_URI_GET_INVITATION_CODE, userAuthMiddleware, generateInvitationCodeRoute);
router.get(API_URI_GET_JOINED_COMMUNITIES, userAuthMiddleware, getJoinedCommunitiesRoute);
router.get(API_URI_GET_COMMUNITY_DETAILS, userAuthMiddleware, getCommunityDetailsRoute);
router.get(API_URI_GET_COMMUNITY_CHATS, userAuthMiddleware, getCommunityChatsByIdRoute)
router.get(API_URI_GET_COMMUNITY_MEMBERS, userAuthMiddleware, getCommunityMembersRoute);
router.get(API_URI_GET_PUBLIC_COMMUNITIES, userAuthMiddleware, getPublicCommunitiesRoute);

module.exports = router;
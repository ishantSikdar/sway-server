const { createCommunity, joinCommunity, generateInviteCode, fetchAllJoinedCommunities, fetchCommunityDetails, fetchCommunityMembers, fetchPublicCommunities, joinCommunityByExplore, editCommunityByCommunityId } = require("../service/communityServices");
const { ApiResponse } = require("../classes/ApiResponse");
const { logger } = require("../config/logger");
const { API_REQ_LOG } = require("../constant/logConstants");
const { fetchCommunityChatsPagebyId } = require("../service/chatServices");

exports.createCommunityRoute = async (req, res) => {
    try {
        await createCommunity(req);
        const apiResponse = new ApiResponse(`Community Created`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Failed to create community: ${error.message}`;
        const apiResponse = new ApiResponse(`Failed to create community`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}

exports.editCommunityByIdRoute = async (req, res) => {
    try {
        await editCommunityByCommunityId(req);
        const apiResponse = new ApiResponse(`Community Edited`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Failed to edit community, ${error.message}`;

        if (req.status === 404) {
            const apiResponse = new ApiResponse(`Community Not Found`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }

        if (req.status === 401) {
            const apiResponse = new ApiResponse(`User is not an admin`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }

        const apiResponse = new ApiResponse(`Failed to edit community`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}

exports.joinCommunityRoute = async (req, res) => {
    try {
        await joinCommunity(req);
        const apiResponse = new ApiResponse(`Community Joined`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Failed to join community: ${error.message}`;

        if (req.status === 404) {
            const apiResponse = new ApiResponse(`Invalid invitation code`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }

        if (req.status === 409) {
            const apiResponse = new ApiResponse(`User already exists`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }

        const apiResponse = new ApiResponse(`Failed to join community`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}

exports.generateInvitationCodeRoute = async (req, res) => {
    try {
        const code = await generateInviteCode(req);
        const apiResponse = new ApiResponse(`Code Generated`, { invitation: code });
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);

    } catch (error) {
        const cause = `Failed to generated code: ${error.message}`;

        if (req.status === 404) {
            const apiResponse = new ApiResponse(`No Community found by Id: ${req.query.communityId}`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }

        const apiResponse = new ApiResponse(`Failed to generate code`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}

exports.getJoinedCommunitiesRoute = async (req, res) => {
    try {
        const communities = await fetchAllJoinedCommunities(req);
        const apiResponse = new ApiResponse(`Joined Communities Fetched`, { joinedCommunities: communities });
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);
        
    } catch (error) {
        const cause = `Failed to fetch joined communities, ${error.message}`;
        const apiResponse = new ApiResponse(`Failed to fetch joined communities`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}

exports.getCommunityDetailsRoute = async (req, res) => {
    try {
        const community = await fetchCommunityDetails(req);
        const apiResponse = new ApiResponse(`Community Details Fetched`, { community });
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);
        
    } catch (error) {
        const cause = `Failed to fetch Community Details, ${error.message}`;

        if (req.status === 404) {
            const apiResponse = new ApiResponse(`No Community found by Id: ${req.query.communityId}`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }
        
        const apiResponse = new ApiResponse(`Failed to fetch Community Details`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}

exports.getCommunityChatsByIdRoute = async (req, res) => {
    try {
        const chatMessages = await fetchCommunityChatsPagebyId(req);
        const apiResponse = new ApiResponse(`Communities Chats Fetched`, { chatMessages });
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);
        
    } catch (error) {
        const cause = `Failed to fetch community chats, ${error.message}`;
        const apiResponse = new ApiResponse(`Failed to fetch community chats`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}

exports.getCommunityMembersRoute = async (req, res) => {
    try {
        const members = await fetchCommunityMembers(req);
        const apiResponse = new ApiResponse(`Community Details Fetched`, { members });
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);
        
    } catch (error) {
        const cause = `Failed to fetch Community Details, ${error.message}`;      
        const apiResponse = new ApiResponse(`Failed to fetch Community Details`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }
}

exports.getPublicCommunitiesRoute = async (req, res) => {
    try {
        const communities = await fetchPublicCommunities(req);
        const apiResponse = new ApiResponse(`Public Communities Fetched`, { communities });
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);
        
    } catch (error) {
        const cause = `Failed to fetch Public Communities, ${error.message}`;      
        const apiResponse = new ApiResponse(`Failed to fetch Public Communities`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }  
}

exports.joinCommunityByExploreRoute = async (req, res) => {
    try {
        await joinCommunityByExplore(req);
        const apiResponse = new ApiResponse(`Community Joined`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `SUCCESS`, apiResponse.message, req.url));
        return res.status(200).json(apiResponse);
        
    } catch (error) {
        const cause = `Failed to join community, ${error.message}`;      

        if (req.status === 404) {
            const apiResponse = new ApiResponse(`No Community found by Id: ${req.query.communityId}`);
            logger.error(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
            return res.status(req.status).json(apiResponse);
        }
        
        const apiResponse = new ApiResponse(`Failed to join community`);
        logger.info(API_REQ_LOG(apiResponse.requestId, `FAILED`, cause, req.url));
        return res.status(500).json(apiResponse);
    }  
}

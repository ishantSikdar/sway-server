const Community = require("../db/model/Community");
const User = require("../db/model/User");
const { ObjectId } = require('mongodb');
const { logger } = require("../config/logger");
const { generateRandomCode } = require("../util/randomUtil");
const { uploadFileToS3 } = require("../util/s3Util");
const { ENTITY_COMMUNITIES } = require("../constant/appConstants");
const { USER } = require("../constant/dbContants");
const mongoose = require("mongoose");

exports.createCommunity = async (req) => {
    const newCommunityRequest = JSON.parse(JSON.parse(req.body.json));
    const communityId = new ObjectId();
    const imageUrl = await uploadFileToS3(`${ENTITY_COMMUNITIES}/${communityId.toHexString()}`, req.file, 'groupIcon.png');

    const newCommunity = new Community({
        _id: communityId,
        communityName: newCommunityRequest.name,
        visibility: newCommunityRequest.visibility,
        iconUrl: imageUrl,
        members: [req.userId],
    });

    const communitySaved = await newCommunity.save();
    logger.info(`Community ${communitySaved._id} created by ${req.userId}`);
}

exports.joinCommunity = async (req) => {
    const user = await User.findById(req.userId);
    const invitationCode = req.query.code;

    const community = await Community.findOne({
        code: invitationCode
    });

    if (!community) {
        req.status = 404;
        throw new Error('Invalid Invitation Code');
    }

    if (community.members.includes(user._id)) {
        req.status = 409;
        throw new Error('User already exists');
    }

    community.members.push(user._id);
    const communitySaved = await community.save();
    logger.info(`Community ${communitySaved._id} joined by ${user._id}`);
}

exports.generateInviteCode = async (req) => {
    try {
        const community = await Community.findById(req.query.communityId);

        if (!community) {
            req.status = 404;
            throw new Error('Community not found');
        }

        if (community.code) {
            return community.code;
        }

        let randomCode;
        let communityByCode;

        do {
            randomCode = generateRandomCode(req.userId);
            communityByCode = await Community.findOne({
                code: randomCode,
            });

        } while (communityByCode);

        community.code = randomCode;
        const communitySaved = await community.save();
        logger.info(`Community ${communitySaved._id} joined by ${req.userId}`);
        return randomCode;

    } catch (error) {
        if (error.name === 'CastError') {
            req.status = 404;
            throw new Error('Community not found');
        }

        throw error;
    }
}

exports.fetchAllJoinedCommunities = async (req) => {
    const userId = req.userId;

    const communities = await Community.find({
        members: userId
    });

    return communities.map((community) => {
        return {
            id: community._id,
            name: community.communityName,
            imageUrl: community.iconUrl && `${process.env.IMAGE_CDN_BASE_URL}${community.iconUrl}`,
        }
    })
}

exports.fetchCommunityDetails = async (req) => {
    try {
        const community = await Community.findById(req.query.communityId);

        if (!community) {
            req.status = 404;
            throw new Error('Community not found');
        }

        return {
            id: community.id,
            name: community.communityName,
            iconUrl: community.iconUrl && `${process.env.IMAGE_CDN_BASE_URL}${community.iconUrl}`,
            visibility: community.visibility,
            members: community.members,
            birthdate: community.createdAt,
        }

    } catch (error) {
        if (error.name === 'CastError') {
            req.status = 404;
            throw new Error('Community not found');
        }

        throw error;
    }
}

exports.fetchCommunityMembers = async (req) => {
    try {
        const communityId = ObjectId.createFromHexString(req.query.communityId);

        const members = await Community.aggregate([
            {
                $match: {
                    _id: communityId
                }
            },
            {
                $unwind: '$members',
            },
            {
                $lookup: {
                    from: USER,
                    localField: 'members',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            },
            {
                $unwind: '$userInfo',
            },
            {
                $project: {
                    _id: 0,
                    userId: '$userInfo._id',
                    name: '$userInfo.name',
                    username: '$userInfo.username',
                    photoUrl: {
                        $concat: [process.env.IMAGE_CDN_BASE_URL, '$userInfo.photo']
                    },
                }
            }
        ]);

        return members;

    } catch (error) {
        if (error.name === 'CastError') {
            req.status = 404;
            throw new Error('Community not found');
        }

        throw error;
    }
}

exports.fetchPublicCommunities = async (req) => {
    try {
        const searchTag = req.query.communityName;
        const joinedCommunities = await this.fetchAllJoinedCommunities({ userId: req.userId });
        const joinedCommunityIds = joinedCommunities.map((community) => community.id);

        const publicCommunities = await Community.find({
            communityName: new RegExp(searchTag, 'i'),
            visibility: 'public',
            _id: { $nin: joinedCommunityIds }
        });

        return publicCommunities.map((community) => {
            return {
                id: community._id,
                name: community.communityName,
                iconUrl: community.iconUrl && `${process.env.IMAGE_CDN_BASE_URL}${community.iconUrl}`
            }
        });

    } catch(error) {
        logger.error('Cant fetch public communities', error);
        throw error;
    }
}

exports.joinCommunityByExplore = async (req) => {
    try {
        const communityId = ObjectId.createFromHexString(req.query.communityId);
        const communityToJoin = await Community.findById(communityId);

        if (!communityToJoin) {
            req.status = 404;
            throw new Error('Community Not Found'); 
        }

        communityToJoin.members.push(req.userId);
        await communityToJoin.save();
        logger.info(`User ${req.userId} has joined ${communityId} by exploring`);

    } catch(error) {
        logger.error('Cant Join Community', error);
        throw error;
    }
}
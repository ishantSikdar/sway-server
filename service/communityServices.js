const Community = require("../db/model/Community");
const User = require("../db/model/User");
const { logger } = require("../config/logger");
const { generateRandomCode } = require("../util/randomUtil");

exports.createCommunity = async (req) => {
    const newCommunityRequest = JSON.parse(JSON.parse(req.body.json));

    const newCommunity = new Community({
        communityName: newCommunityRequest.name,
        visibility: newCommunityRequest.visibility,
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
const Community = require("../db/model/Community");
const User = require("../db/model/User");
const { logger } = require("../config/logger");

exports.createCommunity = async (req) => {
    const user = await User.findById(req.userId);

    const newCommunity = new Community({
        communityName: req.body.name,
        visibility: req.body.visibility,
        ownerId: user._id,
        members: [user._id],
    });

    const communitySaved = await newCommunity.save();
    logger.info(`Community ${communitySaved._id} created`);
}
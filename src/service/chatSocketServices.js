const { WebSocket } = require('ws');
const { ObjectId } = require('mongodb');
const url = require('url');
const { jwtWSAuthMiddleware } = require("../middleware/authentication/jwtWSAuthMiddleware");
const { objectIdSchema } = require('../validation/fields');
const Community = require('../db/model/Community');
const User = require('../db/model/User');
const { logger } = require('../config/logger');
const Message = require('../db/model/Message');
const { convertToISTddMMyyyyHHMM } = require('../util/dateUtil');

exports.establistChatConnection = async (socket, req) => {
    const authResponse = jwtWSAuthMiddleware(socket, req);

    if (!authResponse.status) {
        logger.error("Token auth failed");
        return { status: false, message: authResponse.message, community: null, user: null };
    }

    const location = url.parse(req.url, true);
    const communityId = location.pathname.split('/')[1];
    const result = objectIdSchema.safeParse(communityId);

    if (!result.success) {
        logger.info('Invalid Community Id');
        return { status: false, message: "Invalid Community Id", community: null, user: null };
    }

    const community = await Community.findById(communityId);
    const user = await User.findById(socket.userId);

    if (!community || !user) {
        logger.info('Community or User Not Found');
        return { status: false, message: "Community or User Not Found", community: null, user: null };
    }

    if (community.visibility === 'private') {
        socket.isPrivate = true;
        const userPresent = community.members.find((memberId) => memberId.toString() === socket.userId);

        if (!userPresent) {
            logger.info('User is not a part of private community');
            return { status: false, message: "User not part of private community", community: null, user: null }
        }
    }

    socket.communityId = communityId;

    logger.info(`User ${socket.userId} authenticated and socket established`);
    return { status: true, message: "Connection Established", community, user };
}

exports.sendMessageToClients = async (messageData, user, community, clients, senderSocket) => {
    try {
        const messageTime = new Date();
        const messageToBeSaved = new Message({
            userId: senderSocket.userId,
            content: { data: messageData.content },
            communityId: senderSocket.communityId,
            createdAt: messageTime
        });

        clients.forEach(async (metadata, clientSocket) => {
            if (metadata.communityId === senderSocket.communityId &&
                (senderSocket.isPrivate ? community.members.includes(ObjectId.createFromHexString(senderSocket.userId)) : true)
                && clientSocket.readyState === WebSocket.OPEN
            ) {
                await messageToBeSaved.save();
                clientSocket.send(
                    JSON.stringify({
                        msgGroupId: new ObjectId(),
                        message: [{
                            id: new ObjectId(),
                            content: messageData.content
                        }],
                        sender: {
                            name: user.username,
                            photoUrl: user.photo && `${process.env.IMAGE_CDN_BASE_URL}${user.photo}`,
                        },
                        time: convertToISTddMMyyyyHHMM(messageTime),
                    })
                );
                logger.info("Message sent by " + clientSocket.userId);

            } else {
                logger.info(senderSocket.userId, metadata.communityId === senderSocket.communityId, community.members.includes(user.id), clientSocket.readyState === WebSocket.OPEN);

            }
        });

    } catch (error) {
        logger.error("Error sending a message: ", error);
    }
}
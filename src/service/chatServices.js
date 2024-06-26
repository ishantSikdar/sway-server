const { logger } = require("../config/logger");
const { PAGE_SIZE_CHAT_WINDOW } = require("../constant/appConstants");
const { USER } = require("../constant/dbContants");
const Message = require("../db/model/Message");
const { ObjectId } = require('mongodb');
const { paginateData } = require("../util/pageUtil");


exports.fetchCommunityChatsPagebyId = async (req) => {
    try {
        const communityObjectId = ObjectId.createFromHexString(req.query.communityId);
        const aggregatedMessages = await aggregateCommunityMessagesByCommunityId(communityObjectId);
        const sequenctialMessages = parseMessagesSequentially(aggregatedMessages);
        return paginateData(sequenctialMessages, req.query.page, PAGE_SIZE_CHAT_WINDOW);

    } catch (error) {
        console.error(`Error occured in processing chat messages, ${error}`);
        throw error;
    }
}


const aggregateCommunityMessagesByCommunityId = async (communityObjectId) => {
    try {
        const chatMessages = await Message.aggregate([
            {
                $match: { communityId: communityObjectId }
            },
            {
                $lookup: {
                    from: USER,
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            },
            {
                $unwind: '$userInfo'
            },
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    message: {
                        id: '$_id',
                        content: '$content.data'
                    },
                    sender: {
                        name: '$userInfo.name',
                        photoUrl: '$userInfo.photo'
                    },
                    time: {
                        $dateToString: {
                            format: '%d/%m/%Y %H:%M',
                            date: '$time',
                            timezone: 'Asia/Kolkata',
                        }
                    },
                    timestamp: '$time',
                }
            },
            {
                $sort: { time: 1 }
            },
 
        ]);

        logger.info(`Aggregated ${chatMessages.length} documents`);
        return chatMessages;


    } catch (error) {
        console.error('Error in aggregation', error);
        throw error;
    }
}

const parseMessagesSequentially = (chatMessages) => {
    const groupedMessages = [];

    chatMessages.forEach((currentMessage) => {
        
        if (groupedMessages.length > 0 && 
            groupedMessages[0].userId.toString() == currentMessage.userId.toString() &&
            groupedMessages[0].time == currentMessage.time
        ) {

            groupedMessages[0].message.push({
                id: currentMessage.message.id,
                content: currentMessage.message.content,
            });

        } else {

            groupedMessages.unshift({
                userId: currentMessage.userId,
                message: [
                    {
                        id: currentMessage.message.id,
                        content: currentMessage.message.content,
                    }
                ],
                sender: {
                    name: currentMessage.sender.name,
                    photoUrl: currentMessage.sender.photoUrl,
                },
                time: currentMessage.time,
                timestamp: currentMessage.timestamp,
            });
        }
    });
      
    return groupedMessages;
}
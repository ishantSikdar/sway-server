const { logger } = require('./config/logger');
require('dotenv').config();
const { initializeApp } = require('./config/appConfig');
const { WebSocket } = require('ws');
const Community = require('./db/model/Community');
const Message = require('./db/model/Message');
const { ObjectId } = require('mongodb');
const PORT = process.env.PORT || 3000;

const app = initializeApp();

const expressServer = app.listen(PORT, () => {
    logger.info(`App listening to PORT ${PORT}`);
});

const wss = new WebSocket.Server({ server: expressServer });
const clients = new Map();

wss.on('connection', (socket) => {

    console.log("Client connected");

    socket.on('error', () => {
        console.log("error occured");
    })

    socket.on('message', async (data, isBinary) => {

        // {
        //     "userId": "66642fc2fdd4078a7e92065f",
        //     "communityId": "6670888ec647c2474610ac9d",
        //     "content": "newwwwwwwwwwwwwwww"
        // }

        const messageData = JSON.parse(data);
        const userId = messageData.userId;

        clients.set(socket, { userId });
        console.log(clients.values());

        const community = await Community.findById(messageData.communityId);
        console.log(community);
 
        if (community && community.members.includes(userId)) {
            const messageSaved = new Message({
                userId: userId,
                content: { data: messageData.content },
            });
            console.log(messageSaved);
        //     // await messageSaved.save();

            community.members.forEach((memberId) => {
                const memberSocket = Array.from(clients.keys()).find((clientSockets) => clients.get(clientSockets).userId === memberId.toString());

                if (memberSocket && memberSocket.readyState === WebSocket.OPEN) {
                    memberSocket.send(JSON.stringify({ senderId: userId, message: messageData.content, communityId: messageData.communityId }), { binary: isBinary });
                }
            });
        }
    });

    socket.on('close', () => {
        // Remove socket from clients map on close
        clients.delete(socket);
        console.log('Client disconnected');
    });
})

module.exports = expressServer;

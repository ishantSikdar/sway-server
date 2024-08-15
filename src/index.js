const { logger } = require('./config/logger');
require('dotenv').config();
const { initializeApp } = require('./config/appConfig');
const { WebSocket } = require('ws');
const { establistChatConnection, sendMessageToClients } = require('./service/chatSocketServices');
const PORT = process.env.SERVER_PORT || 3001;

// Express Server
const app = initializeApp();

const expressServer = app.listen(PORT, () => {
    logger.info(`App listening to PORT ${PORT}`);
});

// Websocket server
const wss = new WebSocket.Server({ server: expressServer });
const clients = new Map();

wss.on('connection', async (socket, req) => {

    const connectionStatus = await establistChatConnection(socket, req);
    const user = connectionStatus.user;
    const community = connectionStatus.community;

    if (!connectionStatus.status) {
        logger.error("Connection Failed, reason " + connectionStatus.message);
        socket.close(1008, connectionStatus.message);
        return;
    }

    clients.set(socket, { userId: socket.userId, communityId: socket.communityId });
    logger.info(`Total Clients: ${clients.size}`);

    socket.on('message', async (data) => {
        const messageData = JSON.parse(data);
        sendMessageToClients(messageData, user, community, clients, socket);
    });

    socket.on('close', () => {
        clients.delete(socket);
        logger.info(`Client ${socket.userId} disconnected`);
        logger.info(`Total Clients: ${clients.size}`);
    });

    socket.on('error', (err) => {
        logger.info("error occured" + err);
    })
})

module.exports = expressServer;

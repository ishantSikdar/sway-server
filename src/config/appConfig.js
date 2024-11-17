const cors = require('cors');
const os = require('os');
const express = require('express');
const userRoute = require("../route/userRoutes");
const playlistRoute = require("../route/playlistRoutes");
const communityRoute = require("../route/communityRoutes");
const { ROOT_URI_USER, ROOT_URI_PLAYLIST, ROOT_URI_COMMUNITY } = require('../constant/endpoints');
const { logger } = require('./logger');
const packageJson = require('../../package.json');
const { allowedUrls } = require('./corsConfig');
const mongoose = require('../db/')

function getConnectionStatus() {
    switch (mongoose.connection.readyState) {
        case 0:
            return "Disconnected";
        case 1:
            return "Connected";
        case 2:
            return "Connecting";
        case 3:
            return "Disconnecting";
        default:
            return "Unknown";
    }
}

exports.initializeApp = () => {
    const app = express();

    app.use(cors({
        origin: allowedUrls
    }));
    app.use(express.json());

    app.use(ROOT_URI_USER, userRoute);
    app.use(ROOT_URI_PLAYLIST, playlistRoute);
    app.use(ROOT_URI_COMMUNITY, communityRoute);

    app.get('/', async (req, res) => {
        try {
            const memoryUsage = process.memoryUsage();
            const rssMemory = `${(memoryUsage.rss / (1024 * 1024)).toFixed(2)} MB`;
            const heapTotalMemory = `${(memoryUsage.heapTotal / (1024 * 1024)).toFixed(2)} MB`;
            const heapUsedMemory = `${(memoryUsage.heapUsed / (1024 * 1024)).toFixed(2)} MB`;
            const externalMemory = `${(memoryUsage.external / (1024 * 1024)).toFixed(2)} MB`;

            const serverStatus = {
                status: 'running',
                dbStatus: getConnectionStatus(),
                uptime: `${process.uptime()} seconds`,
                memoryUsage: {
                    rss: `${rssMemory}`,
                    heapTotal: `${heapTotalMemory}`,
                    heapUsed: `${heapUsedMemory}`,
                    external: `${externalMemory}`
                },
                osInfo: {
                    platform: os.platform(),
                    release: os.release(),
                    cpuArchitecture: os.arch(),
                    totalMemory: `${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB`,
                    freeMemory: `${(os.freemem() / (1024 * 1024)).toFixed(2)} MB`,
                    uptime: `${os.uptime()} seconds`
                },
                nodeVersion: `${process.version}`,
                expressVersion: `${packageJson.dependencies.express}`,
                webSocketVersion: `${packageJson.dependencies.ws}`,
                cors: allowedUrls,
                serverConfiguration: {
                    port: process.env.SERVER_PORT || 'Default Port'
                },
                additionalDependencies: packageJson.dependencies,
                logs: []
            };

            res.status(200).json(serverStatus);
        } catch (error) {
            logger.error(`Error occurred while fetching server information: ${error}`);
            res.status(500).json({
                message: `Server error: ${error.message}`
            });
        }
    });

    app.use((error, req, res, next) => {
        logger.error(`Error occurred: ${error}`);
        res.status(500).json({
            message: `Server error: ${error.message}`
        });
    });

    return app;
};

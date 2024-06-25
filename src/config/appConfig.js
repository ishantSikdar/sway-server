const express = require('express');
const cors = require('./corsConfig');
const userRoute = require("../route/userRoutes");
const playlistRoute = require("../route/playlistRoutes");
const communityRoute = require("../route/communityRoutes");
const { ROOT_URI_USER, ROOT_URI_PLAYLIST, ROOT_URI_COMMUNITY } = require('../constant/endpoints');
const { logger } = require('./logger');

exports.initializeApp = () => {
    const app = express();

    app.use(cors);
    app.use(express.json());

    app.use(ROOT_URI_USER, userRoute);
    app.use(ROOT_URI_PLAYLIST, playlistRoute);
    app.use(ROOT_URI_COMMUNITY, communityRoute);

    app.use((error, data, req, res) => {
        logger.error(`Error occured: ${error}`);
        res.status(500).json({
            message: `Some error occured: ${error.message}`
        })
    })

    return app;
}
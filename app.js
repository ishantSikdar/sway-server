const express = require('express');
const { logger } = require('./config/logger');
require('dotenv').config();
const userRoute = require("./route/userRoutes");
const playlistRoute = require("./route/playlistRoutes");
const { ROOT_URI_USER, ROOT_URI_PLAYLIST } = require('./constant/endpoints');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use(ROOT_URI_USER, userRoute);
app.use(ROOT_URI_PLAYLIST, playlistRoute);

app.use((error, data, req, res) => {
    logger.error(`Error occured: ${error}`);
    res.status(500).json({
        message: `Some error occured: ${error.message}`
    })
})

app.listen(PORT, () => {
    logger.info(`App listening to PORT ${PORT}`);
})
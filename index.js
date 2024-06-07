const express = require('express');
const cors = require('cors');
const { logger } = require('./config/logger');
require('dotenv').config();
const userRoute = require("./route/userRoutes");
const playlistRoute = require("./route/playlistRoutes");
const { ROOT_URI_USER, ROOT_URI_PLAYLIST } = require('./constant/endpoints');
const { userAuthMiddleware } = require('./middleware/authentication/jwtAuthMiddleware');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(ROOT_URI_USER, userRoute);
app.use(ROOT_URI_PLAYLIST, playlistRoute);

app.get("/helloWorld", (req, res) => {
    logger.info("Health Checkup Called");
    res.send("Hello World");
})

app.get("/helloAuth", userAuthMiddleware, (req, res) => {
    logger.info("User Auth Checkup Called");
    res.send("User Auth Alive");
})

app.use((error, data, req, res) => {
    logger.error(`Error occured: ${error}`);
    res.status(500).json({
        message: `Some error occured: ${error.message}`
    })
})

app.listen(PORT, () => {
    logger.info(`App listening to PORT ${PORT}`);
})
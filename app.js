const express = require('express');
const { logger } = require('./config/logger');
const userRoute = require("./route/userRoutes");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/user', userRoute);

app.use((error, data, req, res) => {
    logger.error(`Error occured: ${error}`);
    res.status(500).json({
        message: `Some error occured: ${error.message}`
    })
})

app.listen(PORT, () => {
    logger.info(`App listening to PORT ${PORT}`);
})
const mongoose = require("mongoose");
const { logger } = require("../config/logger");

const DATABASE = process.env.DATABASE || 'sway';
const USERNAME = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const HOSTNAME = process.env.HOSTNAME;

mongoose
    .connect(`mongodb+srv://${USERNAME}:${PASSWORD}@${HOSTNAME}/${DATABASE}`)
    .then(() => {
        logger.info(`Connected to MongoDB Cluster Database: ${DATABASE}`);
    })
    .catch((error) => {
        logger.error(
            `Connection failed to MongoDB Cluster Database: ${DATABASE}, Cause: ${error.message}`
        );
    });

module.exports = mongoose;

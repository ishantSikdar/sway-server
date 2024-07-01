const mongoose = require("mongoose");
const { logger } = require("../config/logger");

const DATABASE = process.env.DB_DATABASE || 'sway';
const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const HOSTNAME = process.env.DB_HOSTNAME;

mongoose
    .connect(`mongodb+srv://${USERNAME}:${PASSWORD}@${HOSTNAME}/${DATABASE}`)
    .then(() => {
        logger.info(`Connected to MongoDB Cluster Database: ${DATABASE}`);
    })
    .catch((error) => {
        logger.error(
            `Connection failed to MongoDB Cluster Database: ${DATABASE}, Cause: ${error.message}`
        );
        logger.debug(`${USERNAME} : ${PASSWORD}`);
    });

module.exports = mongoose;

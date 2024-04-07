const mongoose = require("mongoose");

const DATABASE = process.env.DATABASE;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const HOSTNAME = process.env.HOSTNAME;

mongoose
    .connect(`mongodb+srv://${USERNAME}:${PASSWORD}@${HOSTNAME}/${DATABASE}`)
    .then(() => {
        console.log(`Connected to MongoDB Cluster Database: ${DATABASE}`);
    })
    .catch((error) => {
        console.error(
            `Connection failed to MongoDB Cluster Database: ${DATABASE}, Cause: ${error.message}`
        );
    });

module.exports = mongoose;
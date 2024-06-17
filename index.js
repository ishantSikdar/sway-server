const { logger } = require('./config/logger');
require('dotenv').config();
const { initializeApp } = require('./config/appConfig');
const PORT = process.env.PORT || 3000;

const app = initializeApp();

app.listen(PORT, () => {
    logger.info(`App listening to PORT ${PORT}`);
});
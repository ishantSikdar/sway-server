/*
Winston Logger Configuration (Commented because App is deployed to Vercel, that supports Serveless Fns, Winston creates directories and files on server, that is not possible for Servless Fns)

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logFormat = winston.format.printf(info => `[${info.timestamp}] [${info.level.toUpperCase()}] - ${info.message}`);

exports.logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: 'logs/sway-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

*/

// Logger configuration
const logger = {
    error: (...args) => console.error(`[${new Date()}]`, ...args),
    warn: (...args) => console.warn(`[${new Date()}]`, ...args),
    info: (...args) => console.info(`[${new Date()}]`, ...args),
    debug: (...args) => console.debug(`[${new Date()}]`, ...args),
};

module.exports = { logger };

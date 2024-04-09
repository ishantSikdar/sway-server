const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

// Define log format
const logFormat = winston.format.printf(info => `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`);

// Create logger
exports.logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        // Console transport
        new winston.transports.Console(),
        // Daily Rotate File transport
        new DailyRotateFile({
            filename: 'logs/sway-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m', // Set the size limit for each log file, here 20 megabytes
            maxFiles: '14d' // Retain 14 days worth of logs
        })
    ]
});
const winston = require('winston');
const path = require('path');
const config = require('../config/config'); 

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3, 
    verbose: 4,
    debug: 5,
    silly: 6,
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'white',
};

winston.addColors(colors);

// Determine the log level based on the environment
const level = () => {
    const env = config.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn'; 
};

// Define the format for logs
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // Add custom format for console logs
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}` +
            (info.stack ? `\n${info.stack}` : '') + // Include stack trace for errors
            (info.metadata ? ` ${JSON.stringify(info.metadata)}` : ''), // Include metadata if available
    ),
    winston.format.colorize({ all: true }),
);

// Define transports (where the logs go)
const transports = [
    new winston.transports.Console({
        level: level(), // Set console log level based on environment
        format: winston.format.combine(
            winston.format.colorize({ all: true }), // Colorize console output
            winston.format.printf(
                (info) => `${info.timestamp} ${info.level}: ${info.message}` +
                    (info.stack ? `\n${info.stack}` : '') +
                    (info.metadata ? ` ${JSON.stringify(info.metadata)}` : ''),
            ),
        ),
    }),
    new winston.transports.File({
        filename: path.join(__dirname, '../logs/error.log'), // Path to error log file
        level: 'error', // Only log 'error' level messages to this file
        format: winston.format.uncolorize(), // Don't colorize file output
        maxsize: 5 * 1024 * 1024, // 5MB
        maxFiles: 5,
        tailable: true // keeps the most recent logs
    }),
    new winston.transports.File({
        filename: path.join(__dirname, '../logs/combined.log'), // Path to combined log file
        level: 'info', // Log 'info' and higher messages to this file
        format: winston.format.uncolorize(), // Don't colorize file output
        maxsize: 5 * 1024 * 1024, // 5MB
        maxFiles: 5,
        tailable: true
    }),
];

// Create the Winston logger instance
const logger = winston.createLogger({
    levels: levels, // Use custom levels
    format: format, // Use custom format (applied to all transports unless overridden)
    transports: transports, // Apply defined transports
    exitOnError: false, // Do not exit on handled exceptions
});

logger.exceptions.handle(
    new winston.transports.File({ filename: path.join(__dirname, '../logs/exceptions.log') })
);

logger.rejections.handle(
    new winston.transports.File({ filename: path.join(__dirname, '../logs/rejections.log') })
);

module.exports = logger;
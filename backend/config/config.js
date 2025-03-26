/**
 * Application configuration module
 * Combines environment variables with default values
 * @module config
 */

require('dotenv').config();

const config = {
    // Server Configuration
    PORT: parseInt(process.env.PORT) || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    // Security Configuration
    JWT_SECRET: process.env.JWT_SECRET,
    CORS_ORIGINS: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'],
    RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW) || 15, // minutes
    RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX) || 100,

    // Database Configuration
    DB: {
        NAME: process.env.DB_NAME,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        HOST: process.env.DB_HOST || 'localhost',
        PORT: parseInt(process.env.DB_PORT) || 3306,
        DIALECT: 'mysql',
        POOL: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },

    // Email Service Configuration
    EMAIL: {
        USER: process.env.EMAIL_USER,
        PASS: process.env.EMAIL_PASS,
        FROM: process.env.EMAIL_FROM
    }
};

// Validate required configuration in production
if (config.NODE_ENV === 'production') {
    const required = ['JWT_SECRET', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
    required.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
    });
}

module.exports = config;
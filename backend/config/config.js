require('dotenv').config();

/**
 * Safely parse a numeric environment variable.
 * Returns the parsed number if valid, otherwise falls back to the default value.
 *
 * @param {string} value - The environment variable value.
 * @param {number} defaultValue - The fallback value if parsing fails.
 * @returns {number}
 */
function parseNumber(value, defaultValue) {
    const parsed = Number(value);
    return isNaN(parsed) ? defaultValue : parsed;
}

const config = {
    // Server Configuration
    PORT: parseNumber(process.env.PORT, 5000),
    NODE_ENV: process.env.NODE_ENV || 'development',

    // Security Configuration
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
    JWT_COOKIE_EXPIRES_IN: parseNumber(process.env.JWT_COOKIE_EXPIRES_IN, 24), // hours
    CORS_ORIGINS: process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
        : ['http://localhost:5173'],
    RATE_LIMIT_WINDOW: parseNumber(process.env.RATE_LIMIT_WINDOW, 15), // minutes
    RATE_LIMIT_MAX: parseNumber(process.env.RATE_LIMIT_MAX, 100),
    COOKIE_SECRET: process.env.COOKIE_SECRET || 'secure-cookie-secret',
    COOKIE_OPTIONS: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },

    // Database Configuration
    DB: {
        NAME: process.env.DB_NAME,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        HOST: process.env.DB_HOST || 'localhost',
        PORT: parseNumber(process.env.DB_PORT, 3306),
        DIALECT: 'mysql',
        POOL: {
            max: process.env.NODE_ENV === 'test' ? 1 : 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        LOGGING: process.env.DB_LOGGING === 'true' || process.env.NODE_ENV === 'development',
        dialectOptions: process.env.NODE_ENV === 'production' ? {
            ssl: {
                require: true,
                rejectUnauthorized: true
            }
        } : {}
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
    const required = ['JWT_SECRET', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'EMAIL_USER', 'EMAIL_PASS'];
    required.forEach((key) => {
        const value = process.env[key];
        if (!value || value.trim() === '') {
            throw new Error(`Missing required environment variable: ${key}`);
        }
    });
}

module.exports = config;

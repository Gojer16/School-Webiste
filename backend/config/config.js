require('dotenv').config();

const {
    PORT,
    NODE_ENV,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    JWT_COOKIE_EXPIRES_IN,
    CORS_ORIGINS,
    RATE_LIMIT_WINDOW,
    RATE_LIMIT_MAX,
    COOKIE_SECRET,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_LOGGING,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_FROM
} = process.env;

/**
 * Safely parse a numeric environment variable.
 * Returns the parsed number if valid, otherwise falls back to the default value.
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
    PORT: parseNumber(PORT, 5000), 
    NODE_ENV: NODE_ENV || 'development', 

    // Security Configuration
    JWT_SECRET: JWT_SECRET,
    JWT_EXPIRES_IN: JWT_EXPIRES_IN || '1h',
    JWT_COOKIE_EXPIRES_IN: parseNumber(JWT_COOKIE_EXPIRES_IN, 24), // hours
    CORS_ORIGINS: CORS_ORIGINS
        ? CORS_ORIGINS.split(',').map(origin => origin.trim())
        : ['http://localhost:5173'],
    RATE_LIMIT_WINDOW: parseNumber(RATE_LIMIT_WINDOW, 15), // minutes
    RATE_LIMIT_MAX: parseNumber(RATE_LIMIT_MAX, 100),
    // This part is the most significant change for COOKIE_SECRET
    COOKIE_SECRET: COOKIE_SECRET,
    COOKIE_OPTIONS: {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },

    // Database Configuration
    DB: {
        NAME: DB_NAME,
        USER: DB_USER,
        PASSWORD: DB_PASSWORD,
        HOST: DB_HOST || 'localhost',
        PORT: parseNumber(DB_PORT, 3306),
        DIALECT: 'mysql',
        POOL: {
            max: NODE_ENV === 'test' ? 1 : 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        LOGGING: DB_LOGGING === 'true' || NODE_ENV === 'development',
        dialectOptions: NODE_ENV === 'production' ? {
            ssl: {
                require: true,
                rejectUnauthorized: true
            }
        } : {}
    },

    // Email Service Configuration
    EMAIL: {
        USER: EMAIL_USER,
        PASS: EMAIL_PASS,
        FROM: EMAIL_FROM
    }
};

// Validate required configuration in production
if (config.NODE_ENV === 'production') {
    const required = ['JWT_SECRET', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'EMAIL_USER', 'EMAIL_PASS', 'COOKIE_SECRET']; 
    required.forEach((key) => {
        const value = process.env[key];
        if (!value || value.trim() === '') {
            throw new Error(`Missing required environment variable: ${key}`);
        }
    });
}

module.exports = config;
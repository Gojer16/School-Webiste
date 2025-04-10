const { Sequelize } = require('sequelize');
const config = require('./config');
const { retry } = require('./utils');

// Validate required database configuration
if (!config.DB.NAME || !config.DB.USER || !config.DB.PASSWORD) {
    throw new Error('Missing required database configuration. Please check your environment variables.');
}

const sequelize = new Sequelize(
    config.DB.NAME,
    config.DB.USER,
    config.DB.PASSWORD,
    {
        host: config.DB.HOST,
        port: config.DB.PORT,
        dialect: config.DB.DIALECT,
        logging: process.env.DB_LOGGING === 'true' || (config.NODE_ENV === 'development' && console.log),
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
            evict: 1000,
            handleDisconnects: true
        },
        define: {
            timestamps: true,
            paranoid: true,
            underscored: true
        },
        dialectOptions: {
            ...config.NODE_ENV === 'production' && {
                ssl: {
                    require: true,
                    rejectUnauthorized: true,
                    ca: process.env.DB_CA_CERT
                }
            },
            connectTimeout: 10000,
            statement_timeout: 10000,
            idle_in_transaction_session_timeout: 10000
        },
        retry: {
            max: 3,
            match: [
                /SequelizeConnectionError/,
                /SequelizeConnectionRefusedError/,
                /SequelizeHostNotFoundError/,
                /SequelizeHostNotReachableError/,
                /SequelizeInvalidConnectionError/,
                /SequelizeConnectionTimedOutError/
            ]
        }
    }
);

/**
 * Establish database connection with retry logic
 * @async
 * @returns {Promise<void>}
 */
const connectDB = retry(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established');

        if (config.NODE_ENV === 'development') {
            await sequelize.sync({ alter: true });
            console.log('Database schema synchronized');
        }
    } catch (error) {
        if (config.NODE_ENV === 'development') {
            console.error('Database connection failed:', error);
        } else {
            // Avoid detailed error messages in production to prevent sensitive data leakage.
            console.error('Database connection failed. Please check your configuration and ensure:');
            console.error('1. Database server is running');
            console.error('2. Correct credentials are provided');
            console.error('3. Network connectivity is available');
        }
        throw error;
    }
}, {
    retries: 3,
    delay: 5000
});

module.exports = {
    sequelize,
    connectDB
};

const { Sequelize } = require('sequelize');
const config = require('./config');
const { retry } = require('./utils');

/**
 * Database connection configuration
 * @typedef {Object} DatabaseConfig
 * @property {Sequelize} instance - Sequelize ORM instance
 * @property {Function} connect - Connection handler with retry logic
 */

const sequelize = new Sequelize(
    config.DB.NAME,
    config.DB.USER,
    config.DB.PASSWORD,
    {
        host: config.DB.HOST,
        port: config.DB.PORT,
        dialect: config.DB.DIALECT,
        logging: config.NODE_ENV === 'development' ? console.log : false,
        pool: config.DB.POOL,
        define: {
            timestamps: true,
            paranoid: true,
            underscored: true
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
        console.error('Database connection failed:', error.message);
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
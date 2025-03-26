/**
 * Retry utility for async operations
 * @param {Function} fn - Async function to retry
 * @param {Object} options - Retry options
 * @param {number} options.retries - Maximum retry attempts
 * @param {number} options.delay - Delay between retries in ms
 */
const retry = (fn, options = { retries: 3, delay: 1000 }) => {
    return async (...args) => {
        let lastError;
        
        for (let i = 0; i < options.retries; i++) {
            try {
                return await fn(...args);
            } catch (error) {
                lastError = error;
                await new Promise(resolve => setTimeout(resolve, options.delay));
            }
        }
        
        throw lastError;
    };
};

module.exports = { retry };
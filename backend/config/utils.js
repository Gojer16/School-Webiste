/**
 * Retry utility for async operations
 * @param {Function} fn - Async function to retry.
 * @param {Object} options - Retry options.
 * @param {number} options.retries - Maximum number of retry attempts (must be a non-negative number).
 * @param {number} options.delay - Delay between retries in milliseconds (must be a non-negative number).
 * @returns {Function} A function that wraps the original function with retry logic.
 */
const retry = (fn, options = { retries: 3, delay: 1000 }) => {
    // Validate options to prevent unintended behavior.
    const { retries, delay } = options;
    if (typeof retries !== 'number' || retries < 0) {
        throw new Error("Invalid value for 'retries'; it must be a non-negative number.");
    }
    if (typeof delay !== 'number' || delay < 0) {
        throw new Error("Invalid value for 'delay'; it must be a non-negative number.");
    }
    
    return async (...args) => {
        let lastError;
        
        // Attempt the function call up to (retries + 1) times.
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                return await fn(...args);
            } catch (error) {
                lastError = error;
                // Log the error in development environments for easier debugging.
                if (process.env.NODE_ENV === 'development') {
                    console.error(`Attempt ${attempt + 1} failed:`, error.message);
                }
                // Only delay if there are remaining attempts.
                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
        
        // In production, consider throwing a generic error to avoid leaking sensitive information.
        throw lastError;
    };
};

module.exports = { retry };

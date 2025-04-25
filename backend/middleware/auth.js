const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');
const { AuthError, ValidationError } = require('../errors');
const rateLimit = require('express-rate-limit');
const sanitizeHtml = require('sanitize-html');
const crypto = require('crypto');

// Rate limiting for authentication attempts
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many authentication attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true
});

// Generate CSRF token
const generateCSRFToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Validate JWT token
const validateToken = (token) => {
    try {
        return jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new AuthError('Token has expired');
        }
        throw new AuthError('Invalid token');
    }
};

const protect = async (req, res, next) => {
    // Validate CSRF token for non-GET requests
    if (req.method !== 'GET') {
        const csrfToken = req.headers['x-csrf-token'];
        if (!csrfToken || csrfToken !== req.session?.csrfToken) {
            throw new AuthError('Invalid CSRF token');
        }
    }
    try {
        // Check for token in Authorization header and cookies
        let token;
        const authHeader = req.headers.authorization;
        const cookieToken = req.cookies?.jwt;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else if (cookieToken) {
            token = cookieToken;
        }

        if (!token) {
            throw new AuthError('Authentication required');
        }

        // Validate and decode token
        const decoded = validateToken(token);

        // Get user from token
        const user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password', 'loginAttempts', 'lockUntil'] },
            where: { isActive: true }
        });

        if (!user) {
            throw new AuthError('User not found or inactive');
        }

        // Check if user changed password after token was issued
        if (user.passwordChangedAfter(decoded.iat)) {
            throw new AuthError('User recently changed password. Please log in again');
        }

        // Check if account is locked
        if (user.isLocked()) {
            throw new AuthError('Account is locked. Please try again later');
        }

        // Add user and token info to request
        req.user = user;
        req.token = token;

        // Set comprehensive security headers
        res.set({
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data: https:;",
            'X-XSS-Protection': '1; mode=block',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
            'Cache-Control': 'no-store, max-age=0'
        });

        // Sanitize user input
        if (req.body) {
            Object.keys(req.body).forEach(key => {
                if (typeof req.body[key] === 'string') {
                    req.body[key] = sanitizeHtml(req.body[key]);
                }
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};

const admin = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AuthError('Authentication required');
        }
        
        if (req.user.role !== 'admin') {
            throw new AuthError('Admin privileges required');
        }

        if (!req.user.isActive) {
            throw new AuthError('Account is inactive');
        }

        next();
    } catch (error) {
        next(error);
    }
};

const teacher = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AuthError('Authentication required');
        }

        if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
            throw new AuthError('Teacher or admin privileges required');
        }

        if (!req.user.isActive) {
            throw new AuthError('Account is inactive');
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { protect, admin, teacher };
const jwt = require('jsonwebtoken');
const { ValidationError, NotFoundError, AuthError } = require('../errors');
const User = require('../models/User');
const config = require('../config/config');

/**
 * Generate JWT with user ID and role
 * @param {string} id - User ID
 * @param {string} role - User role
 * @returns {string} JWT token
 */
const generateToken = (id, role) => {
    return jwt.sign(
        { 
            id,
            role,
            iat: Date.now(),
            jti: crypto.randomBytes(16).toString('hex')
        },
        config.JWT_SECRET,
        {
            expiresIn: config.JWT_EXPIRES_IN,
            algorithm: 'HS256'
        }
    );
};

/**
 * @class UserController
 * Handles user authentication and profile management
 */

/**
 * Register new user account
 * @route POST /api/users/register
 * @access Public
 * @param {Object} req.body - User credentials
 * @returns {Object} User data and auth token
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            throw new ValidationError('All fields are required');
        }

        // Check existing user
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new ValidationError('User already exists');
        }

        // Create user
        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: password.trim()
        });

        // Generate token
        const token = generateToken(user.id, user.role);

        // Set secure HTTP-only cookie with enhanced security options
        res.cookie('jwt', token, {
            ...config.COOKIE_OPTIONS,
            signed: true,
            path: '/',
            domain: req.hostname,
            expires: new Date(Date.now() + config.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000)
        });

        // Generate and set CSRF token
        const csrfToken = crypto.randomBytes(32).toString('hex');
        req.session.csrfToken = csrfToken;

        res.status(201).json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        const statusCode = error instanceof ValidationError ? 400 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message,
            error: config.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Enhanced input validation
        if (!email?.trim() || !password?.trim()) {
            throw new ValidationError('Email and password required');
        }

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError('Invalid email format');
        }

        // Rate limit check
        const ipKey = req.ip;
        const attempts = await redisClient.incr(`login:${ipKey}`);
        if (attempts === 1) {
            await redisClient.expire(`login:${ipKey}`, 60 * 15); // 15 minutes
        }
        if (attempts > 5) {
            throw new AuthError('Too many login attempts. Please try again later.');
        }

        const user = await User.findOne({ 
            where: { email: email.toLowerCase().trim() } 
        });

        if (!user || !(await user.matchPassword(password))) {
            throw new AuthError('Invalid credentials');
        }

        const token = generateToken(user.id, user.role);

        // Set secure HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: config.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        const statusCode = error instanceof AuthError ? 401 : 
                         error instanceof ValidationError ? 400 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message,
            error: config.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (user) {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

// @desc    Change user password
// @route   PUT /api/users/change-password
// @access  Private
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            throw new ValidationError('Both passwords are required');
        }
        
        if (newPassword.length < 8) {
            throw new ValidationError('Password must be at least 8 characters');
        }

        const user = await User.findByPk(req.user.id);
        if (!user) throw new NotFoundError('User not found');

        if (await user.matchPassword(newPassword)) {
            throw new ValidationError('New password must be different from current password');
        }

        // Check current password
        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            res.status(401);
            throw new Error('Current password is incorrect');
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        const statusCode = error instanceof NotFoundError ? 404 : 
                         error instanceof ValidationError ? 400 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message,
            error: process.env.NODE_ENV === 'production' ? undefined : error.message
        });
    }
};



module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    changePassword
};
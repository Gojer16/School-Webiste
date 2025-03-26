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
    return jwt.sign({ id, role }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRATION
    });
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

        // Set secure HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: config.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

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

        if (!email?.trim() || !password?.trim()) {
            throw new ValidationError('Email and password required');
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
        const user = await User.findByPk(req.user.id);

        if (!user) {
            res.status(404);
            throw new Error('User not found');
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
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    changePassword
};
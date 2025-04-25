const Professor = require('../models/Professor');
const { NotFoundError, ValidationError } = require('../errors');
const sanitizeHtml = require('sanitize-html');
const rateLimit = require('express-rate-limit');

const sanitizeProfessorInput = (input) => ({
    name: sanitizeHtml(input.name, { allowedTags: [], allowedAttributes: {} }).substring(0, 100),
    email: sanitizeHtml(input.email, { allowedTags: [], allowedAttributes: {} }).toLowerCase().substring(0, 254),
    specialty: sanitizeHtml(input.specialty, { allowedTags: [], allowedAttributes: {} }).substring(0, 100),
    photoUrl: input.photoUrl ? sanitizeHtml(input.photoUrl, { allowedTags: [], allowedAttributes: {} }) : null
});

const professorRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later'
});

const getAllActiveProfessors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || DEFAULT_PAGE_SIZE;
        const offset = (page - 1) * limit;

        const { count, rows: professors } = await Professor.findAndCountAll({
            where: { active: true },
            order: [['name', 'ASC']],
            limit,
            offset,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalItems: count,
            data: professors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve professors',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const addProfessor = async (req, res) => {
    try {
        const { name, specialty, email } = req.body;
        
        if (!name || !specialty || !email) {
            throw new ValidationError('Name, specialty, and email are required');
        }

        const sanitizedData = sanitizeProfessorInput(req.body);
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedData.email)) {
            throw new ValidationError('Invalid email format');
        }

        const existingProfessor = await Professor.findOne({ where: { email: sanitizedData.email } });
        if (existingProfessor) {
            throw new ValidationError('Professor with this email already exists');
        }

        const professor = await Professor.create({
            name,
            specialty,
            email,
            photoUrl: photoUrl || '/images/default-avatar.png',
            active: true
        });

        res.status(201).json({
            success: true,
            message: 'Professor created successfully',
            data: professor
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message,
            error: process.env.NODE_ENV === 'production' ? undefined : error.message
        });
    }
};

module.exports = {
    getAllActiveProfessors: [professorRateLimiter, getAllActiveProfessors],
    addProfessor: [professorRateLimiter, addProfessor],
    updateProfessorStatus: [professorRateLimiter, updateProfessorStatus]
};
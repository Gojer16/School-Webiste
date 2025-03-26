const Professor = require('../models/Professor');
const { NotFoundError, ValidationError } = require('../errors');

/**
 * @class ProfessorController
 * Handles professor-related operations including retrieval, creation, and status updates
 */

const DEFAULT_PAGE_SIZE = 10;

/**
 * Retrieve all active professors with pagination
 * @route GET /api/professors
 * @access Public
 * @param {number} [req.query.page=1] - Page number
 * @param {number} [req.query.limit=10] - Items per page
 * @returns {Object} Paginated list of professors
 */
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
            error: error.message
        });
    }
};

/**
 * Create a new professor profile
 * @route POST /api/professors
 * @access Private/Admin
 * @param {Object} req.body - Professor data
 * @returns {Object} Created professor data
 */
const addProfessor = async (req, res) => {
    try {
        const { name, specialty, email, photoUrl } = req.body;
        
        if (!name || !specialty || !email) {
            throw new ValidationError('Name, specialty, and email are required');
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
        const statusCode = error instanceof ValidationError ? 400 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || 'Failed to create professor',
            error: error.message
        });
    }
};

/**
 * Update professor's active status
 * @route PATCH /api/professors/:id/status
 * @access Private/Admin
 * @param {string} req.params.id - Professor ID
 * @param {boolean} req.body.active - New status
 * @returns {Object} Updated professor data
 */
const updateProfessorStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { active } = req.body;

        if (typeof active !== 'boolean') {
            throw new ValidationError('Invalid status value');
        }

        const professor = await Professor.findByPk(id);
        if (!professor) {
            throw new NotFoundError('Professor not found');
        }

        const updatedProfessor = await professor.update({ active });
        res.json({
            success: true,
            message: `Professor status updated to ${active ? 'active' : 'inactive'}`,
            data: updatedProfessor
        });
    } catch (error) {
        const statusCode = error instanceof NotFoundError ? 404 : 
                         error instanceof ValidationError ? 400 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || 'Failed to update status',
            error: error.message
        });
    }
};

module.exports = {
    getAllActiveProfessors,
    addProfessor,
    updateProfessorStatus
};
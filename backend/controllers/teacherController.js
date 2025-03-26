const Teacher = require('../models/Teacher');
const { NotFoundError, ValidationError } = require('../errors');

/**
 * @class TeacherController
 * Handles teacher management operations including CRUD and status updates
 */

const DEFAULT_PAGE_SIZE = 10;
const allowedUpdates = ['name', 'email', 'subject', 'phone', 'bio', 'imageUrl'];

/**
 * Retrieve paginated list of active teachers
 * @route GET /api/teachers
 * @access Public
 * @param {number} [req.query.page=1] - Page number
 * @param {number} [req.query.limit=10] - Items per page
 * @returns {Object} Paginated teacher list
 */
const getAllTeachers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || DEFAULT_PAGE_SIZE;
        const offset = (page - 1) * limit;

        const { count, rows: teachers } = await Teacher.findAndCountAll({
            where: { isActive: true },
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
            data: teachers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve teachers',
            error: error.message
        });
    }
};

/**
 * Create new teacher profile
 * @route POST /api/teachers
 * @access Private/Admin
 * @param {Object} req.body - Teacher data
 * @returns {Object} Created teacher details
 */
const addTeacher = async (req, res) => {
    try {
        const { name, email, subject } = req.body;
        
        if (!name || !email || !subject) {
            throw new ValidationError('Name, email and subject are required');
        }

        const teacher = await Teacher.create({
            ...req.body,
            imageUrl: req.body.imageUrl || '/images/default-teacher.png'
        });

        res.status(201).json({
            success: true,
            message: 'Teacher created successfully',
            data: teacher
        });
    } catch (error) {
        const statusCode = error instanceof ValidationError ? 400 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || 'Failed to create teacher',
            error: error.message
        });
    }
};

/**
 * Update teacher information
 * @route PUT /api/teachers/:id
 * @access Private/Admin
 * @param {string} req.params.id - Teacher ID
 * @param {Object} req.body - Update fields
 * @returns {Object} Updated teacher details
 */
const updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id);
        if (!teacher) throw new NotFoundError('Teacher not found');

        const updates = Object.keys(req.body).filter(key => allowedUpdates.includes(key));
        const updatedData = updates.reduce((acc, key) => {
            acc[key] = req.body[key];
            return acc;
        }, {});

        const updatedTeacher = await teacher.update(updatedData);
        res.json({
            success: true,
            message: 'Teacher updated successfully',
            data: updatedTeacher
        });
    } catch (error) {
        const statusCode = error instanceof NotFoundError ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message || 'Failed to update teacher',
            error: error.message
        });
    }
};

/**
 * Deactivate teacher account (soft delete)
 * @route DELETE /api/teachers/:id
 * @access Private/Admin
 * @param {string} req.params.id - Teacher ID
 * @returns {Object} Confirmation message
 */
const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id);
        if (!teacher) throw new NotFoundError('Teacher not found');

        await teacher.update({ isActive: false });
        res.json({
            success: true,
            message: 'Teacher account deactivated successfully'
        });
    } catch (error) {
        const statusCode = error instanceof NotFoundError ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || 'Failed to deactivate teacher',
            error: error.message
        });
    }
};

module.exports = {
    getAllTeachers,
    addTeacher,
    updateTeacher,
    deleteTeacher
};
const User = require('../models/User');
const { NotFoundError, ForbiddenError } = require('../errors');

/**
 * Admin controller for managing administrator accounts
 * @class AdminController
 */

/**
 * Retrieve all active administrators
 * @route GET /api/admins
 * @access Private/Admin
 */
const getAllAdmins = async (req, res) => {
    try {
        const admins = await User.findAll({
            where: { role: 'admin', isActive: true },
            attributes: { exclude: ['password'] }
        });
        res.json({ success: true, count: admins.length, data: admins });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Server error retrieving administrators',
            error: error.message 
        });
    }
};

/**
 * Grant administrator privileges to a user
 * @route PUT /api/admins/:id
 * @access Private/Admin
 */
const assignAdminRole = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) throw new NotFoundError('User not found');
        if (user.role === 'admin') {
            return res.json({ 
                success: true,
                message: 'User already has administrator privileges',
                data: user 
            });
        }

        const updatedUser = await user.update({ role: 'admin' });
        res.json({
            success: true,
            data: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role
            }
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Error updating user role',
            error: error.message
        });
    }
};

/**
 * Revoke administrator privileges (soft delete)
 * @route DELETE /api/admins/:id
 * @access Private/Admin
 */
const removeAdmin = async (req, res) => {
    try {
        const admin = await User.findByPk(req.params.id);
        if (!admin) throw new NotFoundError('Admin not found');
        if (admin.id === req.user.id) throw new ForbiddenError('Cannot remove your own admin privileges');

        await admin.update({
            role: 'user',
            isActive: false
        });

        res.json({ 
            success: true,
            message: 'Admin privileges revoked successfully'
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Error removing administrator',
            error: error.message
        });
    }
};

module.exports = { getAllAdmins, assignAdminRole, removeAdmin };
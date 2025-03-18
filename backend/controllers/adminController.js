const User = require('../models/User');

// @desc    Get all admins
// @route   GET /api/admins
// @access  Private/Admin
const getAllAdmins = async (req, res) => {
    try {
        const admins = await User.findAll({
            where: { role: 'admin', isActive: true },
            attributes: { exclude: ['password'] }
        });
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Assign admin role
// @route   PUT /api/admins/:id
// @access  Private/Admin
const assignAdminRole = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        const updatedUser = await user.update({
            role: 'admin'
        });

        res.json({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Remove admin (soft delete)
// @route   DELETE /api/admins/:id
// @access  Private/Admin
const removeAdmin = async (req, res) => {
    try {
        const admin = await User.findByPk(req.params.id);
        
        if (!admin) {
            res.status(404);
            throw new Error('Admin not found');
        }

        if (admin.id === req.user.id) {
            res.status(400);
            throw new Error('Cannot remove yourself as admin');
        }

        await admin.update({
            role: 'user',
            isActive: false
        });

        res.json({ message: 'Admin removed successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllAdmins,
    assignAdminRole,
    removeAdmin
}; 
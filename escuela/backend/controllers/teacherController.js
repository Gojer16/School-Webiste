const Teacher = require('../models/Teacher');

// @desc    Get all active teachers
// @route   GET /api/teachers
// @access  Public
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({
            where: { isActive: true }
        });
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new teacher
// @route   POST /api/teachers
// @access  Private/Admin
const addTeacher = async (req, res) => {
    try {
        const { name, email, subject, phone, bio, imageUrl } = req.body;
        const teacher = await Teacher.create({
            name,
            email,
            subject,
            phone,
            bio,
            imageUrl
        });
        res.status(201).json(teacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update teacher info
// @route   PUT /api/teachers/:id
// @access  Private/Admin
const updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id);
        
        if (!teacher) {
            res.status(404);
            throw new Error('Teacher not found');
        }

        const updatedTeacher = await teacher.update(req.body);
        res.json(updatedTeacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete teacher (soft delete)
// @route   DELETE /api/teachers/:id
// @access  Private/Admin
const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id);
        
        if (!teacher) {
            res.status(404);
            throw new Error('Teacher not found');
        }

        await teacher.update({ isActive: false });
        res.json({ message: 'Teacher removed successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllTeachers,
    addTeacher,
    updateTeacher,
    deleteTeacher
}; 
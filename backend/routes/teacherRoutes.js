const express = require('express');
const router = express.Router();
const {
    getAllTeachers,
    addTeacher,
    updateTeacher,
    deleteTeacher
} = require('../controllers/teacherController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/', getAllTeachers);

// Protected routes
router.post('/', protect, admin, addTeacher);
router.put('/:id', protect, admin, updateTeacher);
router.delete('/:id', protect, admin, deleteTeacher);

module.exports = router; 
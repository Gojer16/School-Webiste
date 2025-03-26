const express = require('express');
const router = express.Router();
const {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Protected routes (admin only)
router.post('/', protect, admin, createCourse);
router.put('/:id', protect, admin, updateCourse);
router.delete('/:id', protect, admin, deleteCourse);

module.exports = router;
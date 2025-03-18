const express = require('express');
const router = express.Router();
const {
    submitContact,
    getMessages,
    updateMessageStatus
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.post('/', submitContact);

// Protected routes
router.get('/', protect, admin, getMessages);
router.put('/:id', protect, admin, updateMessageStatus);

module.exports = router; 
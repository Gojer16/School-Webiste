const express = require('express');
const router = express.Router();
const {
    submitContact,
    getMessages,
    updateMessageStatus
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/auth');

// Public route (Anyone can submit a contact message)
router.post('/', submitContact);

// Protected routes (Only admins can access messages and update statuses)
router.get('/', protect, admin, getMessages);
router.put('/:id', protect, admin, updateMessageStatus);

module.exports = router;

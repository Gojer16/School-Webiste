const express = require('express');
const router = express.Router();
const {
    getAllAdmins,
    assignAdminRole,
    removeAdmin
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

// All routes are protected and require admin access
router.use(protect, admin);

router.get('/', getAllAdmins);
router.put('/:id', assignAdminRole);
router.delete('/:id', removeAdmin);

module.exports = router; 
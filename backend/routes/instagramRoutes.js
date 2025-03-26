const express = require('express');
const router = express.Router();
const { getInstagramFeed, refreshAccessToken } = require('../controllers/instagramController');

router.get('/feed', getInstagramFeed);
router.get('/refresh-token', refreshAccessToken);

module.exports = router;
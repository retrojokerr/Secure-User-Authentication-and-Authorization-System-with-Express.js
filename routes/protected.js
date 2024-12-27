// routes/protected.js
const express = require('express');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const logger = require('../utils/logger');

const router = express.Router();

// Protected route for all authenticated users
router.get('/profile', auth, async (req, res) => {
    try {
        res.json({ message: 'Profile access granted' });
    } catch (error) {
        logger.error('Profile access error:', error);
        res.status(500).json({ message: 'Error accessing profile' });
    }
});

// Protected route for admins only
router.get('/admin', [auth, roleCheck(['admin'])], async (req, res) => {
    try {
        res.json({ message: 'Admin access granted' });
    } catch (error) {
        logger.error('Admin access error:', error);
        res.status(500).json({ message: 'Error accessing admin area' });
    }
});

module.exports = router;

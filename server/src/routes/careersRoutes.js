// server/src/routes/careersRoutes.js
const express = require('express');
const router = express.Router();
const careersController = require('../controllers/careersController');
const { protect, authorize } = require('../middleware/auth');

// Debug log to see what's in careersController
console.log('Careers Controller:', Object.keys(careersController));

/**
 * @route   GET /api/careers/positions
 * @desc    Get all job positions
 * @access  Public
 */
router.get('/positions', careersController.getPositions);

/**
 * @route   GET /api/careers/openings
 * @desc    Get all job openings
 * @access  Public
 */
router.get('/openings', careersController.getJobOpenings);

/**
 * @route   POST /api/careers/apply
 * @desc    Submit a job application
 * @access  Public
 */
router.post('/apply', careersController.submitApplication);

module.exports = router;
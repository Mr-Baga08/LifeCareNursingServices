// server/src/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const bookingController = require('../controllers/bookingController');

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Public
 */
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('phone', 'Valid phone number is required').matches(/^[0-9]{10}$/),
    check('email', 'Please include a valid email').isEmail(),
    check('address', 'Address is required').not().isEmpty(),
    check('service', 'Service is required').not().isEmpty(),
    check('duration', 'Duration is required').not().isEmpty(),
    check('startDate', 'Start date is required').isISO8601(),
    check('days', 'Number of days is required').isInt({ min: 1 }),
  ],
  bookingController.createBooking
);

/**
 * @route   GET /api/bookings/:id
 * @desc    Get booking by ID
 * @access  Private (should be restricted in production)
 */
router.get('/:id', bookingController.getBookingById);

/**
 * @route   GET /api/bookings
 * @desc    Get all bookings (admin only)
 * @access  Private
 */
router.get('/', bookingController.getAllBookings);

/**
 * @route   PUT /api/bookings/:id
 * @desc    Update booking status
 * @access  Private
 */
router.put(
  '/:id',
  [
    check('status', 'Status is required').isIn(['pending', 'confirmed', 'cancelled', 'completed']),
  ],
  bookingController.updateBookingStatus
);

/**
 * @route   DELETE /api/bookings/:id
 * @desc    Delete a booking
 * @access  Private
 */
router.delete('/:id', bookingController.deleteBooking);

/**
 * @route   POST /api/bookings/calculate-price
 * @desc    Calculate booking price
 * @access  Public
 */
router.post(
  '/calculate-price',
  [
    check('service', 'Service is required').not().isEmpty(),
    check('duration', 'Duration is required').not().isEmpty(),
    check('days', 'Number of days is required').isInt({ min: 1 }),
  ],
  bookingController.calculatePrice
);

module.exports = router;
// server/src/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const reviewController = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

/**
 * @route   GET /api/reviews
 * @desc    Get all reviews
 * @access  Public
 */
router.get('/', reviewController.getReviews);

/**
 * @route   GET /api/reviews/:id
 * @desc    Get review by ID
 * @access  Public
 */
router.get('/:id', reviewController.getReviewById);

/**
 * @route   POST /api/reviews
 * @desc    Create a new review
 * @access  Public
 */
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('rating', 'Rating is required').isInt({ min: 1, max: 5 }),
    check('content', 'Review content is required').not().isEmpty()
  ],
  reviewController.createReview
);

/**
 * @route   PUT /api/reviews/:id
 * @desc    Update a review
 * @access  Private (Admin only)
 */
// If you just need authentication
router.put(
  '/:id',
  protect,
  [
    check('status', 'Status is required').isIn(['pending', 'approved', 'rejected']),
  ],
  reviewController.updateReviewStatus
);

// If you want to restrict to admin role
router.put(
  '/:id',
  protect,
  authorize('admin'),
  [
    check('status', 'Status is required').isIn(['pending', 'approved', 'rejected']),
  ],
  reviewController.updateReviewStatus
);
/** 
 * @route   DELETE /api/reviews/:id
 * @desc    Delete a review
 * @access  Private (Admin only)
 */
router.delete('/:id', protect, reviewController.deleteReview);

/**
 * @route   POST /api/reviews/:id/reply
 * @desc    Add admin reply to review
 * @access  Private (Admin only)
 */
// router.post(
//   '/:id/reply',
//   protect,
//   [
//     check('reply', 'Reply content is required').not().isEmpty()
//   ],
//   reviewController.addReplyToReview
// );

router.post('/:id/reply', protect, authorize('admin'), [
  check('reply', 'Reply content is required').not().isEmpty()
], reviewController.addReplyToReview);

module.exports = router; 
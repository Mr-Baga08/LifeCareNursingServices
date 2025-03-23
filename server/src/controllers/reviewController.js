// server/src/controllers/reviewController.js
const { validationResult } = require('express-validator');
const Review = require('../models/Review');
const logger = require('../utils/logger');

/**
 * Get all reviews with optional filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getReviews = async (req, res) => {
  try {
    // Prepare query object with filters
    const queryObj = {};
    
    // Status filter (default to approved for public requests)
    queryObj.status = req.user?.role === 'admin' ? 
      req.query.status || ['pending', 'approved', 'rejected'] : 
      'approved';
    
    // Service filter
    if (req.query.service) {
      queryObj.service = req.query.service;
    }
    
    // Rating filter
    if (req.query.rating) {
      queryObj.rating = req.query.rating;
    }
    
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Sort options
    const sortBy = req.query.sortBy || '-createdAt'; // Default sort by newest
    
    // Execute query
    const reviews = await Review.find(queryObj)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);
    
    // Get total count
    const total = await Review.countDocuments(queryObj);
    
    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: reviews
    });
  } catch (error) {
    logger.error(`Error getting reviews: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get review by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Only return approved reviews to public (unless admin)
    if (review.status !== 'approved' && !req.user?.role === 'admin') {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    logger.error(`Error getting review: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Create a new review
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createReview = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, rating, content, service = 'general' } = req.body;
    
    // Create review
    const review = new Review({
      name,
      email,
      rating,
      content,
      service,
      status: 'pending' // All reviews start as pending for moderation
    });
    
    // Save to database
    await review.save();
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your review! It has been submitted for approval.',
      data: review
    });
  } catch (error) {
    logger.error(`Error creating review: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Update review status (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateReviewStatus = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { status } = req.body;
    
    // Find review by ID
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Update status
    review.status = status;
    review.updatedAt = Date.now();
    
    // Save changes
    await review.save();
    
    res.status(200).json({
      success: true,
      message: `Review ${status}`,
      data: review
    });
  } catch (error) {
    logger.error(`Error updating review status: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Delete a review (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    await review.remove();
    
    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    logger.error(`Error deleting review: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Add admin reply to review
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.addReplyToReview = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { reply } = req.body;
    
    // Find review by ID
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    // Add admin reply
    review.adminReply = {
      content: reply,
      date: Date.now()
    };
    
    review.updatedAt = Date.now();
    
    // Save changes
    await review.save();
    
    res.status(200).json({
      success: true,
      message: 'Reply added successfully',
      data: review
    });
  } catch (error) {
    logger.error(`Error adding reply to review: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
// server/src/routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// Debug log to see what's in galleryController
console.log('Gallery Controller:', Object.keys(galleryController));

// Add a simple handler as a temporary fix
const tempHandler = (req, res) => {
  res.status(200).json({ message: 'Temporary gallery endpoint' });
};

/**
 * @route   GET /api/gallery
 * @desc    Get all gallery images
 * @access  Public
 */
router.get('/', galleryController.getAllImages || tempHandler);

/**
 * @route   GET /api/gallery/categories
 * @desc    Get gallery categories
 * @access  Public
 */
router.get('/categories', galleryController.getCategories || tempHandler);

/**
 * @route   POST /api/gallery
 * @desc    Upload a gallery image
 * @access  Private (Admin only)
 */
router.post('/', galleryController.uploadImage || tempHandler);

/**
 * @route   DELETE /api/gallery/:id
 * @desc    Delete a gallery image
 * @access  Private (Admin only)
 */
router.delete('/:id', galleryController.deleteImage || tempHandler);

module.exports = router;
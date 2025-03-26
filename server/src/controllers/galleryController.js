// server/src/controllers/galleryController.js
const path = require('path');
const fs = require('fs').promises;
const logger = require('../utils/logger');

/**
 * Get all gallery images
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllImages = async (req, res) => {
  try {
    // Define gallery categories
    const categories = ['all', 'facilities', 'team', 'patients', 'events'];
    
    // Get category from query params or default to 'all'
    const category = req.query.category || 'all';
    
    // Validate category
    if (!categories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }
    
    // In a real application, you would fetch these from a database
    // For now, return sample gallery data
    const galleryData = [
      {
        id: 1,
        title: 'Modern Care Facility',
        description: 'Our state-of-the-art nursing facility designed for optimal patient comfort and care.',
        imageUrl: '/images/gallery/facility-1.jpg',
        category: 'facilities',
        dateAdded: new Date('2023-06-01')
      },
      {
        id: 2,
        title: 'Nursing Team',
        description: 'Our dedicated team of experienced nurses ready to provide the best care.',
        imageUrl: '/images/gallery/team-1.jpg',
        category: 'team',
        dateAdded: new Date('2023-06-05')
      },
      // Add more sample data as needed
    ];
    
    // Filter images by category if not 'all'
    const filteredImages = category === 'all' 
      ? galleryData 
      : galleryData.filter(img => img.category === category);
    
    res.status(200).json({
      success: true,
      count: filteredImages.length,
      data: filteredImages
    });
  } catch (error) {
    logger.error(`Error getting gallery images: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get gallery categories
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getCategories = async (req, res) => {
  try {
    // Define gallery categories
    const categories = [
      { id: 'all', label: 'All' },
      { id: 'facilities', label: 'Our Facilities' },
      { id: 'team', label: 'Our Team' },
      { id: 'patients', label: 'Patient Care' },
      { id: 'events', label: 'Events' }
    ];
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    logger.error(`Error getting gallery categories: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Upload a gallery image
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.uploadImage = async (req, res) => {
  try {
    // This would be implemented with multer middleware
    // For now, just return a placeholder response
    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        id: Math.floor(Math.random() * 1000),
        title: req.body.title,
        description: req.body.description,
        imageUrl: '/images/gallery/placeholder.jpg',
        category: req.body.category,
        dateAdded: new Date()
      }
    });
  } catch (error) {
    logger.error(`Error uploading gallery image: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Delete a gallery image
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteImage = async (req, res) => {
  try {
    // This would delete from a database and file system
    // For now, just return a placeholder response
    res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    logger.error(`Error deleting gallery image: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
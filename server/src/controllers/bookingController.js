// server/src/controllers/bookingController.js
const { validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const pricingService = require('../services/pricingService');
const emailService = require('../services/emailService');

/**
 * Create a new booking
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createBooking = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      name,
      phone,
      email,
      address,
      service,
      duration,
      startDate,
      days,
      notes
    } = req.body;

    // Calculate price
    const price = pricingService.calculatePrice(service, duration, days);

    // Create new booking
    const booking = new Booking({
      name,
      phone,
      email,
      address,
      service,
      duration,
      startDate,
      days,
      notes,
      price,
      status: 'pending'
    });

    // Save booking to database
    await booking.save();

    // Send confirmation email to customer
    await emailService.sendBookingConfirmation(email, {
      bookingId: booking._id,
      name,
      service,
      startDate,
      price
    });

    // Send notification email to admin
    await emailService.sendAdminNotification({
      bookingId: booking._id,
      name,
      phone,
      email,
      service
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get booking by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get all bookings (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllBookings = async (req, res) => {
  try {
    // Add pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Add filters
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.service) filter.service = req.query.service;
    
    // Add date range filter
    if (req.query.startDate) {
      filter.startDate = { $gte: new Date(req.query.startDate) };
    }
    
    if (req.query.endDate) {
      if (!filter.startDate) filter.startDate = {};
      filter.startDate.$lte = new Date(req.query.endDate);
    }

    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Update booking status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateBookingStatus = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { status } = req.body;
    
    // Find booking by ID
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Update status
    booking.status = status;
    
    // Add status update timestamp
    booking.statusUpdatedAt = Date.now();
    
    // Save updated booking
    await booking.save();
    
    // Send status update email to customer
    await emailService.sendStatusUpdate(booking.email, {
      bookingId: booking._id,
      name: booking.name,
      service: booking.service,
      status
    });
    
    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Delete a booking
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    await booking.remove();
    
    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Calculate booking price
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.calculatePrice = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { service, duration, days } = req.body;
    
    // Calculate price
    const price = pricingService.calculatePrice(service, duration, days);
    
    res.status(200).json({
      success: true,
      data: {
        service,
        duration,
        days,
        price
      }
    });
  } catch (error) {
    console.error('Error calculating price:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
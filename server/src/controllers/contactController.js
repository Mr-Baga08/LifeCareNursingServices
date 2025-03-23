// server/src/controllers/contactController.js
const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const Subscriber = require('../models/Subscriber');
const emailService = require('../services/emailService');

/**
 * Send a contact message
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.sendContactMessage = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Create new contact message
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    // Save contact message to database
    await contact.save();

    // Send email notification
    await emailService.sendContactFormSubmission({
      name,
      email,
      subject,
      message
    });

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully.'
    });
  } catch (error) {
    console.error('Error sending contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Subscribe to newsletter
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.subscribeNewsletter = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email } = req.body;

    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    
    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: 'Email already subscribed to the newsletter.'
      });
    }

    // Create new subscriber
    const subscriber = new Subscriber({ email });
    
    // Save subscriber to database
    await subscriber.save();
    
    // Send confirmation email
    await emailService.sendNewsletterConfirmation(email);

    res.status(200).json({
      success: true,
      message: 'You have successfully subscribed to our newsletter.'
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
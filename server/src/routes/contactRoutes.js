// server/src/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const contactController = require('../controllers/contactController');

/**
 * @route   POST /api/contact
 * @desc    Send a contact message
 * @access  Public
 */
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('subject', 'Subject is required').not().isEmpty(),
    check('message', 'Message is required').not().isEmpty(),
  ],
  contactController.sendContactMessage
);

/**
 * @route   POST /api/contact/newsletter
 * @desc    Subscribe to newsletter
 * @access  Public
 */
router.post(
  '/newsletter',
  [
    check('email', 'Please include a valid email').isEmail(),
  ],
  contactController.subscribeNewsletter
);

module.exports = router;

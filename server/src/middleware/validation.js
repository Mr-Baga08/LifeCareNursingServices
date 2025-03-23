// server/src/middleware/validation.js
const { validationResult } = require('express-validator');

/**
 * Middleware to handle validation errors from express-validator
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
      message: errors.array()[0].msg
    });
  }
  
  next();
};

/**
 * Middleware to sanitize user input
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const sanitizeInput = (req, res, next) => {
  // Sanitize request body if it exists
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      // Sanitize strings to prevent XSS
      if (typeof req.body[key] === 'string') {
        // Basic sanitization - remove script tags
        req.body[key] = req.body[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .trim();
      }
    });
  }
  
  next();
};

// Common validation rules
const validationRules = {
  name: {
    notEmpty: {
      errorMessage: 'Name is required'
    },
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: 'Name must be between 2 and 50 characters'
    }
  },
  email: {
    notEmpty: {
      errorMessage: 'Email is required'
    },
    isEmail: {
      errorMessage: 'Please include a valid email'
    },
    normalizeEmail: true
  },
  phone: {
    notEmpty: {
      errorMessage: 'Phone number is required'
    },
    matches: {
      options: /^[0-9]{10}$/,
      errorMessage: 'Please provide a valid 10-digit phone number'
    }
  },
  password: {
    notEmpty: {
      errorMessage: 'Password is required'
    },
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters'
    }
  }
};

module.exports = {
  validateRequest,
  sanitizeInput,
  validationRules
};
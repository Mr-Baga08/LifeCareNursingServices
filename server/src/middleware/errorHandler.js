// server/src/middleware/errorHandler.js
const logger = require('../utils/logger');

/**
 * Global error handler middleware
 * @param {Object} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error(`${err.name}: ${err.message}`, { 
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip
  });

  // Determine status code
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Specific error handling for known error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
  } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    err.message = 'Resource not found';
  } else if (err.code === 11000) { // Duplicate key error
    statusCode = 400;
    err.message = 'Duplicate data found';
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    err.message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    err.message = 'Token expired';
  }

  // Format error response for production
  const errorResponse = {
    success: false,
    message: err.message || 'Server Error',
    statusCode
  };
  
  // Include stack trace in development mode
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  // Send response
  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
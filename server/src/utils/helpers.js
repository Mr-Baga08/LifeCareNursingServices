// server/src/utils/helpers.js

/**
 * Server-side utility functions
 */

const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

/**
 * Generate a random token
 * @param {number} length - Length of the token
 * @returns {string} Random token
 */
exports.generateToken = (length = 20) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Format date for consistent output
 * @param {Date} date - Date to format
 * @param {string} format - Format style ('short', 'long', 'full')
 * @returns {string} Formatted date string
 */
exports.formatDate = (date, format = 'long') => {
  const options = {};
  
  switch (format) {
    case 'short':
      options.day = 'numeric';
      options.month = 'short';
      options.year = 'numeric';
      break;
    case 'full':
      options.weekday = 'long';
      options.day = 'numeric';
      options.month = 'long';
      options.year = 'numeric';
      options.hour = '2-digit';
      options.minute = '2-digit';
      break;
    case 'time':
      options.hour = '2-digit';
      options.minute = '2-digit';
      break;
    case 'long':
    default:
      options.day = 'numeric';
      options.month = 'long';
      options.year = 'numeric';
  }
  
  return new Intl.DateTimeFormat('en-IN', options).format(new Date(date));
};

/**
 * Format currency (Indian Rupees)
 * @param {number} amount - Amount to format
 * @returns {string} Formatted amount
 */
exports.formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Asynchronous file existence check
 * @param {string} filepath - Path to check
 * @returns {Promise<boolean>} Whether file exists
 */
exports.fileExists = async (filepath) => {
  try {
    await fs.promises.access(filepath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Create directory if it doesn't exist
 * @param {string} dirPath - Directory path
 * @returns {Promise<void>}
 */
exports.ensureDir = async (dirPath) => {
  try {
    await fs.promises.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
};

/**
 * Get service name from service code
 * @param {string} serviceCode - Service code
 * @returns {string} Service name
 */
exports.getServiceName = (serviceCode) => {
  const serviceNames = {
    'elderly_care': 'Elderly Care',
    'post_op': 'Post-Operative Care',
    'chronic': 'Chronic Disease Management',
    'physio': 'Physical Therapy',
    'wound': 'Wound Care',
    'palliative': 'Palliative Care',
    'general': 'General Care'
  };
  
  return serviceNames[serviceCode] || serviceCode;
};

/**
 * Get duration text from duration code
 * @param {string} durationCode - Duration code
 * @returns {string} Duration text
 */
exports.getDurationText = (durationCode) => {
  const durationTexts = {
    '4': '4 Hours',
    '8': '8 Hours',
    '12': '12 Hours',
    '24': '24 Hours (Full Day)'
  };
  
  return durationTexts[durationCode] || durationCode;
};

/**
 * Generate a slug from a string
 * @param {string} str - String to slugify
 * @returns {string} URL-friendly slug
 */
exports.slugify = (str) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Sanitize a string (basic XSS protection)
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
exports.sanitizeString = (str) => {
  if (!str) return '';
  
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Mask sensitive information (like email or phone)
 * @param {string} str - String to mask
 * @param {string} type - Type of data ('email', 'phone')
 * @returns {string} Masked string
 */
exports.maskSensitiveInfo = (str, type = 'email') => {
  if (!str) return '';
  
  if (type === 'email') {
    const [username, domain] = str.split('@');
    if (!domain) return str;
    
    const maskedUsername = username.charAt(0) + 
      '*'.repeat(Math.max(2, username.length - 2)) + 
      (username.length > 1 ? username.charAt(username.length - 1) : '');
    
    return `${maskedUsername}@${domain}`;
  }
  
  if (type === 'phone') {
    // For 10-digit Indian phone numbers
    return str.slice(0, 2) + '*'.repeat(str.length - 4) + str.slice(-2);
  }
  
  return str;
};

/**
 * Calculate age based on date of birth
 * @param {Date} dob - Date of birth
 * @returns {number} Age in years
 */
exports.calculateAge = (dob) => {
  const dobDate = new Date(dob);
  const today = new Date();
  
  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Parse and validate a date string
 * @param {string} dateStr - Date string
 * @returns {Date|null} Valid date or null
 */
exports.parseDate = (dateStr) => {
  if (!dateStr) return null;
  
  const date = new Date(dateStr);
  
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Calculate time difference between dates
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date (defaults to now)
 * @returns {Object} Time difference object
 */
exports.getTimeDifference = (startDate, endDate = new Date()) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Time difference in milliseconds
  const diff = Math.abs(end - start);
  
  // Calculate time units
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes, totalHours: days * 24 + hours };
};
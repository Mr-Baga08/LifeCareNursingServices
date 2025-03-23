// client/src/utils/validation.js

/**
 * Form validation helper functions
 */

// Validate email format
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validate phone number format (10 digits)
  export const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };
  
  // Validate password strength
  export const isStrongPassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Password strength checker
  export const getPasswordStrength = (password) => {
    if (!password) return { score: 0, feedback: 'Required' };
    
    let score = 0;
    let feedback = '';
    
    // Length check
    if (password.length < 6) {
      return { score: 1, feedback: 'Too short' };
    } else if (password.length >= 10) {
      score += 2;
    } else {
      score += 1;
    }
    
    // Character variety checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Provide feedback based on score
    if (score < 3) {
      feedback = 'Weak';
    } else if (score < 5) {
      feedback = 'Moderate';
    } else {
      feedback = 'Strong';
    }
    
    return { score, feedback };
  };
  
  // Form-wide validation helpers
  export const validateField = (name, value, rules = {}) => {
    // Skip validation if no rules for this field
    if (!rules[name]) return { isValid: true, error: null };
  
    const fieldRules = rules[name];
    
    // Check required
    if (fieldRules.required && !value) {
      return { isValid: false, error: fieldRules.requiredMessage || 'This field is required' };
    }
    
    // Check min length
    if (fieldRules.minLength && value.length < fieldRules.minLength) {
      return { 
        isValid: false, 
        error: fieldRules.minLengthMessage || `Must be at least ${fieldRules.minLength} characters` 
      };
    }
    
    // Check max length
    if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
      return { 
        isValid: false, 
        error: fieldRules.maxLengthMessage || `Must be less than ${fieldRules.maxLength} characters` 
      };
    }
    
    // Check email format
    if (fieldRules.isEmail && !isValidEmail(value)) {
      return { isValid: false, error: fieldRules.emailMessage || 'Invalid email format' };
    }
    
    // Check phone format
    if (fieldRules.isPhone && !isValidPhone(value)) {
      return { isValid: false, error: fieldRules.phoneMessage || 'Invalid phone number format' };
    }
    
    // Check password strength
    if (fieldRules.isStrongPassword && !isStrongPassword(value)) {
      return { 
        isValid: false, 
        error: fieldRules.passwordMessage || 'Password must have at least 8 characters, including uppercase, lowercase, and numbers' 
      };
    }
    
    // Check pattern match
    if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
      return { isValid: false, error: fieldRules.patternMessage || 'Invalid format' };
    }
    
    // Check custom validation
    if (fieldRules.validate) {
      const customValidation = fieldRules.validate(value);
      if (customValidation !== true) {
        return { isValid: false, error: customValidation };
      }
    }
    
    // If all checks pass
    return { isValid: true, error: null };
  };
  
  // Validate entire form
  export const validateForm = (values, rules) => {
    const errors = {};
    let isValid = true;
    
    Object.keys(rules).forEach(field => {
      const { isValid: fieldValid, error } = validateField(field, values[field] || '', rules);
      
      if (!fieldValid) {
        errors[field] = error;
        isValid = false;
      }
    });
    
    return { isValid, errors };
  };
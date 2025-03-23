// client/src/utils/helpers.js

/**
 * General utility functions for the application
 */

// Format currency (Indian Rupees)
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format date
  export const formatDate = (dateString, format = 'long') => {
    const date = new Date(dateString);
    
    if (isNaN(date)) {
      return 'Invalid Date';
    }
    
    switch (format) {
      case 'short':
        return new Intl.DateTimeFormat('en-IN', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric' 
        }).format(date);
      
      case 'time':
        return new Intl.DateTimeFormat('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }).format(date);
      
      case 'datetime':
        return new Intl.DateTimeFormat('en-IN', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric',
          hour: '2-digit', 
          minute: '2-digit' 
        }).format(date);
      
      case 'long':
      default:
        return new Intl.DateTimeFormat('en-IN', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        }).format(date);
    }
  };
  
  // Truncate text
  export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  // Scroll to element by ID
  export const scrollToElement = (id, offset = 80, behavior = 'smooth') => {
    const element = document.getElementById(id);
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior
      });
      
      return true;
    }
    
    return false;
  };
  
  // Get service name from service code
  export const getServiceName = (serviceCode) => {
    const serviceNames = {
      'elderly_care': 'Elderly Care',
      'post_op': 'Post-Operative Care',
      'chronic': 'Chronic Disease Management',
      'physio': 'Physical Therapy',
      'wound': 'Wound Care',
      'palliative': 'Palliative Care'
    };
    
    return serviceNames[serviceCode] || serviceCode;
  };
  
  // Get duration text from duration code
  export const getDurationText = (durationCode) => {
    const durationTexts = {
      '4': '4 Hours',
      '8': '8 Hours',
      '12': '12 Hours',
      '24': '24 Hours (Full Day)'
    };
    
    return durationTexts[durationCode] || durationCode;
  };
  
  // Format booking status
  export const formatStatus = (status) => {
    const statusFormatting = {
      'pending': { color: '#FF9800', text: 'Pending' },
      'confirmed': { color: '#4CAF50', text: 'Confirmed' },
      'cancelled': { color: '#F44336', text: 'Cancelled' },
      'completed': { color: '#2196F3', text: 'Completed' }
    };
    
    return statusFormatting[status] || { color: '#757575', text: status };
  };
  
  // Debounce function
  export const debounce = (func, wait = 300) => {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  // Generate random ID
  export const generateId = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    
    for (let i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return id;
  };
  
  // Extract error message from API error
  export const getErrorMessage = (error) => {
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        return error.response.data.message;
      }
      
      if (error.response.data.errors && error.response.data.errors.length > 0) {
        return error.response.data.errors[0].msg || 'An error occurred';
      }
    }
    
    return error.message || 'An unexpected error occurred';
  };
  
  // Format phone number (Indian format)
  export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    
    // Remove all non-digits
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format as +91 XXXXX XXXXX
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    
    // If it's already has country code
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
    }
    
    return phoneNumber;
  };
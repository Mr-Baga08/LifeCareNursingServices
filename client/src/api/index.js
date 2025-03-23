// client/src/api/index.js
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor - runs before each request
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem('token');
    
    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - runs after each response
api.interceptors.response.use(
  (response) => {
    // Return successful response data
    return response;
  },
  (error) => {
    // Handle response error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      
      const { status } = error.response;
      
      // Handle authentication errors
      if (status === 401) {
        // Unauthorized - token expired or invalid
        localStorage.removeItem('token');
        
        // Redirect to login page if not already there
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
      
      // Handle forbidden errors
      if (status === 403) {
        console.error('Permission denied');
        // Handle forbidden error (e.g., show a message)
      }
      
      // Handle not found errors
      if (status === 404) {
        console.error('Resource not found');
        // Handle not found error
      }
      
      // Handle server errors
      if (status >= 500) {
        console.error('Server error');
        // Handle server error
      }
      
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error - no response received');
      // Show network error message
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
    }
    
    // Return the error for further handling
    return Promise.reject(error);
  }
);

// Helper function to handle API errors in components
export const handleApiError = (error) => {
  let errorMessage = 'An unexpected error occurred. Please try again.';
  
  if (error.response && error.response.data) {
    // Use server provided error message if available
    errorMessage = error.response.data.message || errorMessage;
  } else if (error.message) {
    // Use axios error message if server didn't provide one
    errorMessage = error.message;
  }
  
  return errorMessage;
};

// Export the configured axios instance
export default api;
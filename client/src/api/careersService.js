// client/src/api/careersService.js
import api from './index';

/**
 * Careers service for handling career-related API requests
 */
const careersService = {
  /**
   * Submit a job application
   * @param {FormData} formData - Application form data including resume file
   * @returns {Promise} - API response
   */
  submitApplication: async (formData) => {
    try {
      const response = await api.post('/careers/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error submitting application' };
    }
  },

  /**
   * Get all job openings
   * @param {Object} params - Query parameters (filters)
   * @returns {Promise} - API response
   */
  getJobOpenings: async (params = {}) => {
    try {
      const response = await api.get('/careers/openings', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching job openings' };
    }
  },

  /**
   * Get available positions
   * @returns {Promise} - API response
   */
  getPositions: async () => {
    try {
      const response = await api.get('/careers/positions');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching positions' };
    }
  }
};

export default careersService;
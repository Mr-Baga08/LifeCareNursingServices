// client/src/api/reviewService.js
import api from './index';

/**
 * Review service for handling review-related API requests
 */
const reviewService = {
  /**
   * Get all reviews
   * @param {Object} params - Query parameters (pagination, filters)
   * @returns {Promise} - API response
   */
  getReviews: async (params = {}) => {
    try {
      const response = await api.get('/reviews', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching reviews' };
    }
  },

  /**
   * Get a specific review by ID
   * @param {string} reviewId - The review ID
   * @returns {Promise} - API response
   */
  getReviewById: async (reviewId) => {
    try {
      const response = await api.get(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching review' };
    }
  },

  /**
   * Create a new review
   * @param {Object} reviewData - Review data
   * @returns {Promise} - API response
   */
  createReview: async (reviewData) => {
    try {
      const response = await api.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error creating review' };
    }
  },

  /**
   * Update an existing review
   * @param {string} reviewId - The review ID
   * @param {Object} reviewData - Updated review data
   * @returns {Promise} - API response
   */
  updateReview: async (reviewId, reviewData) => {
    try {
      const response = await api.put(`/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating review' };
    }
  },

  /**
   * Delete a review
   * @param {string} reviewId - The review ID
   * @returns {Promise} - API response
   */
  deleteReview: async (reviewId) => {
    try {
      const response = await api.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error deleting review' };
    }
  }
};

export default reviewService;
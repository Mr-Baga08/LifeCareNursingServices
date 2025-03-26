// client/src/api/galleryService.js
import api from './index';

/**
 * Gallery service for handling gallery-related API requests
 */
const galleryService = {
  /**
   * Get all gallery items
   * @param {Object} params - Query parameters (pagination, filters, category)
   * @returns {Promise} - API response
   */
  getGalleryItems: async (params = {}) => {
    try {
      const response = await api.get('/gallery', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching gallery items' };
    }
  },

  /**
   * Get a specific gallery item by ID
   * @param {string} itemId - The gallery item ID
   * @returns {Promise} - API response
   */
  getGalleryItemById: async (itemId) => {
    try {
      const response = await api.get(`/gallery/${itemId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching gallery item' };
    }
  },

  /**
   * Get gallery categories
   * @returns {Promise} - API response
   */
  getCategories: async () => {
    try {
      const response = await api.get('/gallery/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching gallery categories' };
    }
  }
};

export default galleryService;
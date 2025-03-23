// client/src/api/bookingService.js
import api from './index';

/**
 * Booking service for handling booking-related API requests
 */
const bookingService = {
  /**
   * Create a new booking
   * @param {Object} bookingData - Booking information
   * @returns {Promise} - API response
   */
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error creating booking' };
    }
  },

  /**
   * Get a specific booking by ID
   * @param {string} bookingId - The booking ID
   * @returns {Promise} - API response
   */
  getBookingById: async (bookingId) => {
    try {
      const response = await api.get(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching booking' };
    }
  },

  /**
   * Get all bookings (admin only)
   * @param {Object} params - Query parameters (pagination, filters)
   * @returns {Promise} - API response
   */
  getAllBookings: async (params = {}) => {
    try {
      const response = await api.get('/bookings', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching bookings' };
    }
  },

  /**
   * Update booking status
   * @param {string} bookingId - The booking ID
   * @param {string} status - New status ('pending', 'confirmed', 'cancelled', 'completed')
   * @returns {Promise} - API response
   */
  updateBookingStatus: async (bookingId, status) => {
    try {
      const response = await api.put(`/bookings/${bookingId}`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating booking status' };
    }
  },

  /**
   * Delete a booking
   * @param {string} bookingId - The booking ID
   * @returns {Promise} - API response
   */
  deleteBooking: async (bookingId) => {
    try {
      const response = await api.delete(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error deleting booking' };
    }
  },

  /**
   * Calculate booking price
   * @param {Object} params - Price calculation parameters
   * @param {string} params.service - Service type
   * @param {string} params.duration - Duration of service per day
   * @param {number} params.days - Number of days
   * @returns {Promise} - API response with calculated price
   */
  calculatePrice: async (params) => {
    try {
      const response = await api.post('/bookings/calculate-price', params);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error calculating price' };
    }
  }
};

export default bookingService;
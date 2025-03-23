// client/src/api/contactService.js
import api from './index';

/**
 * Contact service for handling contact-related API requests
 */
const contactService = {
  /**
   * Send a contact message
   * @param {Object} contactData - Contact form data
   * @param {string} contactData.name - Sender's name
   * @param {string} contactData.email - Sender's email
   * @param {string} contactData.subject - Message subject
   * @param {string} contactData.message - Message content
   * @returns {Promise} - API response
   */
  sendContactMessage: async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error sending message' };
    }
  },

  /**
   * Subscribe to newsletter
   * @param {string} email - Subscriber's email
   * @returns {Promise} - API response
   */
  subscribeNewsletter: async (email) => {
    try {
      const response = await api.post('/contact/newsletter', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error subscribing to newsletter' };
    }
  }
};

export default contactService;
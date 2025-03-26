import emailjs from 'emailjs-com';

// Initialize EmailJS with your user ID
emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);

const emailService = {
  /**
   * Send an email using EmailJS
   * @param {Object} formData - Data to send in the email
   * @returns {Promise} - EmailJS response
   */
  sendEmail: async (formData) => {
    try {
      // Template params are the variables you'll use in your email template
      const templateParams = {
        to_email: process.env.REACT_APP_EMAILJS_RECEIVER_EMAIL,
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        // Add any other parameters your template uses
      };

      const response = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
};

// At the top of your emailService.js file
console.log('EmailJS Config:', {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  userId: process.env.REACT_APP_EMAILJS_USER_ID,
  receiverEmail: process.env.REACT_APP_EMAILJS_RECEIVER_EMAIL
});

export default emailService;
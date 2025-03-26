import emailjs from 'emailjs-com';

const emailService = {
  sendEmail: async (formData) => {
    try {
      console.log('Sending email with data:', formData);
      
      // Initialize EmailJS with your user ID
      emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: process.env.REACT_APP_EMAILJS_RECEIVER_EMAIL,
        subject: formData.subject,
        message: formData.message,
      };

      console.log('Using template params:', templateParams);

      const response = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('Email sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
};

export default emailService;
// server/src/services/emailService.js
const nodemailer = require('nodemailer');
const { format } = require('date-fns');
const config = require('../config/email');

// Initialize nodemailer transporter
const transporter = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  secure: config.secure,
  auth: {
    user: config.user,
    pass: config.password
  }
});

// Helper to format date
const formatDate = (date) => {
  return format(new Date(date), 'MMMM dd, yyyy');
};

/**
 * Send booking confirmation email to customer
 * @param {string} email - Customer email address
 * @param {Object} data - Booking data
 */
exports.sendBookingConfirmation = async (email, data) => {
  try {
    const { bookingId, name, service, startDate, price } = data;
    
    const formattedDate = formatDate(startDate);
    
    // Prepare email content
    const mailOptions = {
      from: `"Life Care Home Nursing" <${config.user}>`,
      to: email,
      subject: 'Booking Confirmation - Life Care Home Nursing',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; background-color: #f9f9f9;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0071e3; margin: 0;">Life Care Home Nursing</h1>
            <p style="color: #666;">Reliable and Trustworthy Home Healthcare Services</p>
          </div>
          
          <div style="background-color: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Booking Confirmation</h2>
            <p>Dear ${name},</p>
            <p>Thank you for booking our services. Your booking has been received and is currently being processed. Our team will contact you shortly to confirm the details.</p>
            
            <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #0071e3; margin-top: 0;">Booking Details</h3>
              <p><strong>Booking ID:</strong> ${bookingId}</p>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Start Date:</strong> ${formattedDate}</p>
              <p><strong>Estimated Price:</strong> ₹${price}</p>
            </div>
            
            <p>If you have any questions or need to make changes to your booking, please contact us at <a href="tel:+919937331708">+91 95836 04949</a> or reply to this email.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>Life Care Home Nursing</p>
            <p>Plot No -1611 , Gangapada, Gate, near Jatni, Bhubaneswar, Odisha 752054</p>
            <p>Phone: +91 95836 04949 | Email: info@lifecarehomenursing.com</p>
          </div>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    console.log(`Booking confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    // Don't throw the error - just log it so it doesn't break the flow
  }
};

/**
 * Send booking notification to admin
 * @param {Object} data - Booking data
 */
exports.sendAdminNotification = async (data) => {
  try {
    const { bookingId, name, phone, email, service } = data;
    
    // Prepare email content
    const mailOptions = {
      from: `"Life Care Home Nursing" <${config.user}>`,
      to: config.adminEmail,
      subject: 'New Booking Notification - Life Care Home Nursing',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #0071e3;">New Booking Received</h2>
          <p>A new booking has been received with the following details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Booking ID</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${bookingId}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Customer Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Service</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${service}</td>
            </tr>
          </table>
          
          <p>Please login to the admin dashboard to view the full details and confirm the booking.</p>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="${config.adminUrl}" style="background-color: #0071e3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to Admin Dashboard</a>
          </div>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    console.log(`Admin notification sent for booking ${bookingId}`);
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    // Don't throw the error - just log it so it doesn't break the flow
  }
};

/**
 * Send booking status update to customer
 * @param {string} email - Customer email address
 * @param {Object} data - Booking data
 */
exports.sendStatusUpdate = async (email, data) => {
  try {
    const { bookingId, name, service, status } = data;
    
    // Prepare status-specific messages
    let statusMessage = '';
    let subjectStatus = '';
    
    switch (status) {
      case 'confirmed':
        subjectStatus = 'Confirmed';
        statusMessage = 'Your booking has been confirmed. Our team will arrive at your location on the scheduled date.';
        break;
      case 'cancelled':
        subjectStatus = 'Cancelled';
        statusMessage = 'Your booking has been cancelled. If you did not request this cancellation, please contact us immediately.';
        break;
      case 'completed':
        subjectStatus = 'Completed';
        statusMessage = 'Your service has been completed. We hope you were satisfied with our care. Please consider leaving a review about your experience.';
        break;
      default:
        subjectStatus = 'Updated';
        statusMessage = 'There has been an update to your booking.';
    }
    
    // Prepare email content
    const mailOptions = {
      from: `"Life Care Home Nursing" <${config.user}>`,
      to: email,
      subject: `Booking ${subjectStatus} - Life Care Home Nursing`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; background-color: #f9f9f9;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0071e3; margin: 0;">Life Care Home Nursing</h1>
            <p style="color: #666;">Reliable and Trustworthy Home Healthcare Services</p>
          </div>
          
          <div style="background-color: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Booking ${subjectStatus}</h2>
            <p>Dear ${name},</p>
            <p>${statusMessage}</p>
            
            <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Booking ID:</strong> ${bookingId}</p>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Status:</strong> <span style="text-transform: capitalize;">${status}</span></p>
            </div>
            
            <p>If you have any questions or need further assistance, please contact us at <a href="tel:+919937331708">+91 95836 04949</a> or reply to this email.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>Life Care Home Nursing</p>
            <p>Plot No -1611 , Gangapada, Gate, near Jatni, Bhubaneswar, Odisha 752054</p>
            <p>Phone: +91 95836 04949 | Email: info@lifecarehomenursing.com</p>
          </div>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    console.log(`Status update email sent to ${email} for booking ${bookingId}`);
  } catch (error) {
    console.error('Error sending status update email:', error);
    // Don't throw the error - just log it so it doesn't break the flow
  }
};

/**
 * Send contact form submission email
 * @param {Object} data - Contact form data
 */
exports.sendContactFormSubmission = async (data) => {
  try {
    const { name, email, subject, message } = data;
    
    // Prepare email content for admin
    const adminMailOptions = {
      from: `"Life Care Home Nursing Website" <${config.user}>`,
      to: config.adminEmail,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #0071e3;">New Contact Form Submission</h2>
          <p>You have received a new message from the website contact form:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Subject</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Message</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${message}</td>
            </tr>
          </table>
          
          <p>Please respond to this inquiry at your earliest convenience.</p>
        </div>
      `
    };
    
    // Prepare confirmation email for the user
    const userMailOptions = {
      from: `"Life Care Home Nursing" <${config.user}>`,
      to: email,
      subject: 'We\'ve Received Your Message - Life Care Home Nursing',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; background-color: #f9f9f9;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0071e3; margin: 0;">Life Care Home Nursing</h1>
            <p style="color: #666;">Reliable and Trustworthy Home Healthcare Services</p>
          </div>
          
          <div style="background-color: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">We've Received Your Message</h2>
            <p>Dear ${name},</p>
            <p>Thank you for contacting Life Care Home Nursing. This is to confirm that we have received your message regarding "${subject}".</p>
            <p>Our team will review your inquiry and respond within 24 hours during business days.</p>
            <p>If your matter is urgent, please call us directly at <a href="tel:+919937331708">+91 95836 04949</a>.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>Life Care Home Nursing</p>
            <p>Plot No -1611 , Gangapada, Gate, near Jatni, Bhubaneswar, Odisha 752054</p>
            <p>Phone: +91 95836 04949 | Email: info@lifecarehomenursing.com</p>
          </div>
        </div>
      `
    };
    
    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
    
    console.log(`Contact form submission processed for ${email}`);
  } catch (error) {
    console.error('Error sending contact form emails:', error);
    // Don't throw the error - just log it so it doesn't break the flow
  }
};

/**
 * Send newsletter subscription confirmation
 * @param {string} email - Subscriber's email
 */
exports.sendNewsletterConfirmation = async (email) => {
  try {
    // Prepare email content
    const mailOptions = {
      from: `"Life Care Home Nursing" <${config.user}>`,
      to: email,
      subject: 'Newsletter Subscription Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; background-color: #f9f9f9;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0071e3; margin: 0;">Life Care Home Nursing</h1>
            <p style="color: #666;">Reliable and Trustworthy Home Healthcare Services</p>
          </div>
          
          <div style="background-color: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Thanks for Subscribing!</h2>
            <p>Thank you for subscribing to our newsletter. You'll now receive regular updates about our services, health tips, and special offers.</p>
            <p>We respect your privacy and won't spam your inbox. You can unsubscribe at any time by clicking the unsubscribe link at the bottom of our emails.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>Life Care Home Nursing</p>
            <p>Plot No -1611 , Gangapada, Gate, near Jatni, Bhubaneswar, Odisha 752054</p>
            <p>Phone: +91 95836 04949 | Email: info@lifecarehomenursing.com</p>
          </div>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    console.log(`Newsletter subscription confirmation sent to ${email}`);
  } catch (error) {
    console.error('Error sending newsletter confirmation email:', error);
    // Don't throw the error - just log it so it doesn't break the flow
  }
};

module.exports = exports;
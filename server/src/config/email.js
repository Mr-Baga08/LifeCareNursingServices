// server/src/config/email.js

// Email configuration
module.exports = {
    // SMTP configuration
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true' || false,
    user: process.env.EMAIL_USER || 'info@lifecarehomenursing.com',
    password: process.env.EMAIL_PASSWORD || 'yourpassword',
    
    // Admin email to receive notifications
    adminEmail: process.env.ADMIN_EMAIL || 'admin@lifecarehomenursing.com',
    
    // Admin dashboard URL
    adminUrl: process.env.ADMIN_URL || 'https://admin.lifecarehomenursing.com',
    
    // Company info
    companyName: 'Life Care Home Nursing',
    companyAddress: 'Plot No -1611 , Gangapada, Gate, near Jatni, Bhubaneswar, Odisha 752054',
    companyPhone: '+91 95836 04949',
    companyEmail: 'info@lifecarehomenursing.com',
    companyWebsite: 'https://lifecarehomenursing.com'
  };
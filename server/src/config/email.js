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
    companyAddress: 'PlotNo: K9 A MIG-269 Kalinga Nagar Patrapada, near DN Regalia Mall, Tamando, Bhubaneswar, Odisha 751019',
    companyPhone: '+91 99373 31708',
    companyEmail: 'info@lifecarehomenursing.com',
    companyWebsite: 'https://lifecarehomenursing.com'
  };
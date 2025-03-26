// server/src/middleware/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup storage engines for different file types
const createStorage = (destination) => {
  // Create directory if it doesn't exist
  const dir = path.join(__dirname, `../../public/uploads/${destination}`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      // Create unique filename with original extension
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  });
};

// File filter function for resumes
const resumeFileFilter = (req, file, cb) => {
  // Allow only PDF, DOC, and DOCX files
  const allowedFileTypes = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed for resumes'), false);
  }
};

// File filter function for images
const imageFileFilter = (req, file, cb) => {
  // Allow only image files
  const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG, PNG, and GIF files are allowed for images'), false);
  }
};

// Create multer instances for different upload purposes
const resumeUpload = multer({
  storage: createStorage('resumes'),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
  fileFilter: resumeFileFilter
});

const imageUpload = multer({
  storage: createStorage('gallery'),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB limit
  },
  fileFilter: imageFileFilter
});

// Export different middleware configurations for different routes
module.exports = {
  single: resumeUpload.single.bind(resumeUpload), // Default for resume upload
  gallery: imageUpload.single.bind(imageUpload)
};
// server/src/controllers/careersController.js
const logger = require('../utils/logger');

/**
 * Get all job positions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getPositions = async (req, res) => {
  try {
    // In a real app, you would fetch these from a database
    const positions = [
      { value: 'nurse', label: 'Registered Nurse' },
      { value: 'caregiver', label: 'Caregiver' },
      { value: 'physio', label: 'Physiotherapist' },
      { value: 'admin', label: 'Administrative Staff' },
      { value: 'other', label: 'Other Healthcare Professional' }
    ];
    
    res.status(200).json({
      success: true,
      data: positions
    });
  } catch (error) {
    logger.error(`Error getting positions: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Get all job openings
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getJobOpenings = async (req, res) => {
  try {
    // In a real app, you would fetch these from a database
    const jobOpenings = [
      {
        id: 1,
        title: 'Registered Nurse',
        description: 'Full-time position for a registered nurse with experience in home healthcare.',
        requirements: ['Valid RN license', 'Minimum 2 years experience', 'Home healthcare experience preferred'],
        location: 'Bhubaneswar, Odisha',
        type: 'Full-time',
        postedDate: new Date('2023-07-15')
      },
      {
        id: 2,
        title: 'Caregiver',
        description: 'Part-time position for experienced caregivers to provide in-home assistance.',
        requirements: ['High school diploma', 'Caregiving experience', 'Compassionate attitude'],
        location: 'Bhubaneswar, Odisha',
        type: 'Part-time',
        postedDate: new Date('2023-07-20')
      },
      {
        id: 3,
        title: 'Physiotherapist',
        description: 'Full-time position for a licensed physiotherapist to provide in-home rehabilitation services.',
        requirements: ['Physiotherapy license', 'Minimum 3 years experience', 'Home healthcare experience preferred'],
        location: 'Bhubaneswar, Odisha',
        type: 'Full-time',
        postedDate: new Date('2023-07-25')
      }
    ];
    
    res.status(200).json({
      success: true,
      count: jobOpenings.length,
      data: jobOpenings
    });
  } catch (error) {
    logger.error(`Error getting job openings: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

/**
 * Submit a job application
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.submitApplication = async (req, res) => {
  try {
    // In a real app, you would save this to the database
    // and handle file uploads
    
    const application = {
      id: Math.floor(Math.random() * 1000),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      // Other fields...
      submittedAt: new Date()
    };
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    logger.error(`Error submitting application: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
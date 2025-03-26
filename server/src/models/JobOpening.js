const mongoose = require('mongoose');

const JobOpeningSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  requirements: {
    type: String,
    required: [true, 'Requirements are required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Job type is required'],
    enum: ['full-time', 'part-time', 'contract', 'temporary', 'internship'],
    default: 'full-time'
  },
  location: {
    type: String,
    default: 'Bhubaneswar, Odisha',
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('JobOpening', JobOpeningSchema);
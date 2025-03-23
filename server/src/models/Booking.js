// server/src/models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ],
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  service: {
    type: String,
    required: [true, 'Service type is required'],
    enum: ['elderly_care', 'post_op', 'chronic', 'physio', 'wound', 'palliative'],
    trim: true
  },
  serviceTitle: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    enum: ['4', '8', '12', '24'],
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  days: {
    type: Number,
    required: [true, 'Number of days is required'],
    min: [1, 'Minimum one day is required']
  },
  notes: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  statusUpdatedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Set service title before saving
BookingSchema.pre('save', function(next) {
  const serviceTitles = {
    'elderly_care': 'Elderly Care',
    'post_op': 'Post-Operative Care',
    'chronic': 'Chronic Disease Management',
    'physio': 'Physical Therapy',
    'wound': 'Wound Care',
    'palliative': 'Palliative Care'
  };
  
  this.serviceTitle = serviceTitles[this.service] || this.service;
  next();
});

module.exports = mongoose.model('Booking', BookingSchema);
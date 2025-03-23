// server/src/services/pricingService.js

// Pricing data
const pricingData = {
    services: {
      'elderly_care': { basePrice: 800, title: 'Elderly Care' },
      'post_op': { basePrice: 1000, title: 'Post-Operative Care' },
      'chronic': { basePrice: 900, title: 'Chronic Disease Management' },
      'physio': { basePrice: 1200, title: 'Physical Therapy' },
      'wound': { basePrice: 700, title: 'Wound Care' },
      'palliative': { basePrice: 1100, title: 'Palliative Care' }
    },
    durationMultipliers: {
      '4': 0.5,
      '8': 1,
      '12': 1.4,
      '24': 2.5
    },
    // Additional factors
    discounts: {
      duration: {
        7: 0.95, // 5% discount for a week
        30: 0.9, // 10% discount for a month
        90: 0.85 // 15% discount for 3 months
      }
    }
  };
  
  /**
   * Calculate the price for a booking
   * @param {string} service - The service type code
   * @param {string} duration - The duration per day in hours
   * @param {number} days - Number of days
   * @returns {number} - The calculated price
   */
  exports.calculatePrice = (service, duration, days) => {
    if (!pricingData.services[service]) {
      throw new Error(`Invalid service type: ${service}`);
    }
    
    if (!pricingData.durationMultipliers[duration]) {
      throw new Error(`Invalid duration: ${duration}`);
    }
    
    // Get base price and multiplier
    const { basePrice } = pricingData.services[service];
    const durationMultiplier = pricingData.durationMultipliers[duration];
    
    // Calculate base total
    let totalPrice = basePrice * durationMultiplier * days;
    
    // Apply discounts for longer bookings
    if (days >= 90) {
      totalPrice *= pricingData.discounts.duration[90];
    } else if (days >= 30) {
      totalPrice *= pricingData.discounts.duration[30];
    } else if (days >= 7) {
      totalPrice *= pricingData.discounts.duration[7];
    }
    
    // Round to nearest whole number
    return Math.round(totalPrice);
  };
  
  /**
   * Get service title from service code
   * @param {string} serviceCode - The service code
   * @returns {string} - The service title
   */
  exports.getServiceTitle = (serviceCode) => {
    if (!pricingData.services[serviceCode]) {
      return serviceCode; // Return the code if not found
    }
    
    return pricingData.services[serviceCode].title;
  };
  
  /**
   * Get all services with base prices
   * @returns {Object} - Object with service information
   */
  exports.getAllServices = () => {
    const services = {};
    
    Object.keys(pricingData.services).forEach(code => {
      services[code] = {
        title: pricingData.services[code].title,
        basePrice: pricingData.services[code].basePrice
      };
    });
    
    return services;
  };
  
  /**
   * Get all duration options with multipliers
   * @returns {Object} - Object with duration information
   */
  exports.getDurationOptions = () => {
    return pricingData.durationMultipliers;
  };
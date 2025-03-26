// client/src/components/ui/SEO.js
import React, { useEffect } from 'react';

/**
 * Simple SEO component for setting page title
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 */
const SEO = ({ 
  title = 'Life Care Home Nursing | Professional Healthcare Services in Bhubaneswar',
}) => {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Return a cleanup function to reset title when component unmounts
    return () => {
      document.title = 'Life Care Home Nursing | Professional Healthcare Services in Bhubaneswar';
    };
  }, [title]);
  
  // This component doesn't render anything
  return null;
};

export default SEO;
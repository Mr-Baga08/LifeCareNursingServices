import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import About from '../components/home/About';
import Reviews from '../components/home/Reviews';
import BookingSection from '../components/home/BookingSection';
import FaqSection from '../components/home/FaqSection';
import ContactSection from '../components/home/ContactSection';

const Home = () => {
  const location = useLocation();
  
  // Scroll to the section if hash is present in the URL
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // remove the # symbol
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Scroll to top when navigating to the page without hash
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <Box component="main">
      <Hero />
      <Services />
      <About />
      <Reviews />
      <BookingSection />
      <FaqSection />
      <ContactSection />
    </Box>
  );
};

export default Home;
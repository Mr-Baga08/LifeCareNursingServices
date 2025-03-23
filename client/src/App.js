import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter import
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './styles/theme';
import { ToastProvider } from './context/ToastContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsappButton from './components/layout/WhatsappButton';
import CookieConsent from './components/ui/CookieConsent';
import ScrollToTop from './components/ui/ScrollToTop';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import BookingPage from './pages/BookingPage';
import NotFound from './pages/NotFound';
import './styles/globals.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(
    localStorage.getItem('cookieConsent') === 'true'
  );

  useEffect(() => {
    // Check if user has a theme preference stored
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      // Check for system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const handleCookieConsent = (accepted) => {
    localStorage.setItem('cookieConsent', accepted);
    setCookieAccepted(true);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <ToastProvider>
        <CssBaseline />
        {/* Remove the Router wrapper here */}
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <WhatsappButton />
        <ScrollToTop />
        {!cookieAccepted && (
          <CookieConsent onAccept={() => handleCookieConsent(true)} onReject={() => handleCookieConsent(false)} />
        )}
        {/* End of removed Router */}
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
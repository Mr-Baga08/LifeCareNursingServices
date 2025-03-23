// client/src/routes.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import pages
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import BookingPage from './pages/BookingPage';
import NotFound from './pages/NotFound';

/**
 * Application routes configuration
 * Includes route definitions and any route-specific guards/logic
 */
const AppRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/booking" element={<BookingPage />} />
        
        {/* Admin routes would go here (protected by auth) */}
        {/* <Route path="/admin/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} /> */}
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

/**
 * Route guard for protected routes (when needed)
 */
const ProtectedRoute = ({ children }) => {
  // This is a placeholder for authentication logic
  // Replace with actual authentication check
  const isAuthenticated = false; // localStorage.getItem('token') !== null;
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default AppRoutes;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import App from './App';
import './styles/globals.css';
import reportWebVitals from './reportWebVitals';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <ThemeProvider>
          <ToastProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ToastProvider>
        </ThemeProvider>
      </React.StrictMode>
    );
  } else {
    console.error("Root element not found! Make sure there's a div with id='root' in your HTML.");
  }
});

reportWebVitals();
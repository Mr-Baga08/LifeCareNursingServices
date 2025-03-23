// client/src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Additional global styles that need to be applied via styled-components */
  /* These complement the styles in globals.css */
  
  body {
    background-color: ${props => props.theme.mode === 'dark' ? '#1c1c1e' : '#f5f5f7'};
    color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1d1d1f'};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  /* Improve focus styles for accessibility */
  *:focus-visible {
    outline: 2px solid ${props => props.theme.palette.primary.main};
    outline-offset: 2px;
  }
  
  /* Custom scrollbar for webkit browsers */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.mode === 'dark' ? '#2c2c2e' : '#f1f1f1'};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.mode === 'dark' ? '#5c5c5e' : '#c0c0c0'};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.mode === 'dark' ? '#7c7c7e' : '#a8a8a8'};
  }
  
  /* Selection style */
  ::selection {
    background-color: ${props => props.theme.palette.primary.main}33; /* 20% opacity */
    color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#000000'};
  }
  
  /* Typography smoothing */
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  
  /* Fix for iOS input zoom */
  @media screen and (max-width: 768px) {
    input, select, textarea {
      font-size: 16px !important;
    }
  }
  
  /* Remove blue highlight on mobile tap */
  * {
    -webkit-tap-highlight-color: transparent;
  }
  
  /* Improve button and link click areas on mobile */
  @media screen and (max-width: 768px) {
    button, a {
      min-height: 44px;
      min-width: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default GlobalStyles;
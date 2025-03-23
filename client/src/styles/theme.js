// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

// Common theme properties
const commonTheme = {
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '2.2rem',
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      marginBottom: '1rem',
      '@media (max-width:600px)': {
        fontSize: '1.8rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.1rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '0.75rem 1.5rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease',
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
};

// Light theme
export const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#0071e3',
      light: '#4599ff',
      dark: '#004eaf',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#86b7fe',
      light: '#b8e0ff',
      dark: '#5686cb',
      contrastText: '#000000',
    },
    success: {
      main: '#34c759',
      light: '#6fef85',
      dark: '#00912d',
    },
    error: {
      main: '#ff3b30',
      light: '#ff6b59',
      dark: '#c60000',
    },
    warning: {
      main: '#ff9500',
      light: '#ffc54d',
      dark: '#c66900',
    },
    info: {
      main: '#5ac8fa',
      light: '#8fffff',
      dark: '#0097c7',
    },
    background: {
      default: '#f5f5f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#1d1d1f',
      secondary: '#86868b',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
});

// Dark theme
export const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#0a84ff',
      light: '#69b3ff',
      dark: '#0058cb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64d2ff',
      light: '#9effff',
      dark: '#00a2cb',
      contrastText: '#000000',
    },
    success: {
      main: '#30d158',
      light: '#6fff85',
      dark: '#00a02d',
    },
    error: {
      main: '#ff453a',
      light: '#ff7769',
      dark: '#c50011',
    },
    warning: {
      main: '#ff9f0a',
      light: '#ffcf4d',
      dark: '#c67000',
    },
    info: {
      main: '#64d2ff',
      light: '#9effff',
      dark: '#00a2cb',
    },
    background: {
      default: '#1c1c1e',
      paper: '#2c2c2e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ebebf5',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
});

export default { lightTheme, darkTheme };
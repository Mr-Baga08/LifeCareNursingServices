// client/src/components/ui/Button.js
import React from 'react';
import { Button as MuiButton, CircularProgress, useTheme } from '@mui/material';

/**
 * Custom Button component that extends Material UI Button with consistent styling
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant: 'contained', 'outlined', 'text'
 * @param {string} props.color - Button color: 'primary', 'secondary', 'success', etc.
 * @param {string} props.size - Button size: 'small', 'medium', 'large'
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {boolean} props.loading - Whether to show loading spinner
 * @param {function} props.onClick - Click handler
 * @param {string} props.type - Button type: 'button', 'submit', 'reset'
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {React.ReactNode} props.startIcon - Icon to show at start of button
 * @param {React.ReactNode} props.endIcon - Icon to show at end of button
 * @param {Object} props.sx - Additional style props
 * @param {Object} props.rest - Other props to pass to MUI Button
 */
const Button = ({ 
  children, 
  variant = 'contained', 
  color = 'primary', 
  size = 'medium',
  fullWidth = false,
  loading = false,
  onClick,
  type = 'button',
  disabled = false,
  startIcon,
  endIcon,
  sx = {},
  ...rest 
}) => {
  const theme = useTheme();
  
  // Button sizes
  const sizeMap = {
    small: {
      padding: '6px 16px',
      fontSize: '0.875rem',
    },
    medium: {
      padding: '8px 22px',
      fontSize: '0.9375rem',
    },
    large: {
      padding: '10px 30px',
      fontSize: '1rem',
    },
  };
  
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      startIcon={!loading && startIcon}
      endIcon={!loading && endIcon}
      sx={{ 
        borderRadius: '30px',
        fontWeight: 500,
        textTransform: 'none',
        boxShadow: variant === 'contained' ? theme.shadows[2] : 'none',
        ...sizeMap[size],
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: variant === 'contained' ? theme.shadows[4] : 'none',
        },
        transition: 'all 0.3s ease',
        position: 'relative',
        ...sx
      }}
      {...rest}
    >
      {loading ? (
        <>
          <CircularProgress 
            size={24} 
            color="inherit" 
            sx={{ 
              position: 'absolute',
              left: '50%',
              marginLeft: '-12px',
            }}
          />
          <span style={{ visibility: 'hidden' }}>{children}</span>
        </>
      ) : (
        children
      )}
    </MuiButton>
  );
};

export default Button;
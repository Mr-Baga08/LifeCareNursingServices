// client/src/components/ui/Card.js
import React from 'react';
import { Card as MuiCard, CardContent, CardMedia, CardActions, Typography, Box, useTheme } from '@mui/material';

/**
 * Custom Card component that extends Material UI Card with consistent styling
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Card title
 * @param {string} props.subtitle - Card subtitle
 * @param {string} props.image - Image URL for card media
 * @param {React.ReactNode} props.actions - Card actions (buttons, links)
 * @param {Object} props.sx - Additional style props
 * @param {boolean} props.elevation - Card elevation, default is 1
 * @param {boolean} props.hover - Whether to add hover effect
 * @param {Object} props.rest - Other props to pass to MUI Card
 */
const Card = ({ 
  children, 
  title, 
  subtitle, 
  image, 
  actions, 
  sx = {}, 
  elevation = 1,
  hover = true,
  ...rest 
}) => {
  const theme = useTheme();
  
  return (
    <MuiCard
      elevation={elevation}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        ...(hover && {
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: theme.shadows[10],
          }
        }),
        ...sx
      }}
      {...rest}
    >
      {image && (
        <CardMedia
          component="img"
          image={image}
          alt={title || 'Card image'}
          sx={{ 
            height: 200,
            objectFit: 'cover'
          }}
        />
      )}
      
      {(title || subtitle) && (
        <Box sx={{ p: 2, pb: subtitle ? 1 : 2 }}>
          {title && (
            <Typography variant="h6" component="h3" gutterBottom={Boolean(subtitle)} sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          )}
          
          {subtitle && (
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
      
      {children && (
        <CardContent sx={{ flexGrow: 1, pt: (title || subtitle) ? 0 : 2 }}>
          {children}
        </CardContent>
      )}
      
      {actions && (
        <CardActions sx={{ p: 2, pt: 0 }}>
          {actions}
        </CardActions>
      )}
    </MuiCard>
  );
};

export default Card;
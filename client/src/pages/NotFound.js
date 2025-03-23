// client/src/pages/NotFound.js
import React from 'react';
import { Box, Container, Typography, Button, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const theme = useTheme();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        pt: { xs: 12, md: 0 }, // Account for header on mobile
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.main,
          opacity: 0.05,
          top: '-100px',
          right: '-100px',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundColor: theme.palette.secondary.main,
          opacity: 0.05,
          bottom: '-50px',
          left: '-50px',
        },
      }}
    >
      <Container 
        maxWidth="md"
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}
      >
        <motion.div variants={itemVariants}>
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontSize: { xs: '6rem', md: '10rem' },
              fontWeight: 700,
              color: theme.palette.primary.main,
              textShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
              mb: 2
            }}
          >
            404
          </Typography>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              mb: 2
            }}
          >
            Page Not Found
          </Typography>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              maxWidth: 600,
              mx: 'auto',
              mb: 4
            }}
          >
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable. Please check the URL or navigate back to the home page.
          </Typography>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            sx={{ 
              px: 4,
              py: 1.5,
              borderRadius: '30px',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '1rem'
            }}
          >
            Return to Home
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default NotFound;
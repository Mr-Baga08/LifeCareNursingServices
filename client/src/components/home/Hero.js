import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const Hero = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.7, 
        ease: "easeOut",
        yoyo: Infinity,
        repeatDelay: 3
      }
    }
  };

  const floatAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <Box 
      sx={{
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%)' 
          : 'linear-gradient(135deg, #ffffff 0%, #f5f5f7 100%)',
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
        overflow: 'hidden',
      }}
      id="home"
    >
      <Container maxWidth="xl">
        <Grid 
          container 
          spacing={3} 
          alignItems="center" 
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h1" 
                  component="h1" 
                  sx={{ 
                    mb: 2,
                    backgroundImage: theme.palette.mode === 'dark' 
                      ? 'linear-gradient(90deg, #0a84ff, #64d2ff)' 
                      : 'linear-gradient(90deg, #0071e3, #4599ff)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  Reliable and Trustworthy <br /> Home Healthcare Services
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="body1" 
                  color="textSecondary" 
                  sx={{ 
                    mb: 4, 
                    fontSize: '1.125rem',
                    maxWidth: { md: '90%' }
                  }}
                >
                  Life Care Home Nursing provides compassionate and reliable healthcare services 
                  in the comfort of your home. Our trained staff ensures personalized care for elderly, 
                  post-operative, and chronically ill patients.
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    onClick={() => navigate('/booking')}
                    sx={{ 
                      minWidth: '180px',
                      fontWeight: 600
                    }}
                  >
                    Book A Service
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="large"
                    onClick={() => {
                      const servicesSection = document.getElementById('services');
                      servicesSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    sx={{ 
                      minWidth: '180px',
                      fontWeight: 600
                    }}
                  >
                    Our Services
                  </Button>
                </Box>
              </motion.div>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} sx={{ textAlign: 'center' }}>
            <motion.div 
              variants={imageVariants}
              animate={floatAnimation}
            >
              <Box 
                component="img"
                src="/images/hero-image.jpg" 
                alt="Home Nursing Care"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  transform: 'perspective(1000px) rotateY(-5deg)',
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
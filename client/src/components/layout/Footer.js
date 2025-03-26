import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  IconButton, 
  TextField, 
  Button,
  Divider,
  Link,
  Stack,
  useTheme 
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useToast } from '../../context/ToastContext';

const Footer = () => {
  const theme = useTheme();
  const { showToast } = useToast();
  const currentYear = new Date().getFullYear();

  // Services list
  const services = [
    { name: 'Elderly Care', path: '/services/elderly-care' },
    { name: 'Post-Operative Care', path: '/services/post-operative' },
    { name: 'Chronic Disease Management', path: '/services/chronic-disease' },
    { name: 'Physical Therapy', path: '/services/physical-therapy' },
    { name: 'Wound Care', path: '/services/wound-care' },
    { name: 'Palliative Care', path: '/services/palliative-care' },
  ];

  // Quick links
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'About Us', path: '/#about' },
    { name: 'Reviews', path: '/#reviews' },
    { name: 'FAQ', path: '/#faq' },
    { name: 'Contact', path: '/#contact' },
    { name: 'Book Now', path: '/booking' },
  ];

  // Handle newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
    if (!email) {
      showToast({
        title: 'Subscription Failed',
        message: 'Please enter your email address.',
        type: 'error'
      });
      return;
    }
    
    // In a real implementation, you would call an API to handle the subscription
    // For now, we'll just show a success message
    showToast({
      title: 'Subscription Successful',
      message: 'Thank you for subscribing to our newsletter!',
      type: 'success'
    });
    
    e.target.reset();
  };

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1c' : '#1d1d1f',
        color: 'white',
        pt: 8,
        pb: 4
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4} lg={4}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 700,
                  color: 'white',
                  textDecoration: 'none',
                  mb: 2
                }}
              >
                <LocalHospitalIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                LifeCare<span style={{ color: theme.palette.primary.main }}>HomeNursing</span>
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.7, maxWidth: 350 }}>
                Providing reliable and compassionate home healthcare services to improve the quality of life for our patients in the comfort of their homes.
              </Typography>
              
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <LocationOnOutlinedIcon sx={{ mr: 1, mt: 0.3, color: theme.palette.primary.main }} />
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Plot No -1611 , Gangapada, Gate, near Jatni, Bhubaneswar, Odisha 752054
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneOutlinedIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    +91 95836 04949
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmailOutlinedIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    info@lifecarehomenursing.com
                  </Typography>
                </Box>
              </Stack>
              
              <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                <IconButton
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                  aria-label="Facebook"
                  size="small"
                >
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                  aria-label="Twitter"
                  size="small"
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                  aria-label="Instagram"
                  size="small"
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                  aria-label="LinkedIn"
                  size="small"
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                position: 'relative',
                pb: 1.5,
                mb: 2,
                fontWeight: 600,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '40px',
                  height: '2px',
                  bottom: 0,
                  left: 0,
                  backgroundColor: theme.palette.primary.main,
                }
              }}
            >
              Quick Links
            </Typography>
            
            <Stack spacing={1}>
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  component={RouterLink}
                  to={link.path}
                  underline="none"
                  sx={{ 
                    color: 'white',
                    opacity: 0.7,
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      color: theme.palette.primary.main,
                      transform: 'translateX(5px)',
                    }
                  }}
                >
                  <KeyboardArrowRightIcon fontSize="small" sx={{ mr: 1 }} />
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Grid>
          
          {/* Our Services */}
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                position: 'relative',
                pb: 1.5,
                mb: 2,
                fontWeight: 600,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '40px',
                  height: '2px',
                  bottom: 0,
                  left: 0,
                  backgroundColor: theme.palette.primary.main,
                }
              }}
            >
              Our Services
            </Typography>
            
            <Stack spacing={1}>
              {services.map((service) => (
                <Link
                  key={service.name}
                  component={RouterLink}
                  to={service.path}
                  underline="none"
                  sx={{ 
                    color: 'white',
                    opacity: 0.7,
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      color: theme.palette.primary.main,
                      transform: 'translateX(5px)',
                    }
                  }}
                >
                  <KeyboardArrowRightIcon fontSize="small" sx={{ mr: 1 }} />
                  {service.name}
                </Link>
              ))}
            </Stack>
          </Grid>
          
          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                position: 'relative',
                pb: 1.5,
                mb: 2,
                fontWeight: 600,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '40px',
                  height: '2px',
                  bottom: 0,
                  left: 0,
                  backgroundColor: theme.palette.primary.main,
                }
              }}
            >
              Newsletter
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.7 }}>
              Subscribe to our newsletter to receive updates and health tips.
            </Typography>
            
            <Box component="form" onSubmit={handleNewsletterSubmit}>
              <TextField
                fullWidth
                id="email"
                name="email"
                placeholder="Your Email Address"
                variant="outlined"
                sx={{ 
                  mb: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: 1,
                  },
                }}
                InputProps={{
                  sx: { py: 1.5 }
                }}
              />
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1.5 }}
              >
                Subscribe
              </Button>
            </Box>
            
            <Typography variant="body2" sx={{ mt: 3, opacity: 0.6, fontSize: '0.875rem' }}>
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', sm: 'center' } }}>
          <Typography variant="body2" sx={{ opacity: 0.6, textAlign: { xs: 'center', sm: 'left' } }}>
            &copy; {currentYear} Life Care Home Nursing. All Rights Reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
            <Link component={RouterLink} to="/privacy-policy" sx={{ color: 'white', opacity: 0.6, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
              <Typography variant="body2">
                Privacy Policy
              </Typography>
            </Link>
            <Link component={RouterLink} to="/terms-of-service" sx={{ color: 'white', opacity: 0.6, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
              <Typography variant="body2">
                Terms of Service
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
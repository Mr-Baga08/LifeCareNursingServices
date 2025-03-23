// client/src/pages/BookingPage.js
import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Breadcrumbs,
  Link,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BookingSection from '../components/home/BookingSection';

const BookingPage = () => {
  const theme = useTheme();

  return (
    <Box component="main">
      {/* Page Header */}
      <Box 
        sx={{ 
          pt: { xs: 12, md: 14 },
          pb: { xs: 6, md: 8 },
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'background.default' 
            : 'background.paper',
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
        <Container maxWidth="xl">
          <Breadcrumbs 
            separator={<NavigateNextIcon fontSize="small" />} 
            aria-label="breadcrumb"
            sx={{ mb: 2 }}
          >
            <Link component={RouterLink} to="/" color="inherit">
              Home
            </Link>
            <Typography color="text.primary">Book Now</Typography>
          </Breadcrumbs>
          
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              position: 'relative',
              zIndex: 2
            }}
          >
            Book Our Services
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              maxWidth: 700,
              mb: 3,
              position: 'relative',
              zIndex: 2
            }}
          >
            Fill out the form below to book professional home healthcare services from 
            Life Care. Our team will contact you shortly to confirm your booking and discuss 
            any specific requirements.
          </Typography>
        </Container>
      </Box>
      
      {/* Main Content */}
      <Box 
        sx={{ 
          py: { xs: 4, md: 6 },
          backgroundColor: theme.palette.background.default
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} lg={3}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  mb: 4, 
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Booking Information
                </Typography>
                <Typography variant="body2" paragraph color="text.secondary">
                  Our booking process is simple and straightforward. After submitting your request, 
                  our team will contact you within 24 hours to confirm availability and discuss specific requirements.
                </Typography>
                <Typography variant="body2" paragraph color="text.secondary">
                  For urgent requests, please call us directly at <strong>+91 99373 31708</strong>.
                </Typography>
              </Paper>
              
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Service Hours
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Monday - Friday:</Typography>
                  <Typography variant="body2">8:00 AM - 8:00 PM</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Saturday:</Typography>
                  <Typography variant="body2">9:00 AM - 6:00 PM</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Sunday:</Typography>
                  <Typography variant="body2">Closed (Emergency only)</Typography>
                </Box>
                <Typography variant="body2" paragraph sx={{ mt: 2, fontWeight: 500, color: theme.palette.primary.main }}>
                  24/7 Care Services Available
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={8} lg={9}>
              <BookingSection standalone={true} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default BookingPage;
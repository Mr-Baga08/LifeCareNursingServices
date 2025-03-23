import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Slide, 
  Link, 
  Stack,
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import CookieIcon from '@mui/icons-material/Cookie';

const CookieConsent = ({ onAccept, onReject }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  // Check if consent was given
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    // If no consent was given yet, show the banner
    if (!cookieConsent) {
      // Delay showing the banner for better UX
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle accept
  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setOpen(false);
    if (onAccept) onAccept();
  };

  // Handle reject
  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'false');
    setOpen(false);
    if (onReject) onReject();
  };

  // Don't render if not open
  if (!open) return null;

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Paper
        elevation={6}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          borderRadius: { xs: 0, md: '16px 16px 0 0' },
          overflow: 'hidden',
          maxWidth: { sm: '600px', md: '800px' },
          mx: { sm: 'auto' },
          mb: { sm: 2 },
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              flexGrow: 1,
            }}
          >
            <CookieIcon 
              color="primary" 
              sx={{ 
                fontSize: 36,
                mt: 0.5
              }} 
            />
            <Box>
              <Typography variant="h6" component="h3" gutterBottom>
                We Value Your Privacy
              </Typography>
              <Typography variant="body2" color="textSecondary">
                We use cookies to enhance your browsing experience, serve personalized content, 
                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                You can learn more in our{' '}
                <Link href="/privacy-policy" color="primary">
                  Privacy Policy
                </Link>.
              </Typography>
            </Box>
          </Box>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={1}
            sx={{ 
              minWidth: { sm: '220px' },
              alignSelf: { xs: 'stretch', sm: 'flex-start' }
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={handleReject}
              fullWidth={isMobile}
              size="large"
            >
              Reject All
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAccept}
              fullWidth={isMobile}
              size="large"
            >
              Accept All
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Slide>
  );
};

export default CookieConsent;
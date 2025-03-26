import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Container, 
  useScrollTrigger, 
  Slide,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// Updated Navigation links with Careers and Gallery
const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'Services', path: '/#services' },
  { title: 'About', path: '/#about' },
  { title: 'Gallery', path: '/gallery' }, // New Gallery link
  { title: 'Careers', path: '/careers' }, // New Careers link
  { title: 'Contact', path: '/#contact' },
];

// HideOnScroll component for hiding AppBar when scrolling down
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = ({ darkMode, toggleTheme }) => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // Function to handle drawer toggle
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Function to close drawer when a link is clicked
  const handleLinkClick = () => {
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  };

  // Check if route is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && !location.hash;
    }
    
    if (path.startsWith('/#')) {
      return location.hash === path.substring(1);
    }
    
    // For normal routes like /gallery and /careers
    return location.pathname === path;
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id], div[id]');
      let currentActiveSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
          currentActiveSection = section.id;
        }
      });
      
      setActiveSection(currentActiveSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Call once on mount to set initial active section
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Create the drawer content
  const drawerContent = (
    <Box sx={{ width: 280, p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          <LocalHospitalIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <span style={{ fontWeight: 700 }}>LifeCare<span style={{ color: theme.palette.primary.main }}>HomeNursing</span></span>
        </Typography>
        <IconButton onClick={handleDrawerToggle} edge="end">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List>
        {navLinks.map((link) => (
          <ListItem 
            key={link.title} 
            component={RouterLink} 
            to={link.path} 
            onClick={handleLinkClick}
            sx={{ 
              borderRadius: 1,
              mb: 1,
              color: isActive(link.path) ? 
                     theme.palette.primary.main : 'text.primary',
              backgroundColor: isActive(link.path) ? 
                              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 113, 227, 0.05)' : 'transparent',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 113, 227, 0.08)',
              }
            }}
          >
            <ListItemText 
              primary={link.title} 
              primaryTypographyProps={{ 
                fontWeight: isActive(link.path) ? 600 : 400 
              }} 
            />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          component={RouterLink}
          to="/booking"
          onClick={handleLinkClick}
          sx={{ mb: 2 }}
        >
          Book Now
        </Button>
        
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          startIcon={<PhoneIcon />}
          href="tel:+919583604949"
        >
          Call Us
        </Button>
      </Box>
      
      <Box sx={{ position: 'absolute', bottom: 24, left: 0, width: '100%', px: 2 }}>
        <Button 
          variant="text" 
          onClick={toggleTheme}
          startIcon={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          fullWidth
          sx={{ justifyContent: 'flex-start' }}
        >
          Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="fixed" 
          color="default" 
          elevation={0}
          sx={{ 
            backgroundColor: theme.palette.mode === 'dark' ? 
              'rgba(28, 28, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* Logo and Brand */}
              <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 700,
                  color: 'text.primary',
                  textDecoration: 'none',
                }}
              >
                <LocalHospitalIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                LifeCare<span style={{ color: theme.palette.primary.main }}>HomeNursing</span>
              </Typography>

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                  {navLinks.map((link) => (
                    <Button
                      key={link.title}
                      component={RouterLink}
                      to={link.path}
                      sx={{ 
                        mx: 1,
                        position: 'relative',
                        color: isActive(link.path) ? 
                               theme.palette.primary.main : 'text.primary',
                        fontWeight: isActive(link.path) ? 600 : 500,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: isActive(link.path) ? '100%' : '0%',
                          height: '2px',
                          bottom: '0',
                          left: '0',
                          backgroundColor: theme.palette.primary.main,
                          transition: 'width 0.3s ease',
                        },
                        '&:hover::after': {
                          width: '100%',
                        },
                      }}
                    >
                      {link.title}
                    </Button>
                  ))}
                </Box>
              )}

              {/* Right-side buttons */}
              <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                {!isMobile && (
                  <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/booking"
                    sx={{ ml: 2 }}
                  >
                    Book Now
                  </Button>
                )}
                
                <IconButton 
                  onClick={toggleTheme} 
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
                
                {isMobile && (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                    sx={{ ml: 1 }}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      
      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
          }
        }}
      >
        {drawerContent}
      </Drawer>
      
      {/* Toolbar placeholder for correct content positioning */}
      <Toolbar />
    </>
  );
};

export default Header;
import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Breadcrumbs,
  Link,
  useTheme,
  Tabs,
  Tab,
  Modal,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';

// Gallery categories
const categories = [
  { id: 'all', label: 'All' },
  { id: 'facilities', label: 'Our Facilities' },
  { id: 'team', label: 'Our Team' },
  { id: 'patients', label: 'Patient Care' },
  { id: 'events', label: 'Events' }
];

// Sample gallery data (in a real app, this would come from an API)
const galleryData = [
  {
    id: 1,
    title: 'Modern Care Facility',
    description: 'Our state-of-the-art nursing facility designed for optimal patient comfort and care.',
    image: '/images/gallery/facility-1.jpg',
    category: 'facilities'
  },
  {
    id: 2,
    title: 'Nursing Team',
    description: 'Our dedicated team of experienced nurses ready to provide the best care.',
    image: '/images/gallery/team-1.jpg',
    category: 'team'
  },
  {
    id: 3,
    title: 'Patient Rehabilitation',
    description: 'Specialized physical therapy and rehabilitation services for faster recovery.',
    image: '/images/gallery/patient-1.jpg',
    category: 'patients'
  },
  {
    id: 4,
    title: 'Annual Health Camp',
    description: 'Free health check-up camp organized for the community.',
    image: '/images/gallery/event-1.jpg',
    category: 'events'
  },
  {
    id: 5,
    title: 'Patient Room',
    description: 'Comfortable and clean patient rooms designed for recovery.',
    image: '/images/gallery/facility-2.jpg',
    category: 'facilities'
  },
  {
    id: 6,
    title: 'Care Specialists',
    description: 'Our specialized care team providing personalized treatment plans.',
    image: '/images/gallery/team-2.jpg',
    category: 'team'
  },
  {
    id: 7,
    title: 'Elder Care',
    description: 'Compassionate care services for elderly patients.',
    image: '/images/gallery/patient-2.jpg',
    category: 'patients'
  },
  {
    id: 8,
    title: 'Medical Equipment',
    description: 'Advanced medical equipment for accurate diagnosis and treatment.',
    image: '/images/gallery/facility-3.jpg',
    category: 'facilities'
  },
  {
    id: 9,
    title: 'Staff Training',
    description: 'Regular training sessions to keep our staff updated with the latest healthcare practices.',
    image: '/images/gallery/event-2.jpg',
    category: 'events'
  },
  {
    id: 10,
    title: 'Administrative Team',
    description: 'Our efficient administrative team ensuring smooth operations.',
    image: '/images/gallery/team-3.jpg',
    category: 'team'
  },
  {
    id: 11,
    title: 'Post-Operative Care',
    description: 'Specialized care for patients recovering from surgery.',
    image: '/images/gallery/patient-3.jpg',
    category: 'patients'
  },
  {
    id: 12,
    title: 'Community Awareness Program',
    description: 'Health awareness program conducted for local community members.',
    image: '/images/gallery/event-3.jpg',
    category: 'events'
  }
];

function GalleryPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
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

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Filter gallery items by selected category
  const filteredGallery = activeTab === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeTab);

  // Handle image click to open modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

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
            <Typography color="text.primary">Gallery</Typography>
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
            Our Gallery
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
            Explore our facilities, team, patient care, and events through our gallery. 
            These images showcase our commitment to providing exceptional healthcare services.
          </Typography>
        </Container>
      </Box>
      
      {/* Gallery Content */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          backgroundColor: theme.palette.background.default
        }}
        ref={ref}
      >
        <Container 
          maxWidth="xl"
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Category Tabs */}
          <Paper 
            elevation={1} 
            sx={{ 
              borderRadius: 2, 
              mb: 6,
              mx: 'auto',
              maxWidth: '100%',
              overflow: 'auto',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
              allowScrollButtonsMobile
              sx={{
                '.MuiTabs-indicator': {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            >
              {categories.map((category) => (
                <Tab 
                  key={category.id} 
                  label={category.label} 
                  value={category.id}
                  sx={{ 
                    fontWeight: 500,
                    py: 2,
                    px: 3
                  }}
                />
              ))}
            </Tabs>
          </Paper>
          
          {/* Gallery Grid */}
          <Grid container spacing={3}>
            {filteredGallery.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <motion.div variants={itemVariants}>
                  <Card 
                    sx={{ 
                      borderRadius: 2,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      height: '100%',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[10],
                        '& .MuiCardMedia-root': {
                          transform: 'scale(1.05)',
                        }
                      }
                    }}
                    onClick={() => handleImageClick(item)}
                  >
                    <Box sx={{ overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height="240"
                        image={item.image}
                        alt={item.title}
                        sx={{
                          transition: 'transform 0.5s ease',
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="h6" component="div" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          
          {/* Empty State */}
          {filteredGallery.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No images found in this category.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
      
      {/* Image Modal */}
      <Modal
        open={selectedImage !== null}
        onClose={handleCloseModal}
        aria-labelledby="gallery-modal"
        aria-describedby="gallery-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '90vw',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 0,
          outline: 'none',
        }}>
          {selectedImage && (
            <>
              <IconButton
                aria-label="close"
                onClick={handleCloseModal}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                  zIndex: 1,
                }}
              >
                <CloseIcon />
              </IconButton>
              <Box
                component="img"
                src={selectedImage.image}
                alt={selectedImage.title}
                sx={{
                  maxWidth: '100%',
                  maxHeight: 'calc(90vh - 100px)',
                  display: 'block',
                  objectFit: 'contain',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              />
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" component="h3" id="gallery-modal">
                  {selectedImage.title}
                </Typography>
                <Typography id="gallery-modal-description" sx={{ mt: 1 }}>
                  {selectedImage.description}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default GalleryPage;
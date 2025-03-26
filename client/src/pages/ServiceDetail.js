// client/src/pages/ServiceDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Breadcrumbs,
  Link,
  Skeleton,
  useTheme
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';

// Service data (in a real app, this would come from an API)
const servicesData = {
  'elderly-care': {
    id: 'elderly-care',
    title: 'Elderly Care',
    description: 'Compassionate assistance for seniors, including personal care, medication management, and companionship.',
    image: '/images/services/elderly-care.jpg',
    longDescription: `
      Our Elderly Care service provides comprehensive support for seniors in the comfort of their own homes. 
      We understand that aging can present unique challenges, and our compassionate caregivers are trained to 
      provide assistance that promotes independence, dignity, and quality of life.
    `,
    benefits: [
      'Personalized care plans tailored to individual needs',
      'Assistance with activities of daily living (ADLs)',
      'Medication management and reminders',
      'Companionship and emotional support',
      'Mobility assistance and fall prevention',
      'Coordination with doctors and healthcare providers',
      'Regular status updates to family members'
    ],
    services: [
      'Personal hygiene assistance (bathing, grooming, toileting)',
      'Meal preparation and feeding assistance',
      'Light housekeeping and laundry',
      'Transportation to medical appointments',
      'Grocery shopping and errands',
      'Recreational activities and mental stimulation',
      '24/7 care options available'
    ]
  },
  'post-operative': {
    id: 'post-operative',
    title: 'Post-Operative Care',
    description: 'Specialized care for patients recovering from surgery, ensuring proper healing and comfort.',
    image: '/images/services/post-operative.jpg',
    longDescription: `
      Our Post-Operative Care service is designed to support patients through the critical recovery period 
      following surgery. We work closely with your medical team to ensure proper healing, manage pain, 
      and prevent complications while you recover in the familiar environment of your home.
    `,
    benefits: [
      'Reduced risk of hospital readmission',
      'Faster recovery in comfortable home environment',
      'Personalized care tailored to your specific procedure',
      'Professional monitoring of recovery progress',
      'Proper wound care and infection prevention',
      'Pain management assistance',
      'Direct communication with your surgical team'
    ],
    services: [
      'Wound care and dressing changes',
      'Medication administration and management',
      'Assistance with prescribed exercises and physical therapy',
      'Monitoring vital signs and recovery progress',
      'Personal care assistance during recovery',
      'Nutritional support for optimal healing',
      'Transportation to follow-up appointments'
    ]
  },
  'chronic-disease': {
    id: 'chronic-disease',
    title: 'Chronic Disease Management',
    description: 'Ongoing support for patients with chronic conditions like diabetes, hypertension, and heart disease.',
    image: '/images/services/chronic-disease.jpg',
    longDescription: `
      Our Chronic Disease Management service provides specialized support for patients living with 
      ongoing health conditions. We help patients maintain their health, prevent complications, 
      and improve quality of life through consistent monitoring and care that follows their 
      physician's treatment plan.
    `,
    benefits: [
      'Reduced hospital visits and readmissions',
      'Better management of symptoms and disease progression',
      'Improved medication adherence',
      'Early detection of complications',
      'Coordination with specialists and primary care providers',
      'Support for lifestyle modifications',
      'Improved quality of life in familiar surroundings'
    ],
    services: [
      'Regular vital signs monitoring and health assessments',
      'Medication management and administration',
      'Dietary planning and nutrition support',
      'Disease-specific care protocols',
      'Symptom monitoring and management',
      'Education for patients and family caregivers',
      'Coordination of care between healthcare providers'
    ]
  },
  'physical-therapy': {
    id: 'physical-therapy',
    title: 'Physical Therapy',
    description: 'Rehabilitation services to improve mobility, strength, and function after injury or surgery.',
    image: '/images/services/physical-therapy.jpg',
    longDescription: `
      Our in-home Physical Therapy service brings professional rehabilitation directly to you. 
      Whether you're recovering from surgery, managing a chronic condition, or working to improve 
      mobility and strength, our licensed physical therapists create personalized treatment plans 
      to help you achieve your functional goals.
    `,
    benefits: [
      'Convenience of therapy in your home environment',
      'Personalized one-on-one attention',
      'Treatment adapted to your home setting for practical results',
      'Reduced transportation challenges and stress',
      'Faster recovery and improved function',
      'Prevention of future injuries',
      'Improved independence and quality of life'
    ],
    services: [
      'Comprehensive physical assessment and goal setting',
      'Therapeutic exercises and stretching routines',
      'Manual therapy techniques',
      'Gait and balance training',
      'Post-surgical rehabilitation',
      'Pain management strategies',
      'Home exercise program development and education'
    ]
  },
  'wound-care': {
    id: 'wound-care',
    title: 'Wound Care',
    description: 'Expert care for wound healing, including dressing changes, infection prevention, and pain management.',
    image: '/images/services/wound-care.jpg',
    longDescription: `
      Our specialized Wound Care service provides expert management for various types of wounds, 
      from surgical incisions to chronic ulcers. Our trained nurses use evidence-based techniques 
      to promote healing, prevent infection, and minimize scarring while keeping you comfortable 
      in your home.
    `,
    benefits: [
      'Professional assessment and treatment of wound conditions',
      'Reduced risk of infection and complications',
      'Specialized care for diabetic ulcers, pressure sores, and surgical wounds',
      'Consistent monitoring of healing progress',
      'Pain management during dressing changes',
      'Education on wound prevention and care',
      'Coordination with wound care specialists and physicians'
    ],
    services: [
      'Comprehensive wound assessment and documentation',
      'Sterile dressing changes and wound cleaning',
      'Specialized treatments (negative pressure therapy, compression therapy)',
      'Infection prevention and monitoring',
      'Nutritional guidance to support healing',
      'Management of wound care supplies',
      'Education for patients and caregivers'
    ]
  },
  'palliative-care': {
    id: 'palliative-care',
    title: 'Palliative Care',
    description: 'Comfort-focused care for patients with serious illnesses, addressing pain and symptom management.',
    image: '/images/services/palliative-care.jpg',
    longDescription: `
      Our Palliative Care service focuses on providing relief from the symptoms and stress of serious 
      illness. Our compassionate approach aims to improve quality of life for both the patient and 
      the family, addressing physical comfort, emotional well-being, and practical support needs.
    `,
    benefits: [
      'Improved pain and symptom management',
      'Enhanced quality of life and comfort',
      'Emotional and psychological support',
      'Reduced hospitalization and emergency room visits',
      'Support for family caregivers',
      'Coordination with medical providers',
      'Assistance with healthcare decisions and advance care planning'
    ],
    services: [
      'Expert pain and symptom management',
      'Personal care and comfort measures',
      'Emotional and spiritual support',
      'Assistance with activities of daily living',
      'Respite care for family caregivers',
      'Coordination of medical care and communications',
      'Support for end-of-life care when appropriate'
    ]
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const theme = useTheme();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      if (servicesData[serviceId]) {
        setService(servicesData[serviceId]);
      } else {
        // Handle invalid service ID
        console.error('Service not found:', serviceId);
      }
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [serviceId]);

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

  // Loading skeleton
  if (loading) {
    return (
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Breadcrumbs 
            separator={<NavigateNextIcon fontSize="small" />} 
            aria-label="breadcrumb"
            sx={{ mb: 4 }}
          >
            <Link component={RouterLink} to="/" color="inherit">
              Home
            </Link>
            <Link component={RouterLink} to="/#services" color="inherit">
              Services
            </Link>
            <Typography color="text.primary">
              <Skeleton width={100} />
            </Typography>
          </Breadcrumbs>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2, mb: 3 }} />
              <Skeleton variant="text" height={60} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={25} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={25} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={25} sx={{ mb: 3 }} />
              <Skeleton variant="rectangular" height={50} width={200} sx={{ borderRadius: 30 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 3 }} />
              <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  // Service not found
  if (!service) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Service Not Found
          </Typography>
          <Typography variant="body1" paragraph>
            The service you're looking for does not exist or has been removed.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/#services"
          >
            View All Services
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ py: 8 }}>
      <SEO title={`${service.title} | Life Care Home Nursing`} />
      <Container maxWidth="lg">
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 4 }}
        >
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/#services" color="inherit">
            Services
          </Link>
          <Typography color="text.primary">
            {service.title}
          </Typography>
        </Breadcrumbs>
        
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4}>
            {/* Left Column - Image and Basic Info */}
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Box
                  component="img"
                  src={service.image}
                  alt={service.title}
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: theme.shadows[4],
                    mb: 4,
                    height: 'auto',
                  }}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  gutterBottom
                  sx={{ fontWeight: 700 }}
                >
                  {service.title}
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography 
                  variant="body1" 
                  paragraph
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  {service.longDescription}
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/booking"
                  sx={{ 
                    mb: 4,
                    px: 4
                  }}
                >
                  Book This Service
                </Button>
              </motion.div>
            </Grid>
            
            {/* Right Column - Benefits and Services List */}
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Card 
                  elevation={1}
                  sx={{ mb: 4, height: 'auto' }}
                >
                  <CardContent>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 600,
                        mb: 3,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        pb: 2
                      }}
                    >
                      Benefits
                    </Typography>
                    
                    <List>
                      {service.benefits.map((benefit, index) => (
                        <ListItem key={index} disableGutters>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircleOutlineIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={benefit} 
                            primaryTypographyProps={{ 
                              variant: 'body2',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card 
                  elevation={1}
                  sx={{ height: 'auto' }}
                >
                  <CardContent>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 600,
                        mb: 3,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        pb: 2
                      }}
                    >
                      What We Provide
                    </Typography>
                    
                    <List>
                      {service.services.map((serviceItem, index) => (
                        <ListItem key={index} disableGutters>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircleOutlineIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={serviceItem}
                            primaryTypographyProps={{ 
                              variant: 'body2',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
          
          {/* Call to Action Section */}
          <Box 
            sx={{ 
              mt: 8, 
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 113, 227, 0.05)', 
              p: 4,
              borderRadius: 2,
              textAlign: 'center'
            }}
            component={motion.div}
            variants={itemVariants}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Need more information?
            </Typography>
            <Typography variant="body1" paragraph>
              Our team is ready to answer any questions and help you determine the best care solution for your needs.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/booking"
              >
                Book a Service
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/#contact"
              >
                Contact Us
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ServiceDetail;
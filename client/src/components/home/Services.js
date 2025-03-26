import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Services data
const servicesData = [
  {
    id: 'elderly-care',
    title: 'Elderly Care',
    description: 'Compassionate assistance for seniors, including personal care, medication management, and companionship.',
    image: '/images/elderly-care.jpg',
  },
  {
    id: 'post-operative',
    title: 'Post-Operative Care',
    description: 'Specialized care for patients recovering from surgery, ensuring proper healing and comfort.',
    image: '/images/post-operative.jpg',
  },
  {
    id: 'chronic-disease',
    title: 'Chronic Disease Management',
    description: 'Ongoing support for patients with chronic conditions like diabetes, hypertension, and heart disease.',
    image: '/images/chronic-disease.jpg',
  },
  {
    id: 'physical-therapy',
    title: 'Physical Therapy',
    description: 'Rehabilitation services to improve mobility, strength, and function after injury or surgery.',
    image: '/images/physical-therapy.jpg',
  },
  {
    id: 'tracheostomy-care',
    title: 'Tracheostomy Care',
    description: 'Expert Tracheostomy Care at Home – Safe, compassionate, and professional support for your loved ones.',
    image: '/images/wound-care.jpg',
  },
  {
    id: 'palliative-care',
    title: 'Palliative Care',
    description: 'Comfort-focused care for patients with serious illnesses, addressing pain and symptom management.',
    image: '/images/palliative-care.jpg',
  }
];

const Services = () => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.paper,
      }}
      id="services"
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              position: 'relative',
              display: 'inline-block',
            }}
          >
            Our Services
          </Typography>
          <Typography 
            variant="body1" 
            color="textSecondary" 
            sx={{ 
              maxWidth: '800px',
              mx: 'auto',
              mb: 2,
              px: 2
            }}
          >
            We offer a wide range of professional healthcare services tailored to meet the unique needs of each patient.
          </Typography>
        </Box>
        
        <Grid 
          container 
          spacing={4} 
          ref={ref}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {servicesData.map((service) => (
            <Grid item xs={12} sm={6} lg={4} key={service.id}>
              <motion.div variants={cardVariants}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.image}
                    alt={service.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button 
                      color="primary" 
                      component={RouterLink} 
                      to={`/services/${service.id}`}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Learn More
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary"
                      component={RouterLink}
                      to="/booking"
                      sx={{ ml: 'auto' }}
                    >
                      Book Now
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
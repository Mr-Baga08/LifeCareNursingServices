import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  IconButton,
  CircularProgress,
  useTheme 
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { contactService } from '../../api/contactService';
import { useToast } from '../../context/ToastContext';

// Validation schema for the contact form
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  subject: Yup.string()
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message is too short')
    .required('Message is required'),
});

const ContactSection = () => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { showToast } = useToast();

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

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // In a real app, this would send data to your backend
      // const response = await contactService.sendContactMessage(values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast({
        title: 'Message Sent',
        message: 'Thank you for your message. We will get back to you shortly.',
        type: 'success'
      });
      
      resetForm();
    } catch (error) {
      showToast({
        title: 'Message Failed',
        message: error.message || 'There was a problem sending your message. Please try again.',
        type: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f7f9fc',
      }}
      id="contact"
      ref={ref}
    >
      <Container 
        maxWidth="xl"
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Contact Us
          </Typography>
          <Typography 
            variant="body1" 
            color="textSecondary" 
            sx={{ 
              maxWidth: '800px',
              mx: 'auto',
              mb: 2
            }}
          >
            Have questions or need assistance? Reach out to us and we'll be happy to help.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <motion.div variants={itemVariants}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: { xs: 3, md: 4 },
                  borderRadius: 2,
                  height: '100%',
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h3" 
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 4 }}
                >
                  Get in Touch
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme.palette.primary.lighter,
                        color: theme.palette.primary.main,
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <LocationOnIcon />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Our Location
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Plot No -1611 , Gangapada, Gate, near Jatni, Bhubaneswar, Odisha 752054
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme.palette.primary.lighter,
                        color: theme.palette.primary.main,
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <PhoneIcon />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Phone Number
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        +91 95836 04949
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme.palette.primary.lighter,
                        color: theme.palette.primary.main,
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <EmailIcon />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Email Address
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        info@lifecarehomenursing.com
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex' }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme.palette.primary.lighter,
                        color: theme.palette.primary.main,
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      <AccessTimeIcon />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Working Hours
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        24/7 - We're always available for our patients
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Follow Us
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    sx={{
                      backgroundColor: '#3b5998',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#324b81',
                      },
                    }}
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      backgroundColor: '#1da1f2',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#1a91da',
                      },
                    }}
                    aria-label="Twitter"
                  >
                    <TwitterIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      backgroundColor: '#c32aa3',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#ad2590',
                      },
                    }}
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      backgroundColor: '#0a66c2',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#0958a7',
                      },
                    }}
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <motion.div variants={itemVariants}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: { xs: 3, md: 4 },
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h3" 
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 4 }}
                >
                  Send a Message
                </Typography>
                
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                  }}
                  validationSchema={ContactSchema}
                  onSubmit={handleSubmit}
                >
                  {({ 
                    values, 
                    errors, 
                    touched, 
                    handleChange, 
                    handleBlur, 
                    isSubmitting 
                  }) => (
                    <Form>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Full Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="subject"
                            name="subject"
                            label="Subject"
                            value={values.subject}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.subject && Boolean(errors.subject)}
                            helperText={touched.subject && errors.subject}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="message"
                            name="message"
                            label="Message"
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.message && Boolean(errors.message)}
                            helperText={touched.message && errors.message}
                            variant="outlined"
                            multiline
                            rows={5}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                            sx={{ minWidth: 150 }}
                          >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Google Map embed would go here */}
        <Box 
          sx={{ 
            mt: 6, 
            height: '400px', 
            borderRadius: 2, 
            overflow: 'hidden',
            boxShadow: theme.shadows[2]
          }}
          component={motion.div}
          variants={itemVariants}
        >
          <iframe 
            src="https://maps.google.com/maps?q=20.20683170068676,85.69163380552267&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Life Care Home Nursing Location"
            ></iframe>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactSection;
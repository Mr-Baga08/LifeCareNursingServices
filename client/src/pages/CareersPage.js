import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  Button,
  Breadcrumbs,
  Link,
  useTheme, 
  Divider,
  Alert,
  CircularProgress,
  Skeleton
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useToast } from '../context/ToastContext';
import SEO from '../components/ui/SEO';

// Validation schema for careers form
const CareerFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Full name is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  address: Yup.string()
    .required('Address is required'),
  position: Yup.string()
    .required('Please select a position'),
  experience: Yup.string()
    .required('Please select experience level'),
  aadharNumber: Yup.string()
    .matches(/^[0-9]{12}$/, 'Aadhar number must be 12 digits')
    .required('Aadhar number is required'),
  resume: Yup.mixed()
    .required('Resume is required'),
  message: Yup.string()
});

// Available positions
const positions = [
  { value: 'nurse', label: 'Registered Nurse' },
  { value: 'caregiver', label: 'Caregiver' },
  { value: 'physio', label: 'Physiotherapist' },
  { value: 'admin', label: 'Administrative Staff' },
  { value: 'other', label: 'Other Healthcare Professional' }
];

// Experience levels
const experienceLevels = [
  { value: 'fresher', label: 'Fresher (0-1 years)' },
  { value: 'junior', label: '1-3 years' },
  { value: 'mid', label: '3-5 years' },
  { value: 'senior', label: '5+ years' }
];

const CareersPage = () => {
  const theme = useTheme();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
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
      // In a real app, this would create a FormData object and send it to your API
      // const formData = new FormData();
      // Object.keys(values).forEach(key => {
      //   if (key === 'resume') {
      //     formData.append(key, values[key]);
      //   } else {
      //     formData.append(key, values[key]);
      //   }
      // });
      
      // const response = await api.post('/careers/apply', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast({
        title: 'Application Successful',
        message: 'Thank you for your application. We will contact you soon for the next steps.',
        type: 'success'
      });
      
      resetForm();
    } catch (error) {
      showToast({
        title: 'Application Failed',
        message: error.message || 'There was a problem submitting your application. Please try again.',
        type: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="main">
      <SEO title="Careers | Life Care Home Nursing" />
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
            <Typography color="text.primary">Careers</Typography>
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
            Join Our Team
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
            Life Care Home Nursing is looking for passionate healthcare professionals who are committed to providing
            exceptional care. Join our team and make a difference in people's lives.
          </Typography>
        </Container>
      </Box>
      
      {/* Main Content */}
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
          <Grid container spacing={4}>
            {/* Left Column - Career Information */}
            <Grid item xs={12} md={5} lg={4}>
              <motion.div variants={itemVariants}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3, 
                    mb: 4, 
                    borderRadius: 2,
                    height: '100%'
                  }}
                >
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    Why Work With Us?
                  </Typography>
                  
                  <Typography variant="body2" paragraph color="text.secondary">
                    Life Care Home Nursing offers a supportive and rewarding work environment where healthcare professionals can grow and thrive while making a meaningful impact.
                  </Typography>
                  
                  <Box sx={{ my: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Benefits We Offer
                    </Typography>
                    
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="body2" paragraph sx={{ position: 'relative', pl: 2 }}>
                        <Box component="span" sx={{ position: 'absolute', left: -10, top: 6, width: 6, height: 6, backgroundColor: theme.palette.primary.main, borderRadius: '50%' }}></Box>
                        Competitive salary and benefits package
                      </Typography>
                      
                      <Typography variant="body2" paragraph sx={{ position: 'relative', pl: 2 }}>
                        <Box component="span" sx={{ position: 'absolute', left: -10, top: 6, width: 6, height: 6, backgroundColor: theme.palette.primary.main, borderRadius: '50%' }}></Box>
                        Flexible scheduling options
                      </Typography>
                      
                      <Typography variant="body2" paragraph sx={{ position: 'relative', pl: 2 }}>
                        <Box component="span" sx={{ position: 'absolute', left: -10, top: 6, width: 6, height: 6, backgroundColor: theme.palette.primary.main, borderRadius: '50%' }}></Box>
                        Professional development opportunities
                      </Typography>
                      
                      <Typography variant="body2" paragraph sx={{ position: 'relative', pl: 2 }}>
                        <Box component="span" sx={{ position: 'absolute', left: -10, top: 6, width: 6, height: 6, backgroundColor: theme.palette.primary.main, borderRadius: '50%' }}></Box>
                        Supportive team environment
                      </Typography>
                      
                      <Typography variant="body2" paragraph sx={{ position: 'relative', pl: 2 }}>
                        <Box component="span" sx={{ position: 'absolute', left: -10, top: 6, width: 6, height: 6, backgroundColor: theme.palette.primary.main, borderRadius: '50%' }}></Box>
                        Career advancement paths
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Current Openings
                  </Typography>
                  
                  <Box sx={{ pl: 2 }}>
                    <Typography variant="body2" paragraph sx={{ position: 'relative', pl: 2, fontWeight: 500 }}>
                      <Box component="span" sx={{ position: 'absolute', left: -10, top: 6, width: 6, height: 6, backgroundColor: theme.palette.primary.main, borderRadius: '50%' }}></Box>
                      Registered Nurses
                    </Typography>
                    
                    <Typography variant="body2" paragraph sx={{ position: 'relative', pl: 2, fontWeight: 500 }}>
                      <Box component="span" sx={{ position: 'absolute', left: -10, top: 6, width: 6, height: 6, backgroundColor: theme.palette.primary.main, borderRadius: '50%' }}></Box>
                      Caregivers
                    </Typography>
                    
                    <Typography variant="body2" paragraph sx={{ position: 'relative', pl: 2, fontWeight: 500 }}>
                      <Box component="span" sx={{ position: 'absolute', left: -10, top: 6, width: 6, height: 6, backgroundColor: theme.palette.primary.main, borderRadius: '50%' }}></Box>
                      Physiotherapists
                    </Typography>
                    
                    <Typography variant="body2" paragraph sx={{ position: 'relative', pl: 2, fontWeight: 500 }}>
                      <Box component="span" sx={{ position: 'absolute', left: -10, top: 6, width: 6, height: 6, backgroundColor: theme.palette.primary.main, borderRadius: '50%' }}></Box>
                      Administrative Staff
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mt: 4 }}>
                    <Alert 
                      severity="info" 
                      sx={{ 
                        borderRadius: 2,
                        backgroundColor: theme.palette.info.lighter,
                        color: theme.palette.info.darker,
                        border: `1px solid ${theme.palette.info.light}`,
                      }}
                    >
                      <Typography variant="body2">
                        Have questions about our career opportunities? Contact our HR department at <strong>+91 95836 04949</strong> or email us at <strong>careers@lifecarehomenursing.com</strong>
                      </Typography>
                    </Alert>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
            
            {/* Right Column - Application Form */}
            <Grid item xs={12} md={7} lg={8}>
              <motion.div variants={itemVariants}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: { xs: 3, md: 4 },
                    borderRadius: 2,
                  }}
                >
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 3 }}
                  >
                    Apply Now
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary' }}>
                    Fill out the form below to apply for a position with Life Care Home Nursing. We'll review your application and get back to you soon.
                  </Typography>
                  
                  <Formik
                    initialValues={{
                      name: '',
                      phone: '',
                      email: '',
                      address: '',
                      position: '',
                      experience: '',
                      aadharNumber: '',
                      resume: null,
                      message: ''
                    }}
                    validationSchema={CareerFormSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ 
                      values, 
                      errors, 
                      touched, 
                      handleChange, 
                      handleBlur,
                      setFieldValue,
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
                              id="phone"
                              name="phone"
                              label="Phone Number"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.phone && Boolean(errors.phone)}
                              helperText={touched.phone && errors.phone}
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
                          
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              id="aadharNumber"
                              name="aadharNumber"
                              label="Aadhar Card Number"
                              value={values.aadharNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.aadharNumber && Boolean(errors.aadharNumber)}
                              helperText={touched.aadharNumber && errors.aadharNumber}
                              variant="outlined"
                            />
                          </Grid>
                          
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              id="address"
                              name="address"
                              label="Home Address"
                              value={values.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.address && Boolean(errors.address)}
                              helperText={touched.address && errors.address}
                              variant="outlined"
                              multiline
                              rows={2}
                            />
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <TextField
                              select
                              fullWidth
                              id="position"
                              name="position"
                              label="Position Applied For"
                              value={values.position}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.position && Boolean(errors.position)}
                              helperText={touched.position && errors.position}
                              variant="outlined"
                              SelectProps={{
                                native: true,
                              }}
                            >
                              <option value=""></option>
                              {positions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <TextField
                              select
                              fullWidth
                              id="experience"
                              name="experience"
                              label="Experience Level"
                              value={values.experience}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.experience && Boolean(errors.experience)}
                              helperText={touched.experience && errors.experience}
                              variant="outlined"
                              SelectProps={{
                                native: true,
                              }}
                            >
                              <option value=""></option>
                              {experienceLevels.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          </Grid>
                          
                          <Grid item xs={12}>
                            <Box sx={{ mb: 1 }}>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Upload Resume/CV (PDF or DOC format)
                              </Typography>
                              
                              <Box
                                component="label"
                                htmlFor="resume"
                                sx={{
                                  display: 'block',
                                  border: `1px dashed ${touched.resume && errors.resume ? theme.palette.error.main : theme.palette.divider}`,
                                  borderRadius: 1,
                                  p: 3,
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                  },
                                }}
                              >
                                <input
                                  id="resume"
                                  name="resume"
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={(event) => {
                                    setFieldValue("resume", event.currentTarget.files[0]);
                                  }}
                                  style={{ display: 'none' }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                  {values.resume ? values.resume.name : 'Click to browse or drag and drop your file here'}
                                </Typography>
                              </Box>
                              
                              {touched.resume && errors.resume && (
                                <Typography variant="caption" color="error">
                                  {errors.resume}
                                </Typography>
                              )}
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              id="message"
                              name="message"
                              label="Additional Information (Optional)"
                              value={values.message}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.message && Boolean(errors.message)}
                              helperText={touched.message && errors.message}
                              variant="outlined"
                              multiline
                              rows={4}
                            />
                          </Grid>
                          
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              size="large"
                              disabled={isSubmitting}
                              sx={{ mt: 2 }}
                              startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                            >
                              {isSubmitting ? 'Submitting...' : 'Submit Application'}
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
          
          {/* Work Environment Section */}
          <Box sx={{ mt: 8 }}>
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom
                sx={{ 
                  textAlign: 'center',
                  fontWeight: 700,
                  mb: 5
                }}
              >
                Our Work Environment
              </Typography>
            </motion.div>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <motion.div variants={itemVariants}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      borderRadius: 2,
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/careers/team-support.jpg"
                      alt="Supportive team environment"
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover'
                      }}
                    />
                    <Box sx={{ p: 3, flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        Supportive Team
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Work alongside dedicated professionals who support each other and collaborate to provide the best care for our patients.
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <motion.div variants={itemVariants}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      borderRadius: 2,
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/careers/training.jpg"
                      alt="Professional development"
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover'
                      }}
                    />
                    <Box sx={{ p: 3, flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        Continuous Learning
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        We invest in our team's growth through regular training, workshops, and opportunities to learn new skills and advance your career.
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <motion.div variants={itemVariants}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      borderRadius: 2,
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/careers/work-life-balance.jpg"
                      alt="Work-life balance"
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover'
                      }}
                    />
                    <Box sx={{ p: 3, flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        Work-Life Balance
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        We understand the importance of work-life balance and offer flexible scheduling options to help you maintain it.
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default CareersPage;
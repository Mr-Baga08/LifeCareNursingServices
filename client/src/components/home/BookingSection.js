import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  TextField, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  Button, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
  useTheme
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { format, addDays } from 'date-fns';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { bookingService } from '../../api/bookingService';
import { useToast } from '../../context/ToastContext';

// Pricing data - this would ideally come from your backend
const pricingData = {
  services: {
    'elderly_care': { basePrice: 800, title: 'Elderly Care' },
    'post_op': { basePrice: 1000, title: 'Post-Operative Care' },
    'chronic': { basePrice: 900, title: 'Chronic Disease Management' },
    'physio': { basePrice: 1200, title: 'Physical Therapy' },
    'wound': { basePrice: 700, title: 'Wound Care' },
    'palliative': { basePrice: 1100, title: 'Palliative Care' }
  },
  durationMultipliers: {
    '4': 0.5,
    '8': 1,
    '12': 1.4,
    '24': 2.5
  }
};

// Validation schema for the booking form
const BookingSchema = Yup.object().shape({
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
  service: Yup.string()
    .required('Please select a service'),
  duration: Yup.string()
    .required('Please select duration of care'),
  startDate: Yup.date()
    .min(new Date(), 'Start date cannot be in the past')
    .required('Start date is required'),
  days: Yup.number()
    .min(1, 'Minimum 1 day required')
    .max(365, 'Maximum 365 days allowed')
    .required('Number of days is required'),
  notes: Yup.string()
});

const BookingSection = () => {
  const theme = useTheme();
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
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

  // Calculate price based on form values
  const calculatePrice = (values) => {
    if (!values.service || !values.duration || !values.days) {
      return null;
    }

    const { basePrice } = pricingData.services[values.service];
    const durationMultiplier = pricingData.durationMultipliers[values.duration];
    const days = parseInt(values.days);

    const totalPrice = basePrice * durationMultiplier * days;
    return Math.round(totalPrice);
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // In a real app, this would send data to your backend
      // const response = await bookingService.createBooking(values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast({
        title: 'Booking Successful',
        message: 'We have received your booking request. Our team will contact you shortly to confirm.',
        type: 'success'
      });
      
      resetForm();
      setCalculatedPrice(null);
    } catch (error) {
      showToast({
        title: 'Booking Failed',
        message: error.message || 'There was a problem with your booking. Please try again.',
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
        backgroundColor: theme.palette.background.default
      }}
      id="booking"
      ref={ref}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
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
              Book Our Services
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
              Fill out the form below to book our services and get a price quotation based on your needs.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={7} lg={8}>
              <motion.div variants={itemVariants}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: { xs: 3, md: 4 },
                    borderRadius: 2,
                    height: '100%'
                  }}
                >
                  <Formik
                    initialValues={{
                      name: '',
                      phone: '',
                      email: '',
                      address: '',
                      service: '',
                      duration: '',
                      startDate: new Date(),
                      days: 1,
                      notes: ''
                    }}
                    validationSchema={BookingSchema}
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
                          <Grid item xs={12}>
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
                            <FormControl fullWidth error={touched.service && Boolean(errors.service)}>
                              <InputLabel id="service-label">Service Type</InputLabel>
                              <Select
                                labelId="service-label"
                                id="service"
                                name="service"
                                value={values.service}
                                label="Service Type"
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <MenuItem value="">Select a service</MenuItem>
                                <MenuItem value="elderly_care">Elderly Care</MenuItem>
                                <MenuItem value="post_op">Post-Operative Care</MenuItem>
                                <MenuItem value="chronic">Chronic Disease Management</MenuItem>
                                <MenuItem value="physio">Physical Therapy</MenuItem>
                                <MenuItem value="wound">Wound Care</MenuItem>
                                <MenuItem value="palliative">Palliative Care</MenuItem>
                              </Select>
                              {touched.service && errors.service && (
                                <Typography variant="caption" color="error">
                                  {errors.service}
                                </Typography>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={touched.duration && Boolean(errors.duration)}>
                              <InputLabel id="duration-label">Duration (Hours/Day)</InputLabel>
                              <Select
                                labelId="duration-label"
                                id="duration"
                                name="duration"
                                value={values.duration}
                                label="Duration (Hours/Day)"
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <MenuItem value="">Select hours</MenuItem>
                                <MenuItem value="4">4 Hours</MenuItem>
                                <MenuItem value="8">8 Hours</MenuItem>
                                <MenuItem value="12">12 Hours</MenuItem>
                                <MenuItem value="24">24 Hours (Full Day)</MenuItem>
                              </Select>
                              {touched.duration && errors.duration && (
                                <Typography variant="caption" color="error">
                                  {errors.duration}
                                </Typography>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <DatePicker
                              label="Start Date"
                              value={values.startDate}
                              onChange={(date) => setFieldValue('startDate', date)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  error={touched.startDate && Boolean(errors.startDate)}
                                  helperText={touched.startDate && errors.startDate}
                                />
                              )}
                              disablePast
                              minDate={new Date()}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              id="days"
                              name="days"
                              label="Number of Days"
                              type="number"
                              InputProps={{ inputProps: { min: 1, max: 365 } }}
                              value={values.days}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.days && Boolean(errors.days)}
                              helperText={touched.days && errors.days}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              id="notes"
                              name="notes"
                              label="Special Requirements/Notes"
                              value={values.notes}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.notes && Boolean(errors.notes)}
                              helperText={touched.notes && errors.notes}
                              variant="outlined"
                              multiline
                              rows={3}
                            />
                          </Grid>
                          
                          {calculatedPrice !== null && (
                            <Grid item xs={12}>
                              <Alert 
                                severity="info" 
                                sx={{ 
                                  mt: 2, 
                                  backgroundColor: theme.palette.primary.lighter,
                                  '.MuiAlert-icon': {
                                    color: theme.palette.primary.main
                                  }
                                }}
                              >
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  Estimated Price: ₹{calculatedPrice}
                                </Typography>
                                <Typography variant="body2">
                                  This is an estimated price based on your selections. The final price may vary based on specific requirements.
                                </Typography>
                              </Alert>
                            </Grid>
                          )}
                          
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                  setIsCalculating(true);
                                  // Simulate calculation delay
                                  setTimeout(() => {
                                    setCalculatedPrice(calculatePrice(values));
                                    setIsCalculating(false);
                                  }, 500);
                                }}
                                disabled={isCalculating || isSubmitting || !values.service || !values.duration || !values.days}
                                startIcon={isCalculating ? <CircularProgress size={20} /> : null}
                              >
                                {isCalculating ? 'Calculating...' : 'Calculate Price'}
                              </Button>
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                              >
                                {isSubmitting ? 'Submitting...' : 'Book Now'}
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </Paper>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={5} lg={4}>
              <motion.div variants={itemVariants}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: { xs: 3, md: 4 },
                    borderRadius: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 3 }}
                  >
                    Why Choose Our Home Nursing Services?
                  </Typography>
                  
                  <Typography variant="body2" paragraph>
                    Life Care Home Nursing provides personalized care plans tailored to each patient's unique needs. Our services offer numerous benefits:
                  </Typography>
                  
                  <List sx={{ py: 1 }}>
                    <ListItem disableGutters sx={{ pb: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Personalized care in the comfort of your own home" />
                    </ListItem>
                    <ListItem disableGutters sx={{ pb: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Skilled and compassionate healthcare professionals" />
                    </ListItem>
                    <ListItem disableGutters sx={{ pb: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Flexible scheduling to accommodate your needs" />
                    </ListItem>
                    <ListItem disableGutters sx={{ pb: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Regular progress reports and care plan updates" />
                    </ListItem>
                    <ListItem disableGutters sx={{ pb: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Coordination with doctors and other healthcare providers" />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Emergency response and 24/7 support" />
                    </ListItem>
                  </List>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      Have Questions?
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Contact us at <strong>+91 99373 31708</strong> or book a consultation through our form.
                    </Typography>
                    <Alert 
                      severity="success" 
                      icon={false}
                      sx={{ 
                        borderRadius: 2,
                        backgroundColor: theme.palette.success.lighter,
                        color: theme.palette.success.darker,
                        border: `1px solid ${theme.palette.success.light}`,
                        mt: 2
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        We typically respond within 2 hours during business hours.
                      </Typography>
                    </Alert>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </LocalizationProvider>
    </Box>
  );
};

export default BookingSection;
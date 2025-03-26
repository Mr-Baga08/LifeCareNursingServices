import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent,
  Avatar,
  Button,
  useTheme 
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Team members data
const teamMembers = [
  {
    "id": 1,
    "name": "Coming Soon",
    "position": "Our Medical Experts",
    "image": "/images/team/coming-soon.jpg",
    "description": "Our dedicated team of medical professionals will be announced soon. Stay tuned!"
}
,
  {
    id: 2,
    name: 'Priya Patel',
    position: 'Head Nurse',
    image: '/images/team/nurse-1.jpg',
    description: 'Priya leads our nursing team with her extensive experience in critical care and home healthcare management.'
  },
  {
    id: 3,
    name: 'Ankit Mishra',
    position: 'Physiotherapist',
    image: '/images/team/physio-1.jpg',
    description: 'Ankit specializes in rehabilitation therapies for elderly patients and post-surgical recovery.'
  }
];

const About = () => {
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
        backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f7f9fc',
      }}
      id="about"
      ref={ref}
    >
      <Container 
        maxWidth="xl"
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <Grid container spacing={8} alignItems="center">
          {/* About Text Section */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                 Healthcare at Your Home That You Can Trust
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                paragraph
                sx={{ mb: 4 }}
              >
                Life Care Home Nursing is a premier healthcare provider in Bhubaneswar, dedicated to delivering exceptional home nursing services to patients of all ages. With our team of highly qualified healthcare professionals, we ensure that our clients receive personalized care that meets their unique needs.
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                paragraph
                sx={{ mb: 4 }}
              >
                We understand that recovering at home can significantly improve a patient's well-being and quality of life. Our mission is to provide compassionate, reliable, and dedicated healthcare services in the comfort of the patient's home environment.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 2 }}
                href="/about-us"
              >
                Learn More About Us
              </Button>
            </motion.div>
          </Grid>
          
          {/* About Image Section */}
          <Grid item xs={12} md={6}>
            <motion.div 
              variants={itemVariants}
              style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src="/images/about-image.jpg"
                alt="Life Care Team"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: theme.shadows[10],
                  zIndex: 2,
                }}
              />
              {/* Decorative elements */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '60%',
                  height: '60%',
                  backgroundColor: theme.palette.primary.main,
                  opacity: 0.05,
                  borderRadius: 4,
                  right: { md: -20 },
                  bottom: { md: -20 },
                  zIndex: 1,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  width: '150px',
                  height: '150px',
                  backgroundColor: theme.palette.secondary.main,
                  opacity: 0.1,
                  borderRadius: '50%',
                  left: { md: -20 },
                  top: { md: -20 },
                  zIndex: 1,
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Features Section */}
        <Box sx={{ mt: 10 }}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={itemVariants}>
                {/* <Card 
                  elevation={1}
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[10],
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.lighter,
                        color: theme.palette.primary.main,
                        width: 56,
                        height: 56,
                        mb: 2,
                      }}
                    >
                      <MedicalServicesIcon />
                    </Avatar>
                    {/* <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      Qualified Professionals
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Our team consists of certified nurses and caregivers with extensive experience in their respective fields.
                    </Typography> }
                  </CardContent>
                </Card> }
              </motion.div>
            </Grid> */}
            
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={itemVariants}>
                <Card 
                  elevation={1}
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[10],
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.lighter,
                        color: theme.palette.primary.main,
                        width: 56,
                        height: 56,
                        mb: 2,
                      }}
                    >
                      <AccessTimeFilledIcon />
                    </Avatar>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      24/7 Availability
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Round-the-clock care services available for emergencies and continuous care needs.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={itemVariants}>
                <Card 
                  elevation={1}
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[10],
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.lighter,
                        color: theme.palette.primary.main,
                        width: 56,
                        height: 56,
                        mb: 2,
                      }}
                    >
                      <VolunteerActivismIcon />
                    </Avatar>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      Compassionate Care
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Providing empathetic and patient-centered care for every individual we serve.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={itemVariants}>
                <Card 
                  elevation={1}
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[10],
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.lighter,
                        color: theme.palette.primary.main,
                        width: 56,
                        height: 56,
                        mb: 2,
                      }}
                    >
                      <VerifiedUserIcon />
                    </Avatar>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      Safe & Trustworthy
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Thoroughly vetted staff and strict adherence to healthcare protocols and standards.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
        
        {/* Team Section */}
        <Box sx={{ mt: 12 }}>
          <motion.div variants={itemVariants}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{ 
                textAlign: 'center',
                fontWeight: 700,
                mb: 1
              }}
            >
              Meet Our Team
            </Typography>
            <Typography 
              variant="body1" 
              color="textSecondary" 
              sx={{ 
                textAlign: 'center',
                maxWidth: '700px',
                mx: 'auto',
                mb: 6
              }}
            >
              Our experienced healthcare professionals are dedicated to providing the highest quality of care.
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid key={member.id} item xs={12} sm={6} md={4}>
                <motion.div variants={itemVariants}>
                  <Card 
                    elevation={1}
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[10],
                      }
                    }}
                  >
                    <Box
                      sx={{
                        height: 250,
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        component="img"
                        src={member.image}
                        alt={member.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          }
                        }}
                      />
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        gutterBottom
                        sx={{ fontWeight: 600 }}
                      >
                        {member.name}
                      </Typography>
                      <Typography 
                        variant="subtitle2" 
                        color="primary" 
                        gutterBottom
                        sx={{ mb: 2 }}
                      >
                        {member.position}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {member.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
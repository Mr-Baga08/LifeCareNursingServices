import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Avatar, 
  Card, 
  CardContent, 
  Rating, 
  IconButton,
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { reviewService } from '../../api/reviewService';

// Custom arrow components for the carousel
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        left: { xs: '10px', md: '-40px' },
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        backgroundColor: 'background.paper',
        boxShadow: 2,
        '&:hover': {
          backgroundColor: 'primary.main',
          color: 'white',
        },
      }}
    >
      <ArrowBackIosNewIcon fontSize="small" />
    </IconButton>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        right: { xs: '10px', md: '-40px' },
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        backgroundColor: 'background.paper',
        boxShadow: 2,
        '&:hover': {
          backgroundColor: 'primary.main',
          color: 'white',
        },
      }}
    >
      <ArrowForwardIosIcon fontSize="small" />
    </IconButton>
  );
};

// Sample reviews data (you would fetch this from API in production)
const sampleReviews = [
  {
    id: 1,
    name: 'Sambit Sahoo',
    date: '2 weeks ago',
    rating: 5,
    content: 'We are extremely grateful for the dedicated and compassionate care provided by the life care home nursing staff. Their professionalism, patience, and kindness made a significant difference in our loved one\'s recovery. They were attentive to all needs.',
    avatar: '/images/avatars/avatar-1.jpg',
  },
  {
    id: 2,
    name: 'Apala Aju',
    date: '4 hours ago',
    rating: 5,
    content: 'Excellent service. The nurses were very professional and caring. Would highly recommend their services.',
    avatar: '/images/avatars/avatar-2.jpg',
  },
  {
    id: 3,
    name: 'Lakhan Mundu',
    date: '4 hours ago',
    rating: 5,
    content: 'Nice Service ❤️ Very satisfied with the care provided to my father.',
    avatar: '/images/avatars/avatar-3.jpg',
  },
  {
    id: 4,
    name: 'Dr. Chandan Kumar',
    date: 'a month ago',
    rating: 5,
    content: 'Great service - lifecare. As a doctor, I can vouch for their professionalism and clinical expertise.',
    avatar: '/images/avatars/avatar-4.jpg',
  },
  {
    id: 5,
    name: 'Prakash Pradhan',
    date: 'a month ago',
    rating: 5,
    content: 'Best home nursing in Bhubaneswar. They take care of my mother like their own family member.',
    avatar: '/images/avatars/avatar-5.jpg',
  },
  {
    id: 6,
    name: 'Pradeep Milu',
    date: 'a month ago',
    rating: 5,
    content: 'Great Home Nursing in Odisha 🙂🙂 Highly recommended for elderly care.',
    avatar: '/images/avatars/avatar-6.jpg',
  },
  {
    id: 7,
    name: 'Sarala Pattanayak',
    date: '7 months ago',
    rating: 5,
    content: 'Care like family member. Dedicated staffs. They are available 24/7 for any emergency.',
    avatar: '/images/avatars/avatar-7.jpg',
  },
];

const Reviews = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const [reviews, setReviews] = useState(sampleReviews);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Uncomment this to fetch reviews from API in production
  /*
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const data = await reviewService.getReviews();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);
  */

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : isTablet ? 2 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
      }
    }
  };

  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f7f9fc',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.main,
          opacity: 0.05,
          top: '-100px',
          left: '-100px',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.main,
          opacity: 0.05,
          bottom: '-100px',
          right: '-100px',
        },
      }}
      id="reviews"
      ref={ref}
    >
      <Container 
        maxWidth="xl"
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <Box sx={{ textAlign: 'center', mb: 8, position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Client Reviews
          </Typography>
          <Typography 
            variant="body1" 
            color="textSecondary" 
            sx={{ 
              maxWidth: '700px',
              mx: 'auto',
              mb: 2
            }}
          >
            Hear what our clients have to say about our services and commitment to quality care.
          </Typography>
        </Box>
        
        <Box sx={{ px: { xs: 2, md: 4 }, position: 'relative', zIndex: 1 }}>
          <Slider {...sliderSettings}>
            {reviews.map((review) => (
              <Box key={review.id} sx={{ p: 2 }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    pt: 2,
                    minHeight: '300px'
                  }}
                  elevation={2}
                >
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: '15px', 
                      right: '15px',
                      color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      transform: 'rotate(180deg)',
                    }}
                  >
                    <FormatQuoteIcon sx={{ fontSize: '4rem' }} />
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        src={review.avatar} 
                        alt={review.name}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6" component="h3" gutterBottom={false}>
                          {review.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {review.date}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Rating 
                      value={review.rating} 
                      readOnly 
                      precision={0.5}
                      sx={{ mb: 2 }}
                    />
                    
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {review.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default Reviews;
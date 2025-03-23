import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// FAQ data
const faqData = [
  {
    id: 'faq-1',
    question: 'What qualifications do your nurses and caregivers have?',
    answer: 'Our team consists of registered nurses (RNs), licensed practical nurses (LPNs), and trained caregivers. All staff members undergo thorough background checks, verification of credentials, and regular training to ensure they meet our high standards of care.'
  },
  {
    id: 'faq-2',
    question: 'How do you match caregivers with patients?',
    answer: 'We take into account the patient\'s medical needs, personality, preferences, and the specific skills required for their care. We then match them with a caregiver who has the appropriate experience and whose personality will be compatible with the patient.'
  },
  {
    id: 'faq-3',
    question: 'What happens if my regular caregiver is unavailable?',
    answer: 'We maintain a backup system to ensure continuity of care. If your regular caregiver is unavailable, we\'ll arrange for a qualified substitute who will be briefed on your care plan. We strive to minimize disruptions and maintain consistent care.'
  },
  {
    id: 'faq-4',
    question: 'Are your services available 24/7?',
    answer: 'Yes, we provide round-the-clock care services. Whether you need care during the day, night, weekends, or holidays, our team is available to assist you. We offer flexible scheduling options from a few hours a day to 24/7 continuous care.'
  },
  {
    id: 'faq-5',
    question: 'How soon can services begin after I contact you?',
    answer: 'In most cases, we can begin services within 24-48 hours of initial contact. For emergency situations, we can often arrange for care even sooner. Our intake process includes an assessment of needs and the development of a customized care plan.'
  },
  {
    id: 'faq-6',
    question: 'What areas do you serve?',
    answer: 'We provide services throughout Bhubaneswar and surrounding areas. Please contact us to confirm service availability in your specific location within Odisha.'
  },
  {
    id: 'faq-7',
    question: 'How are your prices determined?',
    answer: 'Our pricing is based on several factors, including the type of care needed, duration of service, level of caregiver expertise required, and any specialized equipment or procedures. After assessing your needs, we provide a detailed quote with no hidden fees.'
  },
  {
    id: 'faq-8',
    question: 'Do you accept insurance?',
    answer: 'We work with various insurance providers, but coverage depends on your specific policy. We can help you understand your benefits and submit necessary documentation. For patients without coverage, we offer competitive private pay rates.'
  }
];

const FaqSection = () => {
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
        backgroundColor: theme.palette.background.paper,
      }}
      id="faq"
      ref={ref}
    >
      <Container 
        maxWidth="lg"
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
            Frequently Asked Questions
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
            Find answers to common questions about our home nursing services.
          </Typography>
        </Box>
        
        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          {faqData.map((faq, index) => (
            <motion.div 
              key={faq.id} 
              variants={itemVariants}
              custom={index}
            >
              <Accordion 
                sx={{ 
                  mb: 2,
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: theme.shadows[1],
                  '&:before': {
                    display: 'none',
                  },
                  borderRadius: '8px !important',
                  overflow: 'hidden',
                }}
                elevation={1}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${faq.id}-content`}
                  id={`${faq.id}-header`}
                  sx={{ 
                    minHeight: 56,
                    '&.Mui-expanded': {
                      minHeight: 56,
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(0, 0, 0, 0.02)',
                    },
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="textSecondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FaqSection;
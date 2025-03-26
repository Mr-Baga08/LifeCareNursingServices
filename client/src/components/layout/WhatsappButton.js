import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Tooltip, 
  Zoom,
  Fade,
  useTheme
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const WhatsappButton = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  // Updated Phone number for WhatsApp (without +)
  const phoneNumber = '919583604949';
  
  const toggleChat = () => {
    setOpen(!open);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);
      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      setMessage('');
      setOpen(false);
    }
  };
  
  return (
    <>
      {/* WhatsApp Chat Popup */}
      <Fade in={open}>
        <Paper
          elevation={6}
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 30,
            width: { xs: 'calc(100% - 60px)', sm: 350 },
            maxWidth: '100%',
            borderRadius: 2,
            overflow: 'hidden',
            zIndex: 1000,
            display: open ? 'flex' : 'none',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: '#25D366',
              color: 'white',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <WhatsAppIcon sx={{ mr: 1 }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Life Care Home Nursing
                </Typography>
                <Typography variant="caption">
                  Typically replies within 10 minutes
                </Typography>
              </Box>
            </Box>
            <IconButton size="small" onClick={toggleChat} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          {/* Chat content */}
          <Box sx={{ p: 2, backgroundColor: '#E5DDD5' }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: '4px 20px 20px 20px',
                maxWidth: '80%',
                boxShadow: 1,
                position: 'relative',
                mb: 2,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: -8,
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '0 0 10px 10px',
                  borderColor: 'transparent transparent #fff transparent',
                  transform: 'rotate(45deg)',
                }
              }}
            >
              <Typography variant="body2">
                👋 Hello! How can we help you today? Feel free to send us a message, and our team will get back to you quickly.
              </Typography>
            </Paper>
          </Box>
          
          {/* Message input */}
          <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={!message.trim()}
                sx={{ 
                  borderRadius: 3,
                  minWidth: 'auto',
                  backgroundColor: '#25D366',
                  '&:hover': {
                    backgroundColor: '#128C7E',
                  }
                }}
              >
                <SendIcon />
              </Button>
            </form>
          </Box>
        </Paper>
      </Fade>
      
      {/* WhatsApp floating button */}
      <Tooltip 
        title="Chat with us on WhatsApp" 
        placement="left"
        TransitionComponent={Zoom}
      >
        <IconButton
          color="inherit"
          aria-label="WhatsApp Chat"
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: '#25D366',
            color: 'white',
            width: 56,
            height: 56,
            boxShadow: theme.shadows[4],
            zIndex: 1000,
            '&:hover': {
              backgroundColor: '#128C7E',
            },
            animation: open ? 'none' : 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': {
                boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.5)',
              },
              '70%': {
                boxShadow: '0 0 0 15px rgba(37, 211, 102, 0)',
              },
              '100%': {
                boxShadow: '0 0 0 0 rgba(37, 211, 102, 0)',
              }
            }
          }}
          onClick={toggleChat}
        >
          <WhatsAppIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default WhatsappButton;
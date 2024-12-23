import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, styled } from '@mui/material';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

const StyledLogo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: theme.palette.primary.main,
}));

const StyledSignUp = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
}));

const StyledHeroText = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
  fontSize: '2.5rem',
  fontWeight: 'bold',
}));

const StyledSubText = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
  fontSize: '1.1rem',
}));

const VideoUpload = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle video upload logic here
    const element = document.getElementById('video-list');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', py: 8 }}>
      <StyledContainer maxWidth="md">
        <StyledHeader>
          <StyledLogo>Sierra</StyledLogo>
          <StyledSignUp variant="text">Sign up</StyledSignUp>
        </StyledHeader>

        <Box sx={{ 
          textAlign: 'center', 
          mb: 6,
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
        }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'warning.main', 
              mb: 2,
              fontWeight: 'medium',
            }}
          >
            #Repurpose video with AI
          </Typography>
          
          <StyledHeroText variant="h3" gutterBottom>
            Now Repurpose long video, 10x faster.
          </StyledHeroText>
          
          <StyledSubText variant="subtitle1">
            Sierra allows you to create new video content in just a few clicks, saving you time and effort
          </StyledSubText>

          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
              mt: 4,
              '& .MuiTextField-root': {
                bgcolor: 'background.default',
              }
            }}
          >
            <TextField
              fullWidth
              label="Video Link here"
              variant="outlined"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              sx={{ mb: 2 }}
              placeholder="Paste your video link ( Link, Youtube, Loom etc...)"
            />
            
            <TextField
              fullWidth
              label="Keywords"
              variant="outlined"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              sx={{ mb: 3 }}
              placeholder="Keyword to include relevant data"
              multiline
              rows={4}
            />

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              type="submit"
              sx={{ 
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
              }}
            >
              Call to Action
            </Button>
          </Box>
        </Box>
      </StyledContainer>
    </Box>
  );
};

export default VideoUpload;

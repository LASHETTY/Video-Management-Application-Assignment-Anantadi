import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, IconButton, Grid, styled } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ReactPlayer from 'react-player';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

const StyledNavigation = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const StyledActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const defaultVideo = {
  id: 1,
  title: 'Introduction to Artificial Intelligence and Machine Learning',
  videoUrl: 'https://www.youtube.com/watch?v=JMUxmLyrhSk',
  description: 'A comprehensive introduction to AI and Machine Learning concepts.',
  transcript: [
    { time: '0:00', text: 'Welcome to AI and ML' },
    { time: '1:00', text: 'Getting Started' },
  ],
};

const VideoDetail = () => {
  const [currentVideo, setCurrentVideo] = useState(defaultVideo);

  useEffect(() => {
    const handleVideoUpdate = () => {
      if (window.currentVideo) {
        // Ensure all required properties exist
        const video = {
          ...defaultVideo,
          ...window.currentVideo,
          transcript: window.currentVideo.transcript || defaultVideo.transcript,
          description: window.currentVideo.description || defaultVideo.description,
        };
        setCurrentVideo(video);
      }
    };

    // Initial check
    handleVideoUpdate();

    // Check for updates every second
    const interval = setInterval(handleVideoUpdate, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ bgcolor: 'background.default', py: 4 }} id="video-detail">
      <StyledContainer maxWidth="lg">
        {/* Header */}
        <StyledHeader>
          <StyledNavigation>
            <Typography variant="h6" sx={{ color: 'primary.main' }}>Sierra</Typography>
          </StyledNavigation>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="primary">Dashboard</Button>
            <Button color="primary">Pricing</Button>
            <Button color="primary">Support</Button>
          </Box>
        </StyledHeader>

        {/* Video Title */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ color: 'text.primary' }}>{currentVideo.title}</Typography>
          <StyledActions>
            <Button variant="contained" startIcon={<ShareIcon />}>
              Share
            </Button>
            <IconButton color="primary">
              <BookmarkIcon />
            </IconButton>
          </StyledActions>
        </Box>

        {/* Video Player */}
        <Box
          sx={{
            width: '100%',
            height: '500px',
            bgcolor: 'background.paper',
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            borderRadius: 2,
            overflow: 'hidden',
            '& > div': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100% !important',
              height: '100% !important',
            }
          }}
        >
          <ReactPlayer
            url={currentVideo.videoUrl}
            width="100%"
            height="100%"
            controls
            playing
            config={{
              youtube: {
                playerVars: { showinfo: 1 }
              }
            }}
          />
        </Box>

        {/* Video Information */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ 
              mb: 4, 
              p: 3, 
              bgcolor: 'background.paper',
              borderRadius: 2
            }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                Description
              </Typography>
              <Typography color="text.secondary">
                {currentVideo.description}
              </Typography>
            </Box>

            {currentVideo.transcript && currentVideo.transcript.length > 0 && (
              <Box sx={{ 
                p: 3, 
                bgcolor: 'background.paper',
                borderRadius: 2
              }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                  Transcript
                </Typography>
                {currentVideo.transcript.map((item, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="primary">
                      {item.time}
                    </Typography>
                    <Typography color="text.secondary">
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </StyledContainer>
    </Box>
  );
};

export default VideoDetail;

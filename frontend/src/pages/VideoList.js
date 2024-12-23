import React, { useState } from 'react';
import { Box, Container, Grid, Card, CardMedia, CardContent, Typography, IconButton, styled, TextField, Chip } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledVideoCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  backgroundColor: theme.palette.background.paper,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'scale(1.02)',
    transition: 'transform 0.2s ease-in-out',
    '& .video-overlay': {
      opacity: 1,
    },
  },
}));

const VideoOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
}));

const StyledPlayButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
}));

const allVideos = [
  {
    id: 1,
    title: 'System Design Interview: Designing Netflix',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=psQzyFfsUGU',
    date: '24 Aug, 2023',
    duration: '45:30',
    hashtags: ['SystemDesign', 'Netflix', 'Architecture', 'Interview'],
    category: 'System Design',
    description: 'Learn how to tackle system design interviews with this Netflix design example. Covers scalability, microservices, and caching strategies.',
    transcript: [
      { time: '0:00', text: 'Introduction to System Design' },
      { time: '5:30', text: 'Netflix Architecture Overview' },
      { time: '15:00', text: 'Scaling Solutions' },
    ]
  },
  {
    id: 2,
    title: 'FAANG Interview: Data Structures & Algorithms',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=RBSGKlAvoiM',
    date: '25 Aug, 2023',
    duration: '52:45',
    hashtags: ['DSA', 'FAANG', 'Algorithms', 'CodingInterview'],
    category: 'DSA',
    description: 'Master the most common Data Structures and Algorithms questions asked in FAANG interviews. Includes live coding and problem-solving strategies.',
    transcript: [
      { time: '0:00', text: 'Common Interview Patterns' },
      { time: '10:00', text: 'Tree and Graph Problems' },
      { time: '25:00', text: 'Dynamic Programming' },
    ]
  },
  {
    id: 3,
    title: 'React.js Interview Questions 2024',
    thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=XBTJDpT2XaI',
    date: '26 Aug, 2023',
    duration: '35:15',
    hashtags: ['React', 'Frontend', 'JavaScript', 'Interview'],
    category: 'Frontend',
    description: 'Top React.js interview questions for 2024. Covers hooks, state management, performance optimization, and new React features.',
    transcript: [
      { time: '0:00', text: 'React Fundamentals' },
      { time: '12:00', text: 'Advanced Hooks Usage' },
      { time: '25:00', text: 'Performance Tips' },
    ]
  },
  {
    id: 4,
    title: 'Microservices Architecture Interview Guide',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=3mQyT-zAml4',
    date: '27 Aug, 2023',
    duration: '48:20',
    hashtags: ['Microservices', 'Architecture', 'Backend', 'SystemDesign'],
    category: 'Backend',
    description: 'Deep dive into microservices architecture interview questions. Learn about service discovery, API gateway patterns, and containerization.',
    transcript: [
      { time: '0:00', text: 'Microservices Basics' },
      { time: '15:00', text: 'Communication Patterns' },
      { time: '30:00', text: 'Deployment Strategies' },
    ]
  },
  {
    id: 5,
    title: 'DevOps Interview: CI/CD and Cloud',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=j5Zsa_eOXeY',
    date: '28 Aug, 2023',
    duration: '42:10',
    hashtags: ['DevOps', 'Cloud', 'AWS', 'CICD'],
    category: 'DevOps',
    description: 'Essential DevOps interview preparation covering CI/CD pipelines, cloud services, and container orchestration with Kubernetes.',
    transcript: [
      { time: '0:00', text: 'DevOps Fundamentals' },
      { time: '15:00', text: 'CI/CD Pipeline Design' },
      { time: '30:00', text: 'Cloud Architecture' },
    ]
  },
  {
    id: 6,
    title: 'MongoDB and Node.js Interview Questions',
    thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=oSIv-E60NiU',
    date: '29 Aug, 2023',
    duration: '38:00',
    hashtags: ['MongoDB', 'NodeJS', 'Database', 'Backend'],
    category: 'Database',
    description: 'Comprehensive guide to MongoDB and Node.js interview questions. Covers database design, indexing, and Node.js best practices.',
    transcript: [
      { time: '0:00', text: 'MongoDB Fundamentals' },
      { time: '12:00', text: 'Database Design Patterns' },
      { time: '25:00', text: 'Node.js Integration' },
    ]
  }
];

const VideoList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = allVideos.filter(video => {
    const searchString = searchTerm.toLowerCase();
    return (
      video.title.toLowerCase().includes(searchString) ||
      video.category.toLowerCase().includes(searchString) ||
      video.hashtags.some(tag => tag.toLowerCase().includes(searchString))
    );
  });

  const handleVideoClick = (video) => {
    const videoDetailSection = document.getElementById('video-detail');
    if (videoDetailSection) {
      videoDetailSection.scrollIntoView({ behavior: 'smooth' });
      window.currentVideo = video;
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', py: 6 }} id="video-list">
      <StyledContainer maxWidth="xl">
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', mb: 4 }}>
          Filter & search based on different videos uploaded
        </Typography>

        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by title, category, or hashtags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              bgcolor: 'background.paper',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {filteredVideos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <StyledVideoCard onClick={() => handleVideoClick(video)}>
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  <CardMedia
                    component="img"
                    image={video.thumbnail}
                    alt={video.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <VideoOverlay className="video-overlay">
                    <StyledPlayButton>
                      <PlayCircleIcon sx={{ fontSize: 48 }} />
                    </StyledPlayButton>
                  </VideoOverlay>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom noWrap sx={{ color: 'text.primary', mb: 1 }}>
                    {video.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {video.duration}
                    </Typography>
                    <Box sx={{ mx: 1, color: 'text.secondary' }}>•</Box>
                    <CategoryIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {video.category}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {video.hashtags.map((tag, idx) => (
                      <Chip
                        key={idx}
                        label={tag}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ 
                          borderRadius: 1,
                          '& .MuiChip-label': { px: 1 }
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </StyledVideoCard>
            </Grid>
          ))}
        </Grid>
      </StyledContainer>
    </Box>
  );
};

export default VideoList;

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VideoUpload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    videoUrl: '',
    keywords: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/videos',
        {
          driveFileUrl: formData.videoUrl,
          tags: formData.keywords.split(',').map(tag => tag.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}
        >
          Now Repurpose long video, 10x faster.
        </Typography>
        
        <Typography
          variant="subtitle1"
          sx={{ mb: 6, color: 'text.secondary' }}
        >
          Sierra allows you to create new video content in just a few clicks, saving you time and effort.
        </Typography>

        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            backgroundColor: 'white',
            borderRadius: 2,
          }}
        >
          <TextField
            fullWidth
            placeholder="Paste your video link ( Link, Youtube, Loom etc )"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            variant="outlined"
            sx={{ backgroundColor: '#F7FAFC' }}
          />

          <TextField
            fullWidth
            placeholder="Keywords to include relevant data"
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            variant="outlined"
            multiline
            rows={4}
            sx={{ backgroundColor: '#F7FAFC' }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              py: 2,
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            {loading ? 'Processing...' : 'Call to Action'}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default VideoUpload;

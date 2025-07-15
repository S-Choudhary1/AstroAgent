import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Paper,
  IconButton,
} from '@mui/material';
import {
  Brightness4 as MoonIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { servicePrompts, generateAstroResponse } from '../config/openai';

const MoonPhase = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.location) {
      setError('Please enter your location');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const currentDate = new Date().toLocaleDateString();
      const prompt = servicePrompts.moonPhase(currentDate, formData.location);
      const result = await generateAstroResponse(prompt);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A0426 0%, #1A1040 100%)',
        pt: 4,
        pb: 6,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton
            onClick={() => navigate('/dashboard')}
            sx={{ color: 'white', mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <MoonIcon sx={{ color: 'primary.main', mr: 2, fontSize: 32 }} />
          <Typography variant="h4" sx={{ color: 'white' }}>
            Moon Phase
          </Typography>
        </Box>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Current Lunar Influence
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Discover how today's moon phase affects your energy and what cosmic guidance awaits you.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Your Location (City, Country)"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                fullWidth
                required
                placeholder="e.g., New York, USA"
                helperText="Enter your current location to get localized moon phase insights"
              />

              {error && (
                <Alert severity="error">{error}</Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(45deg, #7B2CBF 30%, #9D4EDD 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #6A1B9A 30%, #8E24AA 90%)',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Explore Moon Influence'}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {response && (
          <Paper
            elevation={3}
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, rgba(123, 44, 191, 0.1) 0%, rgba(157, 78, 221, 0.1) 100%)',
              border: '1px solid rgba(123, 44, 191, 0.2)',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              Current Moon Phase Insights
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                lineHeight: 1.8,
                whiteSpace: 'pre-line'
              }}
            >
              {response}
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default MoonPhase;
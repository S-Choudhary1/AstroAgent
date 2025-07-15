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
  Public as EarthIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { servicePrompts, generateAstroResponse } from '../config/openai';

const PlanetaryPositions = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    birthDate: '',
    birthTime: '',
    birthPlace: '',
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
    
    if (!formData.birthDate || !formData.birthTime || !formData.birthPlace) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const prompt = servicePrompts.planetaryPositions(
        formData.birthDate, 
        formData.birthTime, 
        formData.birthPlace
      );
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
          <EarthIcon sx={{ color: 'primary.main', mr: 2, fontSize: 32 }} />
          <Typography variant="h4" sx={{ color: 'white' }}>
            Planetary Positions
          </Typography>
        </Box>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Current Celestial Alignments
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Discover how current planetary positions influence your life based on your birth details.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Birth Date"
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                label="Birth Time"
                type="time"
                value={formData.birthTime}
                onChange={(e) => handleInputChange('birthTime', e.target.value)}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                helperText="Enter your exact birth time for accurate planetary analysis"
              />

              <TextField
                label="Birth Place (City, Country)"
                value={formData.birthPlace}
                onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                fullWidth
                required
                placeholder="e.g., London, UK"
                helperText="Your birth location helps determine planetary influences"
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
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Analyze Planetary Influence'}
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
              Your Planetary Position Analysis
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

export default PlanetaryPositions;
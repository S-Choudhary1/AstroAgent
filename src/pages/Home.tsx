import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'primary.main',
                fontSize: '1.5rem',
                mr: 2,
              }}
            >
              {currentUser?.email?.[0]?.toUpperCase() || currentUser?.phoneNumber?.[0] || '?'}
            </Avatar>
            <Box>
              <Typography variant="h4" gutterBottom>
                {t('home.welcomeBack')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {currentUser?.email || currentUser?.phoneNumber || 'User'}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              {t('home.accountInformation')}
            </Typography>
            <Typography variant="body1">
              <strong>{t('home.userID')}:</strong> {currentUser?.uid}
            </Typography>
            {currentUser?.email && (
              <Typography variant="body1">
                <strong>{t('common.email')}:</strong> {currentUser.email}
              </Typography>
            )}
            {currentUser?.phoneNumber && (
              <Typography variant="body1">
                <strong>{t('common.phone')}:</strong> {currentUser.phoneNumber}
              </Typography>
            )}
            <Typography variant="body1">
              <strong>{t('home.emailVerified')}:</strong>{' '}
              {currentUser?.emailVerified ? t('auth.yes') : t('auth.no')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/dashboard')}
            >
              {t('home.goToDashboard')}
            </Button>
            <Button variant="outlined" color="error" onClick={handleSignOut}>
              {t('common.signOut')}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home; 
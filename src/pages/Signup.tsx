import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Divider,
  Alert,
  Tooltip,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Signup: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [signupMethod, setSignupMethod] = useState<'phone' | 'email'>('email');
  const { signInWithGoogle, signUpWithEmail } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handlePhoneSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(t('auth.phoneLoginDisabled'));
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signUpWithEmail(email, password);
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google. Please try again.');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {t('auth.signupTitle')}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Tooltip title={t('auth.phoneLoginDisabled')}>
              <span style={{ width: '100%' }}>
                <Button
                  fullWidth
                  variant={signupMethod === 'phone' ? 'contained' : 'outlined'}
                  onClick={() => setSignupMethod('phone')}
                  disabled
                >
                  {t('common.phone')}
                </Button>
              </span>
            </Tooltip>
            <Button
              fullWidth
              variant={signupMethod === 'email' ? 'contained' : 'outlined'}
              onClick={() => setSignupMethod('email')}
            >
              {t('common.email')}
            </Button>
          </Box>

          {signupMethod === 'phone' ? (
            <form onSubmit={handlePhoneSignup}>
              <TextField
                fullWidth
                label={t('common.phoneNumber')}
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                margin="normal"
                required
                placeholder="+91XXXXXXXXXX"
                disabled
              />
              <div id="recaptcha-container"></div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={true}
                sx={{ mt: 2 }}
              >
                {t('auth.featureUnavailable')}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleEmailSignup}>
              <TextField
                fullWidth
                label={t('common.email')}
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label={t('common.password')}
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                helperText={t('auth.passwordHelperText')}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                {isLoading ? t('auth.signingUp') : t('common.signup')}
              </Button>
            </form>
          )}

          <Divider sx={{ my: 3 }}>{t('common.or')}</Divider>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleSignup}
            sx={{
              mb: 2,
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0, 0, 0, 0.23)',
              '&:hover': {
                border: '1px solid rgba(0, 0, 0, 0.23)',
                bgcolor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <img src="/google.svg" alt="Google" style={{ width: 20, height: 20 }} />
            {t('auth.signupWithGoogle')}
          </Button>

          <Typography variant="body2" align="center">
            {t('auth.alreadyHaveAccount')}{' '}
            <Button
              color="primary"
              onClick={() => navigate('/login')}
              sx={{ textTransform: 'none' }}
            >
              {t('common.login')}
            </Button>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup; 
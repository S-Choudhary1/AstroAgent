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

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('email');
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const navigate = useNavigate();

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('This feature is temporarily unavailable.');
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmail(email, password);
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google. Please try again.');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Tooltip title="This feature is temporarily unavailable">
              <span style={{ width: '100%' }}>
                <Button
                  fullWidth
                  variant={loginMethod === 'phone' ? 'contained' : 'outlined'}
                  onClick={() => setLoginMethod('phone')}
                
                >
                  Phone
                </Button>
              </span>
            </Tooltip>
            <Button
              fullWidth
              variant={loginMethod === 'email' ? 'contained' : 'outlined'}
              onClick={() => setLoginMethod('email')}
            >
              Email
            </Button>
          </Box>

          {loginMethod === 'phone' ? (
            <form onSubmit={handlePhoneLogin}>
              <TextField
                fullWidth
                label="Phone Number"
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
                Feature Temporarily Unavailable
              </Button>
            </form>
          ) : (
            <form onSubmit={handleEmailLogin}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          )}

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleLogin}
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
            Login with Google
          </Button>

          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <Button
              color="primary"
              onClick={() => navigate('/signup')}
              sx={{ textTransform: 'none' }}
            >
              Sign Up
            </Button>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 
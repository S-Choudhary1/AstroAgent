import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Avatar,
} from '@mui/material';
import {
  Stars as StarsIcon,
  Brightness4 as MoonIcon,
  WbSunny as SunIcon,
  Public as EarthIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const zodiacSigns = [
    { name: 'Daily Horoscope', icon: <SunIcon />, description: 'Your personalized daily guidance' },
    { name: 'Moon Phase', icon: <MoonIcon />, description: 'Current lunar influence' },
    { name: 'Planetary Positions', icon: <EarthIcon />, description: 'Current celestial alignments' },
    { name: 'Star Charts', icon: <StarsIcon />, description: 'Your personal star map' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A0426 0%, #1A1040 100%)',
        pt: 8,
        pb: 6,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123, 44, 191, 0.2) 0%, rgba(123, 44, 191, 0) 70%)',
          top: '5%',
          left: '10%',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0) 70%)',
          bottom: '5%',
          right: '10%',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'primary.main',
                mr: 2,
              }}
            >
              {currentUser?.phoneNumber?.[0] || currentUser?.email?.[0] || '?'}
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
                Welcome, Stargazer
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {currentUser?.phoneNumber || currentUser?.email}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={handleLogout}
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 4 }}>
          {zodiacSigns.map((sign, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: 'primary.main',
                      '& .MuiSvgIcon-root': {
                        fontSize: 32,
                      },
                    }}
                  >
                    {sign.icon}
                  </Avatar>
                </Box>
                <Typography gutterBottom variant="h6" component="h2">
                  {sign.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {sign.description}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    mt: 2,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'rgba(123, 44, 191, 0.1)',
                    },
                  }}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard; 
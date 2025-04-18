import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7B2CBF', // Deep mystical purple
      light: '#9D4EDD',
      dark: '#5A189A',
    },
    secondary: {
      main: '#FFD700', // Golden accent
      light: '#FFE566',
      dark: '#C8A800',
    },
    background: {
      default: '#0A0426', // Deep space blue
      paper: '#1A1040',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B8B8B8',
    },
  },
  typography: {
    fontFamily: "'Quicksand', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      background: 'linear-gradient(45deg, #FFD700 30%, #FF8E53 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '10px 30px',
          fontSize: '1rem',
        },
        contained: {
          background: 'linear-gradient(45deg, #7B2CBF 30%, #5A189A 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #9D4EDD 30%, #7B2CBF 90%)',
          },
        },
        outlined: {
          borderColor: '#7B2CBF',
          color: '#FFFFFF',
          '&:hover': {
            borderColor: '#9D4EDD',
            background: 'rgba(123, 44, 191, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(26, 16, 64, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: '#7B2CBF',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#9D4EDD',
            },
          },
        },
      },
    },
  },
});

export default theme; 
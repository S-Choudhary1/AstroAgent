import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { AutoStories, Psychology, Visibility, Stars } from '@mui/icons-material';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment = () => {
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      title: 'Basic Reading',
      price: 999,
      icon: <AutoStories />,
      features: [
        'Personal Birth Chart Analysis',
        'Monthly Horoscope',
        'Basic Compatibility Guide',
      ],
    },
    {
      title: 'Advanced Insights',
      price: 1999,
      icon: <Psychology />,
      features: [
        'Detailed Birth Chart Analysis',
        'Weekly Personalized Readings',
        'Advanced Compatibility Analysis',
        'Career & Finance Guidance',
      ],
      recommended: true,
    },
    {
      title: 'Premium Guidance',
      price: 2999,
      icon: <Visibility />,
      features: [
        'Complete Astrological Profile',
        'Daily Personalized Readings',
        'Live Consultation Sessions',
        'Relationship & Career Roadmap',
        'Priority Support',
      ],
    },
  ];

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (amount: number) => {
    setLoading(true);
    const res = await loadRazorpay();

    if (!res) {
      alert('Razorpay SDK failed to load');
      setLoading(false);
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: 'INR',
      name: 'Cosmic Connect',
      description: 'Astrology Consultation Payment',
      handler: function (response: any) {
        alert('Payment successful: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'User Name',
        email: 'user@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#7B2CBF',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

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
          zIndex: 0,
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
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" mb={6}>
          <Stars sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
          <Typography variant="h1" gutterBottom>
            Choose Your Cosmic Journey
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Unlock the secrets of the universe with our personalized astrology readings.
            Select the plan that resonates with your spiritual journey.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {plans.map((plan, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
                ...(plan.recommended && {
                  borderColor: 'secondary.main',
                  borderWidth: 2,
                  borderStyle: 'solid',
                  '&::before': {
                    content: '"Recommended"',
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    bgcolor: 'secondary.main',
                    color: 'background.paper',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                  },
                }),
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    mb: 2,
                    '& .MuiSvgIcon-root': {
                      fontSize: 32,
                      color: 'white',
                    },
                  }}
                >
                  {plan.icon}
                </Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {plan.title}
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  ₹{plan.price}
                </Typography>
                <Box sx={{ my: 3 }}>
                  {plan.features.map((feature, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {feature}
                    </Typography>
                  ))}
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handlePayment(plan.price)}
                  disabled={loading}
                  sx={{
                    mt: 2,
                    py: 1.5,
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Payment; 
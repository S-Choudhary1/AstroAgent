import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import Home from './pages/Home';
import DailyHoroscope from './pages/DailyHoroscope';
import MoonPhase from './pages/MoonPhase';
import PlanetaryPositions from './pages/PlanetaryPositions';
import StarCharts from './pages/StarCharts';
import { AuthProvider, useAuth } from './context/AuthContext';
import StarryBackground from './components/StarryBackground';
import LanguageToggle from './components/LanguageToggle';
import { useTranslation } from 'react-i18next';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) {
    return <div>{t('common.loading')}</div>;
  }

  return currentUser ? (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1300,
        }}
      >
        <LanguageToggle />
      </Box>
      {children}
    </Box>
  ) : (
    <Navigate to="/login" />
  );
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) {
    return <div>{t('common.loading')}</div>;
  }

  return currentUser ? (
    <Navigate to="/home" />
  ) : (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1300,
        }}
      >
        <LanguageToggle />
      </Box>
      {children}
    </Box>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <StarryBackground />
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              }
            />
            <Route
              path="/daily-horoscope"
              element={
                <PrivateRoute>
                  <DailyHoroscope />
                </PrivateRoute>
              }
            />
            <Route
              path="/moon-phase"
              element={
                <PrivateRoute>
                  <MoonPhase />
                </PrivateRoute>
              }
            />
            <Route
              path="/planetary-positions"
              element={
                <PrivateRoute>
                  <PlanetaryPositions />
                </PrivateRoute>
              }
            />
            <Route
              path="/star-charts"
              element={
                <PrivateRoute>
                  <StarCharts />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

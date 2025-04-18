import React from 'react';
import { Box } from '@mui/material';

const StarryBackground = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {[...Array(10)].map((_, i) => (
        <div key={i} className="star" />
      ))}
    </Box>
  );
};

export default StarryBackground; 
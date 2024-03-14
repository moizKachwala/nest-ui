import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loadable = ({ loading, children }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-block', width: '100%', height: '100%' }}>
      {loading ? (
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </Box>
  );
};

export default Loadable;

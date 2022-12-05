import React from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import theme from './assets/theme';
import './assets/styles/style.css';

function App() {
  return (
    <Box className="App">
      <ThemeProvider theme={theme}>
        <Typography variant="h1">Hello</Typography>
      </ThemeProvider>
    </Box>
  );
}

export default App;

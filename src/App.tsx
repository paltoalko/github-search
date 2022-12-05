import { Box, ThemeProvider } from '@mui/material';
import theme from './assets/theme';
import './assets/styles/style.css';
import HomePage from './components/HomePage';

function App() {
  return (
    <Box className="App">
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    </Box>
  );
}

export default App;

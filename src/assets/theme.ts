import { createTheme, PaletteMode, responsiveFontSizes } from '@mui/material';
let theme = createTheme({
  palette: {
    mode: 'light' as PaletteMode,
    primary: {
      main: '#006D77'
    },
    secondary: {
      main: '#83C5BE'
    }
  },
  typography: {
    fontFamily: 'Raleway'
  }
});

theme = responsiveFontSizes(theme);

export default theme;

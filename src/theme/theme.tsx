import { createTheme } from '@mui/material';

const Colors = {
  primary: '#785d53',
  secondary: '#F06292',
};

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Inter',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: { main: Colors.primary },
    secondary: { main: Colors.secondary },
    tonalOffset: {
      light: 0.7,
      dark: 0.2,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          height: 57,
          display: 'flex',
          alignItems: 'center',
        },
        notchedOutline: {
          borderRadius: 10,
          height: 57,
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.1rem',
          textTransform: 'none',
          borderRadius: 10,
          height: 55,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
        },
      },
    },
  },
});

theme.typography.h1 = {
  fontSize: '7rem',
  fontWeight: 'bold',
  letterSpacing: -3,
  '@media (min-width:600px)': {
    fontSize: '6rem',
  },
};

theme.typography.h2 = {
  fontSize: '5rem',
  fontWeight: 'bold',
  letterSpacing: -3,
  '@media (min-width:600px)': {
    fontSize: '5rem',
  },
};

theme.typography.h3 = {
  fontSize: '4rem',
  fontWeight: 'bold',
  letterSpacing: -2,
  '@media (min-width:600px)': {
    fontSize: '4rem',
  },
};

import { createTheme } from '@mui/material';

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
});

theme.typography.h1 = {
  fontSize: '7rem',
  fontWeight: 'bold',
  letterSpacing: -3,
  '@media (min-width:600px)': {
    fontSize: '6rem',
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

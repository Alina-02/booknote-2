import { createTheme } from '@mui/material';

const LightColors = {
  primary: '#785d53',
  secondary: '#F06292',
};

export const DarkColors = {
  primary: '#785d53',
  secondary: '#F06292',
  background: '#362925',
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
  colorSchemes: {
    light: {
      palette: {
        primary: { main: LightColors.primary },
        secondary: { main: LightColors.secondary },
        tonalOffset: {
          light: 0.7,
          dark: 0.2,
        },
      },
    },
    dark: {
      palette: {
        primary: { main: DarkColors.primary },
        secondary: { main: DarkColors.secondary },
        background: {
          default: DarkColors.background,
          paper: DarkColors.background,
        },
        text: {
          primary: '#ffffff',
          secondary: '#aaaaaa',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
        tonalOffset: {
          light: 0.5,
          dark: 0.2,
        },
      },
    },
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,

          display: 'flex',
          alignItems: 'center',

          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px rgba(120, 93, 83, 0.8) inset',
            WebkitTextFillColor: '#fff',
            caretColor: '#fff',
            borderRadius: 'inherit',
          },
        },
        notchedOutline: {
          borderRadius: 10,

          display: 'flex',
          alignItems: 'center',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          fontSize: ownerState.size === 'small' ? '0.95rem' : '1.1rem',
          textTransform: 'none',
          borderRadius: 10,
          height: ownerState.size === 'small' ? 35 : 55,
        }),
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
    MuiAlert: {
      styleOverrides: {
        root: {
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

theme.typography.h5 = {
  fontSize: '2rem',
  fontWeight: '600',
  letterSpacing: -2,
  '@media (min-width:600px)': {
    fontSize: '2rem',
  },
};

theme.typography.body1 = {
  fontSize: '1rem',
  fontWeight: '400',
};

theme.typography.body2 = {
  fontSize: '1rem',
  fontWeight: '500',
};

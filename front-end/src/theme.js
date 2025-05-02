// theme.js
import { createTheme } from '@mui/material/styles';

const commonTheme = {
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontSize: '1rem',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
};

const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f50057',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f7f9fc',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    divider: '#e0e0e0',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1976d2',
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#f50057',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#c51162',
          },
          padding: '8px 16px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          color: '#212121',
          borderRight: '1px solid #e0e0e0',
        },
      },
    },
  },
});

const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      contrastText: '#000000',
    },
    secondary: {
      main: '#f48fb1',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    divider: '#424242',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#90caf9',
          color: '#000000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#f48fb1',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#c2185b',
          },
          padding: '8px 16px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
          borderRight: '1px solid #424242',
        },
      },
    },
  },
});

export { lightTheme, darkTheme };

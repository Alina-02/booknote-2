import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/authContext.tsx';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <ThemeProvider theme={theme}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </ThemeProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

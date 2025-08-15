import Main from './ui/views/Main';
import LogIn from './ui/views/LogIn';
import { Navigate, Route, Routes } from 'react-router-dom';
import CreateAccount from './ui/views/CreateAccount';
import { AuthContext } from './context/authContext';
import { useContext, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';

interface PrivateRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated,
}) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const { status } = useContext(AuthContext);

  if (status === 'checking') {
    return (
      <Stack height="100vh" justifyContent="center" alignItems="center">
        <Typography variant="h5">
          Checking credentials, wait a moment...
        </Typography>
      </Stack>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/create-account" element={<CreateAccount />} />

      <Route
        path="/main"
        element={
          <PrivateRoute isAuthenticated={status === 'authenticated'}>
            <Main />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

import Main from './views/Main';
import LogIn from './views/LogIn';
import { Route, Routes } from 'react-router-dom';
import CreateAccount from './views/CreateAccount';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import { Stack, Typography } from '@mui/material';

function App() {
  const { status } = useContext(AuthContext);
  if (status === 'checking')
    return (
      <Stack height="100vh" justifyContent="center" alignItems="center">
        <Typography variant="h5">
          Checking credentials, wait a moment...
        </Typography>
      </Stack>
    );

  return (
    <>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<LogIn />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </>
  );
}

export default App;

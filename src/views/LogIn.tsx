import { Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/authContext';

const LogIn = () => {
  const navigate = useNavigate();
  const { handleLoginWithCredentials } = useContext(AuthContext);

  const { handleLogInFormChange, password, email, error, setError } = useForm({
    initialState: {
      password: '',
      email: '',
    },
  });

  const handleLogIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleLoginWithCredentials(email, password);
    goToMain();
  };

  const goToMain = () => {
    navigate('/main');
  };

  const goToCreateAccount = () => {
    navigate('/create-account');
  };

  return (
    <Stack height="100%" display="flex" alignItems="center">
      <Stack margin={10} alignItems="center">
        <Typography variant="h3" sx={{ height: '55px' }}>
          Save your
        </Typography>
        <Typography variant="h1">BookNotes</Typography>
      </Stack>
      <Stack spacing={3} width="370px">
        <Stack>
          <Typography variant="body1" fontWeight="600" ml={1}>
            Email
          </Typography>
          <TextField
            title="Email"
            name="email"
            onChange={handleLogInFormChange}
            value={email}
            error={error}
            fullWidth
          />
        </Stack>
        <Stack alignItems="start">
          <Typography variant="body1" fontWeight="600" ml={1}>
            Password
          </Typography>
          <TextField
            type="password"
            title="Password"
            name="password"
            onChange={handleLogInFormChange}
            value={password}
            error={error}
            fullWidth
          />
          <Typography variant="body1" ml={1} sx={{ cursor: 'pointer' }}>
            Have you forgot your password?
          </Typography>
        </Stack>
        <Stack alignItems="center" spacing={0.5}>
          <Button
            type="submit"
            variant="contained"
            onClick={handleLogIn}
            fullWidth
          >
            Log in
          </Button>
          <Typography
            variant="body1"
            onClick={goToCreateAccount}
            sx={{ cursor: 'pointer' }}
          >
            Create an account
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LogIn;

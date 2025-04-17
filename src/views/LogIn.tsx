import { Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogInForm } from '../hooks/useLogInForm';
import { logInWithCredentials } from '../firebase/services';

const LogIn = () => {
  const navigate = useNavigate();

  const { handleLogInFormChange, password, email } = useLogInForm({
    initialState: {
      password: '',
      email: '',
    },
  });

  const handleLogIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    logInWithCredentials({ email, password });
    goToMain();
  };

  const goToMain = () => {
    navigate('/main');
  };

  return (
    <Stack height="100%" display="flex" alignItems="center">
      <Stack margin={10} alignItems="center">
        <Typography variant="h3">Save your</Typography>
        <Typography variant="h1">BookNotes</Typography>
      </Stack>
      <Stack spacing={2} width="300px">
        <Stack>
          <Typography variant="body1">Email</Typography>
          <TextField
            title="Email"
            name="email"
            onChange={handleLogInFormChange}
            value={email}
            fullWidth
          />
        </Stack>
        <Stack alignItems="start">
          <Typography variant="body1">Password</Typography>
          <TextField
            title="Password"
            name="password"
            onChange={handleLogInFormChange}
            value={password}
            fullWidth
          />
          <Typography variant="caption">
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
          <Typography variant="caption" onClick={() => {}}>
            Create an account
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LogIn;

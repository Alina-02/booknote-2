import { Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogInForm } from '../hooks/useLogInForm';
import { AuthContext } from '../context/authContext';

const LogIn = () => {
  const navigate = useNavigate();
  const { handleLoginWithCredentials } = useContext(AuthContext);

  const { handleLogInFormChange, password, email, error, setError } =
    useLogInForm({
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
            error={error}
            fullWidth
          />
        </Stack>
        <Stack alignItems="start">
          <Typography variant="body1">Password</Typography>
          <TextField
            type="password"
            title="Password"
            name="password"
            onChange={handleLogInFormChange}
            value={password}
            error={error}
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
          <Typography variant="caption" onClick={goToCreateAccount}>
            Create an account
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LogIn;

import { Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const navigate = useNavigate();

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
          <Typography variant="body1">Username</Typography>
          <TextField title="Username" name="Username" fullWidth />
        </Stack>
        <Stack alignItems="start">
          <Typography variant="body1">Password</Typography>
          <TextField title="Password" name="Password" fullWidth />
          <Typography variant="caption">
            Have you forgot your password?
          </Typography>
        </Stack>
        <Button variant="contained" onClick={goToMain}>
          Log in
        </Button>
      </Stack>
    </Stack>
  );
};

export default LogIn;

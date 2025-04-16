import { Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

const LogIn = () => {
  return (
    <Stack height="100%" display="flex" alignItems="center">
      <Stack margin={10}>
        <Typography variant="h3">Save your</Typography>
        <Typography variant="h1">BookNotes</Typography>
      </Stack>
      <Stack spacing={2} width="300px">
        <TextField title="Username" fullWidth />
        <Stack alignItems="start">
          <TextField title="Password" fullWidth />
          <Typography variant="caption">
            Have you forgot your password?
          </Typography>
        </Stack>
        <Button variant="contained">Log in</Button>
      </Stack>
    </Stack>
  );
};

export default LogIn;

import { Button, Icon, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';

const Main = () => {
  return (
    <>
      <Stack
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        margin={10}
      >
        <Stack alignItems="center">
          <Typography variant="h3">Find a</Typography>
          <Typography variant="h1">BookNote</Typography>
        </Stack>
        <Stack direction="row">
          <TextField />
          <Button variant="contained">Search</Button>
        </Stack>
        <Stack direction="row">
          <Button>
            <MenuBookIcon />
          </Button>
          <Button>
            <FormatQuoteIcon />
          </Button>
        </Stack>
      </Stack>
      <Button
        size="small"
        sx={{
          width: '60px',
          height: '60px',
          position: 'absolute',
          top: 10,
          right: 10,
        }}
      >
        <PersonIcon />
      </Button>
      <Button
        size="small"
        sx={{
          width: '60px',
          height: '60px',
          position: 'absolute',
          top: 10,
          left: 10,
        }}
      >
        <MenuIcon />
      </Button>
    </>
  );
};

export default Main;

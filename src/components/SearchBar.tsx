import { Box, Button, InputBase, useTheme } from '@mui/material';
import React from 'react';

const SearchBar = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: '50px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: 675,
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <InputBase
        placeholder="Search..."
        sx={{
          flex: 1,
          paddingLeft: 3,
          paddingY: 1.2,
          fontSize: '1rem',
        }}
      />
      <Button
        variant="contained"
        sx={{
          borderRadius: 0,

          color: '#000',
          fontWeight: 600,
          textTransform: 'none',
          px: 4,
          '&:hover': {
            color: theme.palette.primary.contrastText,
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;

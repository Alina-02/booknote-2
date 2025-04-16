import { Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { Book } from '../models/books';
import BookCard from '../components/BookCard';

const librosdeprueba: Book[] = [
  {
    title: 'Título 1',
    author: 'Autor 1',
    favQuote: 'Cita favorita del libro 1',
  },
  {
    title: 'Título 2',
    author: 'Autor 2',
    favQuote: 'Cita favorita del libro 2',
  },
  {
    title: 'Título 3',
    author: 'Autor 3',
    favQuote: 'Cita favorita del libro 3',
  },
];

const Main = () => {
  const [seeMenu, setSeeMenu] = useState<boolean>(false);
  return (
    <Stack direction="row">
      {seeMenu && (
        <Stack
          height="100%"
          width="350px"
          padding={2}
          spacing={1}
          sx={{ backgroundColor: 'gray' }}
        >
          {librosdeprueba.map((book) => (
            <BookCard book={book} />
          ))}
        </Stack>
      )}
      <Stack
        height="100%"
        width="100%"
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
          left: seeMenu ? 315 : 10,
        }}
        onClick={() => {
          setSeeMenu(!seeMenu);
        }}
      >
        <MenuIcon />
      </Button>
    </Stack>
  );
};

export default Main;

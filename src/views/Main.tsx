import { Button, TextField, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { Book } from '../models/books';
import BookCard from '../components/BookCard';
import AddBookModal from '../components/AddBookModal';
import AddQuoteModal from '../components/AddQuoteModal';
import ProfilePopover from '../components/ProfilePopover';
import { getAllBooks } from '../firebase/database_services';

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
  const [openProfilePopover, setOpenProfilePopover] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [openBookModal, setOpenBookModal] = useState<boolean>(false);
  const [openQuoteModal, setOpenQuoteModal] = useState<boolean>(false);

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getAllBooks().then((books) => setBooks(books));
  }, []);

  return (
    <Stack direction="row" height="100vh" display="flex">
      <AddBookModal
        open={openBookModal}
        onClose={() => setOpenBookModal(false)}
      />
      <AddQuoteModal
        open={openQuoteModal}
        onClose={() => setOpenQuoteModal(false)}
      />
      <ProfilePopover
        open={openProfilePopover}
        handleClose={() => setOpenProfilePopover(false)}
        anchorEl={anchorEl}
      />
      {seeMenu && (
        <Stack
          width="350px"
          padding={2}
          justifyContent="space-between"
          sx={{ backgroundColor: 'gray' }}
        >
          <Stack spacing={1}>
            {books?.map((book) => (
              <BookCard book={book} />
            ))}
          </Stack>
          <Button variant="contained" onClick={() => setOpenBookModal(true)}>
            Add book
          </Button>
        </Stack>
      )}
      <Stack
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
        <Stack direction="row" spacing={2}>
          <Tooltip title="Add book" arrow>
            <Button
              variant="contained"
              sx={{ borderRadius: 100 }}
              onClick={() => setOpenBookModal(true)}
            >
              <MenuBookIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Add quote" arrow>
            <Button
              variant="contained"
              sx={{ borderRadius: 100 }}
              onClick={() => setOpenQuoteModal(true)}
            >
              <FormatQuoteIcon />
            </Button>
          </Tooltip>
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
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setOpenProfilePopover(true);
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

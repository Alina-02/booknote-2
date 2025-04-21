import { Box, Button, Grid, Paper, Tooltip, Typography } from '@mui/material';
import { Stack, useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Masonry from '@mui/lab/Masonry';

import { Book } from '../models/books';
import BookCard from '../components/BookCard';
import AddBookModal from '../components/AddBookModal';
import AddQuoteModal from '../components/AddQuoteModal';
import ProfilePopover from '../components/ProfilePopover';
import { getAllBooks } from '../firebase/database_services';
import SearchBar from '../components/SearchBar';
import { motion } from 'framer-motion';
import QuoteCard from '../components/QuoteCard';

const Main = () => {
  const theme = useTheme();

  const [seeMenu, setSeeMenu] = useState<boolean>(false);
  const [openProfilePopover, setOpenProfilePopover] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [upsideDown, setUpsideDown] = useState(false);

  const [openBookModal, setOpenBookModal] = useState<boolean>(false);
  const [openQuoteModal, setOpenQuoteModal] = useState<boolean>(false);

  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book>();

  useEffect(() => {
    getAllBooks().then((books) => setBooks(books));
  }, [openBookModal, openQuoteModal]);

  const MotionBox = motion(Box);

  const handleSearch = () => {
    setUpsideDown(true);
  };

  const onClickBookCard = (book: Book) => {
    setUpsideDown(true);
    setSelectedBook(book);
  };

  return (
    <Stack direction="row" height="100vh" display="flex">
      <AddBookModal
        open={openBookModal}
        onClose={() => setOpenBookModal(false)}
      />
      <AddQuoteModal
        open={openQuoteModal}
        onClose={() => setOpenQuoteModal(false)}
        books={books}
        book={selectedBook}
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
          paddingTop={10}
          justifyContent="space-between"
          sx={{ backgroundColor: theme.palette.primary.light }}
        >
          <Stack spacing={1}>
            {books?.map((book) => (
              <BookCard book={book} onClick={() => onClickBookCard(book)} />
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
        {!upsideDown && (
          <Stack alignItems="center">
            <Typography variant="h3" sx={{ height: '55px' }}>
              Find a
            </Typography>

            <Typography variant="h1">BookNote</Typography>
          </Stack>
        )}
        {upsideDown && (
          <MotionBox
            initial={{ rotate: '0deg' }}
            animate={{
              y: -240,
              rotate: '180deg',
            }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <Stack alignItems="center">
              <Typography variant="h1">BookNote</Typography>
            </Stack>
          </MotionBox>
        )}
        <MotionBox
          width={675}
          initial={false}
          animate={{
            y: upsideDown ? -450 : 0,
          }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <SearchBar handleSearch={handleSearch} />
        </MotionBox>

        {!upsideDown && (
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
        )}
        {upsideDown && (
          <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
            <Paper
              elevation={2}
              sx={{
                backgroundColor: theme.palette.primary.light,
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button fullWidth onClick={() => setOpenQuoteModal(true)}>
                Add quote
              </Button>
            </Paper>
            {selectedBook?.quotes?.map((quote) => (
              <QuoteCard quote={quote} />
            ))}
          </Masonry>
        )}
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
        <PersonIcon fontSize="large" />
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
        onClick={() => {
          setSeeMenu(!seeMenu);
        }}
      >
        <MenuIcon fontSize="large" />
      </Button>
    </Stack>
  );
};

export default Main;

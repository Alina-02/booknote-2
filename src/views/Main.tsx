import { Box, Button, Tooltip, Typography } from '@mui/material';
import { Stack, useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

import { Book } from '../models/books';
import BookCard from '../components/books/BookCard';
import AddBookModal from '../components/books/AddBookModal';
import ProfilePopover from '../components/ProfilePopover';
import { getAllBooks } from '../firebase/database_services';
import SearchBar from '../components/SearchBar';
import { motion } from 'framer-motion';
import AddQuoteModal from '../components/quotes/AddQuoteModal';
import SelectedBook from '../components/screen/SelectedBook';
import { Quote } from '../models/quotes';
import { onValue } from 'firebase/database';

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
  const [selectedQuote, setSelectedQuote] = useState<Quote>();

  useEffect(() => {
    getAllBooks().then((books) => {
      setBooks(books);
      localStorage.setItem('books', JSON.stringify(books));
      if (selectedBook) {
        const b = books.find((b) => b.bookId === selectedBook.bookId);
        setSelectedBook(b);
      }
    });
  }, []);

  const MotionBox = motion(Box);

  const handleSearch = () => {
    setUpsideDown(true);
  };

  const onClickBookCard = (book: Book) => {
    setUpsideDown(false);
    setSeeMenu(false);
    setSelectedBook(book);
  };

  return (
    <Stack direction="row" height="100vh" display="flex">
      <AddBookModal
        open={openBookModal}
        onClose={() => setOpenBookModal(false)}
        setBooks={setBooks}
        books={books}
      />
      <AddQuoteModal
        open={openQuoteModal}
        onClose={() => {
          setSelectedQuote(undefined);
          setOpenQuoteModal(false);
        }}
        books={books}
        book={selectedBook}
        selectedQuote={selectedQuote}
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
        alignItems="center"
        justifyContent={selectedBook ? 'start' : 'center'}
        spacing={4}
        margin={7}
        marginTop={2}
      >
        {!upsideDown && !selectedBook && (
          <Stack alignItems="center">
            <Typography variant="h3" sx={{ height: '55px' }}>
              Find a
            </Typography>
            <Typography variant="h1">BookNote</Typography>
          </Stack>
        )}
        {upsideDown && !selectedBook && (
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
        {!selectedBook && (
          <MotionBox
            width={550}
            maxWidth={675}
            initial={false}
            animate={{
              y: upsideDown ? -450 : 0,
            }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <SearchBar handleSearch={handleSearch} />
          </MotionBox>
        )}
        {!upsideDown && !selectedBook && (
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
        {selectedBook && (
          <SelectedBook
            setOpenQuoteModal={setOpenQuoteModal}
            setOpenBookModal={setOpenBookModal}
            selectedBook={selectedBook}
            setSelectedQuote={setSelectedQuote}
          />
        )}
      </Stack>
      <Button
        size="small"
        sx={{
          width: '50px',
          height: '50px',
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
      <Tooltip title="Books" arrow>
        <Button
          variant={seeMenu ? 'text' : 'contained'}
          size="small"
          sx={{
            width: '30px',
            height: '50px',
            position: 'absolute',
            top: 10,
            left: 10,
          }}
          onClick={() => {
            setSeeMenu(!seeMenu);
          }}
        >
          <MenuIcon sx={{ fontSize: '30px' }} />
        </Button>
      </Tooltip>
      {selectedBook && seeMenu && (
        <Button
          size="small"
          sx={{
            width: '30px',
            height: '50px',
            position: 'absolute',
            top: !seeMenu ? 50 : 10,
            left: !seeMenu ? 10 : 60,
          }}
          onClick={() => {
            setUpsideDown(false);
            setSeeMenu(false);
            setSelectedBook(undefined);
          }}
        >
          <HomeIcon sx={{ fontSize: '30px' }} />
        </Button>
      )}
    </Stack>
  );
};

export default Main;

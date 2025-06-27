import { Box, Button, Tooltip, Typography } from '@mui/material';
import { Stack, useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

import { Book } from '../models/books';
import AddBookModal from '../components/books/AddBookModal';
import ProfilePopover from '../components/ProfilePopover';
import { getAllBooks } from '../firebase/database_services';
import SearchBar from '../components/SearchBar';
import { motion } from 'framer-motion';
import AddQuoteModal from '../components/quotes/AddQuoteModal';
import SelectedBook from './SelectedBook';
import { Quote } from '../models/quotes';
import LateralMenu from '../components/LateralMenu';
import ButtonsMenu from '../components/ButtonsMenu';
import { DarkColors } from '../theme/theme';
import QuoteCard from '../components/quotes/QuoteCard';

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
  const [bookSearch, setBookSearch] = useState<Book[]>([]);

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

  const handleSearch = (inputSearch: string) => {
    setUpsideDown(true);

    console.log(inputSearch);
    console.log(books);

    const filteredBooks = books.filter((book: Book) => {
      if (inputSearch === '') {
        return book;
      } else {
        return (
          book.author.toLowerCase().includes(inputSearch) ||
          book.title.toLowerCase().includes(inputSearch)
        );
      }
    });

    setBookSearch(filteredBooks);
  };

  const onClickBookCard = (book: Book) => {
    setUpsideDown(false);
    setSeeMenu(false);
    setSelectedBook(book);
  };

  return (
    <Stack
      direction="row"
      display="flex"
      height="100vh"
      sx={{
        backgroundColor:
          theme.palette.mode === 'dark' ? DarkColors.background : 'white',
      }}
    >
      <AddBookModal
        open={openBookModal}
        onClose={() => setOpenBookModal(false)}
        setBooks={setBooks}
        books={books}
        selectedBook={selectedBook}
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
        <LateralMenu
          books={books}
          seeMenu={seeMenu}
          setSeeMenu={setSeeMenu}
          setUpsideDown={setUpsideDown}
          setSelectedBook={setSelectedBook}
          onClickBookCard={onClickBookCard}
          setOpenBookModal={setOpenBookModal}
        />
      )}
      {selectedBook && (
        <SelectedBook
          setOpenQuoteModal={setOpenQuoteModal}
          setOpenBookModal={setOpenBookModal}
          selectedBook={selectedBook}
          setSelectedQuote={setSelectedQuote}
          seeMenu={seeMenu}
          setSeeMenu={setSeeMenu}
          setBooks={setBooks}
        />
      )}

      {!selectedBook && (
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
              <Typography
                variant="h3"
                sx={{
                  height: '55px',
                  color: theme.palette.mode === 'dark' ? 'white' : 'black',
                }}
              >
                Find a
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  color: theme.palette.mode === 'dark' ? 'white' : 'black',
                }}
              >
                BookNote
              </Typography>
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
            <>
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
              <Stack>
                {bookSearch?.map((book) => {
                  if (book && book?.quotes && book?.quotes.length) {
                    return book?.quotes.map((quote: Quote) => {
                      return (
                        <QuoteCard
                          quote={quote}
                          book={book}
                          onClick={() => {}}
                        />
                      );
                    });
                  }
                })}
              </Stack>
            </>
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
        </Stack>
      )}
      <ButtonsMenu
        setAnchorEl={setAnchorEl}
        seeMenu={seeMenu}
        setSeeMenu={setSeeMenu}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        setUpsideDown={setUpsideDown}
        setOpenProfilePopover={setOpenProfilePopover}
      />
    </Stack>
  );
};

export default Main;

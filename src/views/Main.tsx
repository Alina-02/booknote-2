import { Box, Button, Tooltip, Typography } from '@mui/material';
import { Stack, useTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

import { Book } from '../utils/models/books';
import BookModal from '../components/books/BookModal';
import ProfilePopover from '../components/ProfilePopover';

import SearchBar from '../components/SearchBar';
import { motion } from 'framer-motion';
import SelectedBook from './SelectedBook';
import { Quote } from '../utils/models/quotes';
import LateralMenu from '../components/LateralMenu';
import ButtonsMenu from '../components/ButtonsMenu';
import { DarkColors } from '../theme/theme';
import QuoteCard from '../components/quotes/QuoteCard';
import Masonry from '@mui/lab/Masonry';
import { deleteBook, editBook } from '../utils/books';
import { deleteQuote } from '../utils/quotes';
import { getAllBooksFirebase } from '../services/firebase/database_services';
import { QuoteModal } from '../components/quotes/QuoteModal';
import { ModalState } from '../utils/modals';

const Main = () => {
  const theme = useTheme();

  const [seeMenu, setSeeMenu] = useState<boolean>(false);
  const [openProfilePopover, setOpenProfilePopover] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [upsideDown, setUpsideDown] = useState(false);

  const [openBookModal, setOpenBookModal] = useState<ModalState>(
    ModalState.CLOSED
  );
  const [openQuoteModal, setOpenQuoteModal] = useState<ModalState>(
    ModalState.CLOSED
  );

  const [bookSearch, setBookSearch] = useState<Book[]>([]);

  const [selectedBook, setSelectedBook] = useState<Book>();
  console.log(selectedBook);
  const [selectedQuote, setSelectedQuote] = useState<Quote>();

  useEffect(() => {
    getAllBooksFirebase().then((books) => {
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

    const localStorageBooks = localStorage.getItem('books');
    if (localStorageBooks) {
      const filteredBooks = JSON.parse(localStorageBooks).filter(
        (book: Book) => {
          if (inputSearch === '') {
            return book;
          } else {
            return (
              book.author.toLowerCase().includes(inputSearch) ||
              book.title.toLowerCase().includes(inputSearch)
            );
          }
        }
      );
      setBookSearch(filteredBooks);
    }
  };

  const onClickBookCard = (book: Book) => {
    setUpsideDown(false);
    setSeeMenu(false);
    setSelectedBook(book);
  };

  const updateBookFunc = (updatedBook: Book) => {
    editBook({ setSelectedBook, selectedBook, updatedBook });
  };

  const deleteBookFunc = () => {
    deleteBook({ setSelectedBook, selectedBook });
  };

  const deleteQuoteFunc = (quote: Quote) => {
    deleteQuote({ setSelectedBook, selectedBook, quote });
  };

  return (
    <Stack
      direction="row"
      display="flex"
      height={upsideDown ? '100%' : '100vh'}
      sx={{
        backgroundColor:
          theme.palette.mode === 'dark' ? DarkColors.background : 'white',
      }}
    >
      <BookModal
        modalState={openBookModal}
        onClose={() => setOpenBookModal(ModalState.CLOSED)}
        selectedBook={selectedBook}
        updateBookFunc={updateBookFunc}
      />
      <QuoteModal
        modalState={openQuoteModal}
        onClose={() => {
          setSelectedQuote(undefined);
          setOpenQuoteModal(ModalState.CLOSED);
        }}
        book={selectedBook}
        setSelectedBook={setSelectedBook}
        selectedQuote={selectedQuote}
      />
      <ProfilePopover
        open={openProfilePopover}
        handleClose={() => setOpenProfilePopover(false)}
        anchorEl={anchorEl}
      />
      <LateralMenu
        seeMenu={seeMenu}
        setSeeMenu={setSeeMenu}
        setUpsideDown={setUpsideDown}
        setSelectedBook={setSelectedBook}
        onClickBookCard={onClickBookCard}
        setOpenBookModal={setOpenBookModal}
      />

      {selectedBook && (
        <SelectedBook
          setOpenQuoteModal={setOpenQuoteModal}
          setOpenBookModal={setOpenBookModal}
          selectedBook={selectedBook}
          setSelectedQuote={setSelectedQuote}
          seeMenu={seeMenu}
          setSeeMenu={setSeeMenu}
          deleteBookFunc={deleteBookFunc}
          deleteQuote={deleteQuoteFunc}
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
                y: 80,
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
                  y: upsideDown ? -120 : 0,
                }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <SearchBar handleSearch={handleSearch} />
              </MotionBox>
              <Masonry
                sx={{
                  paddingLeft: seeMenu ? 0 : 4,
                }}
                columns={{ xs: 1, sm: 2, md: 3 }}
                spacing={1}
              >
                {bookSearch?.map((book) => {
                  if (book && book?.quotes && book?.quotes.length) {
                    return book?.quotes.map((quote: Quote) => {
                      return (
                        <QuoteCard
                          key={quote.text}
                          quote={quote}
                          onClick={() => {}}
                          deleteQuote={deleteQuoteFunc}
                        />
                      );
                    });
                  }
                })}
              </Masonry>
            </>
          )}
          {!upsideDown && !selectedBook && (
            <Stack direction="row" spacing={2}>
              <Tooltip title="Add book" arrow>
                <Button
                  variant="contained"
                  sx={{ borderRadius: 100 }}
                  onClick={() => setOpenBookModal(ModalState.CREATING)}
                >
                  <MenuBookIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Add quote" arrow>
                <Button
                  variant="contained"
                  sx={{ borderRadius: 100 }}
                  onClick={() => setOpenQuoteModal(ModalState.CREATING)}
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

import { useState } from 'react';
import { Button, Stack, Tooltip, Typography, useTheme } from '@mui/material';

import { ModalState } from '../../domain/modals';
import { Book } from '../../domain/models/books';
import { Quote } from '../../domain/models/quotes';

import QuoteCard from '../components/quotes/QuoteCard';
import SearchBar from '../components/SearchBar';

import { DarkColors } from '../theme/theme';
import { useStore } from '../store/useStore';

import Masonry from '@mui/lab/Masonry';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import BookModal from '../components/books/BookModal';
import { QuoteModal } from '../components/quotes/QuoteModal';
import SelectedBook from './SelectedBook';

import { deleteBook } from '../../application/books/deleteBook';
import { deleteQuote } from '../../application/quotes/deleteQuote';

const Home = () => {
  const { selectedBook, setSelectedBook } = useStore();
  const theme = useTheme();
  const { setBooks } = useStore();

  const [selectedQuote, setSelectedQuote] = useState<Quote>();
  const [bookSearch, setBookSearch] = useState<Book[]>([]);
  const [openBookModal, setOpenBookModal] = useState<ModalState>(
    ModalState.CLOSED
  );
  const [openQuoteModal, setOpenQuoteModal] = useState<ModalState>(
    ModalState.CLOSED
  );

  const handleSearch = (inputSearch: string) => {
    const localStorageBooks = localStorage.getItem('books');
    if (localStorageBooks) {
      if (!inputSearch.trim().length) {
        setBookSearch([]);
        return;
      }
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

  const deleteBookFunc = () => {
    const newBooks = deleteBook({ selectedBook });
    if (newBooks) {
      setBooks(newBooks);
      setSelectedBook(null);
    }
  };

  const deleteQuoteFunc = (quote: Quote) => {
    const news = deleteQuote({ selectedBook, quote });
    if (news) {
      setBooks(news.newBooks);
      setSelectedBook(news.newBook);
    }
  };

  return (
    <div>
      <BookModal
        modalState={openBookModal}
        onClose={() => setOpenBookModal(ModalState.CLOSED)}
        setSelectedBook={setSelectedBook}
      />
      <QuoteModal
        modalState={openQuoteModal}
        onClose={() => {
          setSelectedQuote(undefined);
          setOpenQuoteModal(ModalState.CLOSED);
        }}
        selectedQuote={selectedQuote}
      />

      {selectedBook && (
        <SelectedBook
          setOpenQuoteModal={setOpenQuoteModal}
          setOpenBookModal={setOpenBookModal}
          setSelectedQuote={setSelectedQuote}
          deleteBookFunc={deleteBookFunc}
          deleteQuote={deleteQuoteFunc}
        />
      )}
      <Stack
        id="main-home-stack"
        direction="row"
        display="flex"
        height={'100vh'}
        sx={{
          backgroundColor:
            theme.palette.mode === 'dark' ? DarkColors.background : 'white',
        }}
      >
        {!selectedBook && (
          <Stack
            id="home-title-stack"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent={selectedBook ? 'start' : 'center'}
            spacing={4}
            margin={7}
            marginTop={2}
          >
            {!selectedBook && (
              <Stack alignItems="center">
                <Typography
                  variant="h3"
                  sx={{
                    height: '55px',
                    color: theme.palette.mode === 'dark' ? 'white' : 'black',
                    fontSize: { sm: '3rem', md: '4rem' },
                  }}
                >
                  Find a
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    color: theme.palette.mode === 'dark' ? 'white' : 'black',
                    fontSize: { sm: '4rem', md: '6rem' },
                  }}
                >
                  BookNote
                </Typography>
              </Stack>
            )}

            {!selectedBook && (
              <>
                <SearchBar handleSearch={handleSearch} />
                {bookSearch.length > 0 && (
                  <Masonry
                    sx={{
                      paddingLeft: 4,
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
                )}
              </>
            )}
            {!selectedBook && (
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
      </Stack>
    </div>
  );
};

export default Home;

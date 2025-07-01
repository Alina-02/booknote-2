import {
  Button,
  Dialog,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Book } from '../../models/books';
import { useForm } from '../../hooks/useForm';
import { Quote } from '../../models/quotes';
import { addNewQuote, udpateQuote } from '../../firebase/database_services';
import { Formik } from 'formik';
import { create } from 'domain';

interface Props {
  open: boolean;
  onClose: () => void;
  book?: Book;
  selectedQuote?: Quote;
}

const AddQuoteModal = (props: Props) => {
  const { open, onClose, book, selectedQuote } = props;
  const allBooks = JSON.parse(localStorage.getItem('books'));

  const [selectedBook, setSelectedBook] = useState<Book | undefined>(book);

  const { handleLogInFormChange, quote, error, setError, setForm } = useForm({
    initialState: {
      quote: '',
    },
  });

  useEffect(() => {
    if (selectedQuote !== undefined) {
      setForm({
        quote: selectedQuote.text,
      });
    }
  }, [selectedQuote]);

  const closeQuoteModal = () => {
    setForm({
      quote: '',
    });
    onClose();
  };

  const handleQuoteSubmit = (form) => {
    const q: Quote = {
      text: form.quote,
    };
    if (!selectedQuote) {
      addNewQuote(q, form.book);
      console.log('crea');
    } else if (selectedQuote) {
      udpateQuote(q, selectedQuote, form.book);
    }
    closeQuoteModal();
  };

  return (
    <Dialog open={open} onClose={closeQuoteModal}>
      <Button
        aria-label="close"
        onClick={closeQuoteModal}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon fontSize="large" color="primary" />
      </Button>
      <Stack mx={3} mb={3} mt={1} spacing={3}>
        <Stack alignItems="center" paddingX={7}>
          <Typography variant="h2">Add quote</Typography>
        </Stack>

        <Formik
          initialValues={
            book
              ? {
                  book: book,
                  quote: '',
                }
              : { book: null, quote: '' }
          }
          onSubmit={handleQuoteSubmit}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Stack spacing={2}>
                  <Stack>
                    <Typography variant="body1" fontWeight={600} ml={1}>
                      Book
                    </Typography>
                    <TextField
                      name="book"
                      title="Book"
                      onChange={(e) => {
                        const book = allBooks?.find(
                          (b: Book) => b.bookId === e.target.value
                        );
                        setFieldValue('book', book);
                      }}
                      disabled={book !== undefined}
                      value={values.book?.bookId}
                      select
                    >
                      {allBooks?.map((b: Book) => (
                        <MenuItem key={b.title + b.author} value={b.bookId}>
                          {b?.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                  <Stack>
                    <Typography variant="body1" fontWeight={600} ml={1}>
                      Quote
                    </Typography>
                    <TextField
                      name="quote"
                      title="Quote"
                      onChange={handleChange}
                      value={values.quote}
                      multiline
                      maxRows={2}
                    />
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={30}
                >
                  <Button
                    variant="outlined"
                    onClick={closeQuoteModal}
                    sx={{ height: '40px' }}
                    fullWidth
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    sx={{ height: '40px' }}
                    fullWidth
                  >
                    Accept
                  </Button>
                </Stack>
              </Stack>
            </form>
          )}
        </Formik>
      </Stack>
    </Dialog>
  );
};

export default AddQuoteModal;

import {
  Button,
  Dialog,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Book } from '../../../domain/models/books';
import { Quote } from '../../../domain/models/quotes';
import { Formik } from 'formik';
import { ModalState } from '../../../domain/modals';
import { useStore } from '../../store/useStore';
import { addQuote } from '../../../application/quotes/addQuote';
import { editQuote } from '../../../application/quotes/updateQuote';

interface Props {
  modalState: ModalState;
  onClose: () => void;

  selectedQuote?: Quote;
}

export const QuoteModal = (props: Props) => {
  const { modalState, onClose, selectedQuote } = props;
  const { selectedBook, setSelectedBook, setBooks } = useStore();

  const localStorageBooks = localStorage.getItem('books');
  const allBooks = localStorageBooks ? JSON.parse(localStorageBooks) : [];

  const open =
    modalState === ModalState.CREATING || modalState === ModalState.EDITING;

  const closeQuoteModal = () => {
    onClose();
  };

  const handleQuoteSubmit = (form: {
    textQuote: string | null;
    book: Book | null;
  }) => {
    const quote: Quote = {
      text: form.textQuote ? form.textQuote : '',
    };

    if (quote && form.book && selectedBook) {
      if (!selectedQuote) {
        const newBooks = addQuote({
          quote: quote,
          setSelectedBook,
          book: form.book,
        });
        if (newBooks) {
          setBooks(newBooks);
        }
      } else if (selectedQuote) {
        const news = editQuote({
          newQuote: quote,
          originalQuote: selectedQuote,
          book: form.book,
        });

        if (news) {
          setSelectedBook(news.newBook);
          setBooks(news.newBooks);
        }
      }
      closeQuoteModal();
    }
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
          <Typography
            variant="h2"
            sx={{ fontSize: { sm: '4rem', md: '5rem' } }}
          >
            {modalState !== ModalState.CREATING ? 'Edit quote' : 'Add quote'}
          </Typography>
        </Stack>

        <Formik
          initialValues={
            selectedBook !== null && !selectedQuote
              ? {
                  book: selectedBook,
                  textQuote: null,
                }
              : selectedBook !== undefined &&
                selectedQuote &&
                modalState === ModalState.EDITING
              ? { book: selectedBook, textQuote: selectedQuote.text }
              : { book: null, textQuote: null }
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
                      disabled={selectedBook !== null}
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
                      name="textQuote"
                      title="Quote"
                      onChange={handleChange}
                      value={values.textQuote}
                      multiline
                      maxRows={2}
                    />
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
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

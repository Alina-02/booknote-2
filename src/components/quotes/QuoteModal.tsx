import {
  Button,
  Dialog,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Book } from '../../utils/models/books';
import { Quote } from '../../utils/models/quotes';
import { Formik } from 'formik';
import { addQuote, editQuote } from '../../utils/quotes';
import { ModalState } from '../../utils/modals';

interface Props {
  modalState: ModalState;
  onClose: () => void;
  book?: Book;
  setSelectedBook: (value: React.SetStateAction<Book | undefined>) => void;

  selectedQuote?: Quote;
}

export const QuoteModal = (props: Props) => {
  const { modalState, onClose, book, setSelectedBook, selectedQuote } = props;
  const allBooks = JSON.parse(localStorage.getItem('books'));

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

    if (quote && form.book && book) {
      if (!selectedQuote) {
        addQuote({ quote: quote, setSelectedBook, book: form.book });
      } else if (selectedQuote) {
        editQuote({
          quote: quote,
          selectedQuote,
          book: form.book,
          setSelectedBook,
        });
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
          <Typography variant="h2">Add quote</Typography>
        </Stack>

        <Formik
          initialValues={
            book !== undefined && !selectedQuote
              ? {
                  book: book,
                  textQuote: null,
                }
              : book !== undefined &&
                selectedQuote &&
                modalState === ModalState.EDITING
              ? { book: book, textQuote: selectedQuote.text }
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

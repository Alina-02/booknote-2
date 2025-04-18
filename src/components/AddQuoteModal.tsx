import {
  Button,
  Dialog,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from '../hooks/useForm';
import { Book } from '../models/books';
import { addNewQuote } from '../firebase/database_services';

interface Props {
  open: boolean;
  onClose: () => void;
  books: Book[];
}

const AddQuoteModal = (props: Props) => {
  const { open, onClose, books } = props;

  const [selectedBook, setSelectedBook] = useState<Book>({} as Book);

  const { handleLogInFormChange, quote, error, setError, setForm } = useForm({
    initialState: {
      quote: '',
    },
  });

  const createNewQuote = () => {
    addNewQuote(quote, selectedBook);
    setForm({
      quote: '',
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Button
        aria-label="close"
        onClick={onClose}
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
        <Stack spacing={2}>
          <Stack>
            <Typography variant="body1" fontWeight={600} ml={1}>
              Book
            </Typography>
            <TextField
              name="book"
              title="Book"
              onChange={(e) => {
                setSelectedBook(
                  books?.find((b) => b.bookId === e.target.value) ??
                    ({} as Book)
                );
              }}
              value={selectedBook.bookId}
              select
            >
              {books.map((b) => (
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
              onChange={handleLogInFormChange}
              value={quote}
              multiline
            />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" spacing={30}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ height: '40px' }}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={createNewQuote}
            sx={{ height: '40px' }}
            fullWidth
          >
            Accept
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddQuoteModal;

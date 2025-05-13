import Masonry from '@mui/lab/Masonry';
import {
  Button,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import QuoteCard from '../quotes/QuoteCard';
import { Book } from '../../models/books';
import { Quote } from '../../models/quotes';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
interface Props {
  setOpenQuoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenBookModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBook: Book;
  setSelectedQuote: React.Dispatch<React.SetStateAction<Quote | undefined>>;
}

const SelectedBook = (props: Props) => {
  const {
    setOpenQuoteModal,
    setOpenBookModal,
    selectedBook,
    setSelectedQuote,
  } = props;
  const theme = useTheme();
  return (
    <>
      <>
        <Tooltip title="Edit book">
          <Button
            variant="contained"
            size="small"
            sx={{
              width: '30px',
              height: '50px',
              position: 'absolute',
              top: 10,
              left: 60,
            }}
            onClick={(e) => {
              setOpenBookModal(selectedBook);
            }}
          >
            <EditIcon fontSize="medium" />
          </Button>
        </Tooltip>
        <Tooltip title="Delete book">
          <Button
            variant="contained"
            size="small"
            sx={{
              width: '30px',
              height: '50px',
              position: 'absolute',
              top: 10,
              left: 90,
            }}
            onClick={(e) => {}}
          >
            <DeleteIcon fontSize="medium" />
          </Button>
        </Tooltip>
      </>
      <Stack alignItems="center">
        <Typography variant="h5">{selectedBook.title}</Typography>
      </Stack>
      {selectedBook.quotes.length > 0 ? (
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={1}>
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
            <QuoteCard
              quote={quote}
              book={selectedBook}
              onClick={() => {
                setSelectedQuote(quote);
                setOpenQuoteModal(true);
              }}
            />
          ))}
        </Masonry>
      ) : (
        <Stack
          height="100%"
          justifyContent="center"
          onClick={() => setOpenQuoteModal(true)}
        >
          <Button variant="contained">
            Nothing to see, but you can add something
          </Button>
        </Stack>
      )}
    </>
  );
};

export default SelectedBook;

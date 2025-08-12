import React, { useState } from 'react';
import Masonry from '@mui/lab/Masonry';
import {
  Button,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';

import QuoteCard from '../components/quotes/QuoteCard';
import DeleteBookModal from '../components/books/DeleteBookModal';

import { Quote } from '../../domain/models/quotes';
import { ModalState } from '../../domain/modals';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStore } from '../store/useStore';

interface Props {
  setOpenQuoteModal: React.Dispatch<React.SetStateAction<ModalState>>;
  setOpenBookModal: React.Dispatch<React.SetStateAction<ModalState>>;
  setSelectedQuote: React.Dispatch<React.SetStateAction<Quote | undefined>>;

  deleteBookFunc: () => void;
  deleteQuote: (quote: Quote) => void;
}

const SelectedBook = (props: Props) => {
  const {
    setOpenQuoteModal,
    setOpenBookModal,

    setSelectedQuote,

    deleteBookFunc,
    deleteQuote,
  } = props;
  const theme = useTheme();
  const { selectedBook } = useStore();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  return (
    <Stack
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      direction="row"
    >
      <Tooltip title="Edit book" placement={'right'} arrow>
        <Button
          size="small"
          variant={'contained'}
          sx={{
            width: '50px',
            height: '50px',
            position: 'absolute',
            top: 70,
            left: 10,
            zIndex: 2,
          }}
          onClick={() => {
            setOpenBookModal(ModalState.EDITING);
          }}
        >
          <EditIcon fontSize="medium" />
        </Button>
      </Tooltip>
      <Tooltip title="Delete book" placement={'right'} arrow>
        <Button
          size="small"
          variant={'contained'}
          sx={{
            width: '50px',
            height: '50px',
            position: 'absolute',
            top: 130,
            left: 10,
            zIndex: 2,
          }}
          onClick={() => {
            setDeleteModal(true);
          }}
        >
          <DeleteIcon fontSize="medium" />
        </Button>
      </Tooltip>

      <Stack width="100%" paddingX={3} paddingBottom={3} overflow="scroll">
        <Stack
          alignItems="center"
          padding={5}
          sx={{
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
          }}
        >
          <Typography variant="h5">{selectedBook?.title}</Typography>
        </Stack>
        <DeleteBookModal
          open={deleteModal}
          setOpen={setDeleteModal}
          title={selectedBook ? selectedBook.title : 'No title'}
          deleteBookFunc={deleteBookFunc}
        />
        {selectedBook?.quotes !== undefined &&
        selectedBook?.quotes?.length > 0 ? (
          <Masonry
            sx={{ paddingLeft: 4 }}
            columns={{ xs: 1, sm: 2, md: 3 }}
            spacing={1}
          >
            <Paper
              elevation={2}
              sx={{
                backgroundColor: theme.palette.primary.light,
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                fullWidth
                onClick={() => setOpenQuoteModal(ModalState.EDITING)}
              >
                Add quote
              </Button>
            </Paper>
            {selectedBook?.quotes?.map((quote) => (
              <QuoteCard
                key={quote.text}
                quote={quote}
                onClick={() => {
                  setSelectedQuote(quote);
                  setOpenQuoteModal(ModalState.EDITING);
                }}
                deleteQuote={deleteQuote}
              />
            ))}
          </Masonry>
        ) : (
          <Stack
            height="100%"
            alignItems="center"
            justifyContent="center"
            onClick={() => setOpenQuoteModal(ModalState.CREATING)}
          >
            <Button variant="contained" sx={{ width: '500px' }}>
              Nothing to see, but you can add something
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default SelectedBook;

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

import { Book } from '../utils/models/books';
import { Quote } from '../utils/models/quotes';
import { ModalState } from '../utils/modals';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  setOpenQuoteModal: React.Dispatch<React.SetStateAction<ModalState>>;
  setOpenBookModal: React.Dispatch<React.SetStateAction<ModalState>>;
  selectedBook: Book;
  setSelectedQuote: React.Dispatch<React.SetStateAction<Quote | undefined>>;
  setSeeMenu: React.Dispatch<React.SetStateAction<boolean>>;
  seeMenu: boolean;
  deleteBookFunc: () => void;
  deleteQuote: (quote: Quote) => void;
}

const SelectedBook = (props: Props) => {
  const {
    setOpenQuoteModal,
    setOpenBookModal,
    selectedBook,
    setSeeMenu,
    setSelectedQuote,
    seeMenu,
    deleteBookFunc,
    deleteQuote,
  } = props;
  const theme = useTheme();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  return (
    <Stack
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      direction="row"
    >
      <Stack
        minWidth="70px"
        width="70px"
        height="100vh"
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Tooltip title="Books" arrow>
          <Button
            size="small"
            sx={{
              width: '30px',
              height: '50px',
              color: theme.palette.primary.contrastText,
            }}
            onClick={() => {
              setSeeMenu(!seeMenu);
            }}
          >
            <MenuIcon sx={{ fontSize: '30px' }} />
          </Button>
        </Tooltip>
        <Tooltip title="Edit book" arrow>
          <Button
            size="small"
            sx={{
              width: '30px',
              height: '50px',
              color: theme.palette.primary.contrastText,
            }}
            onClick={() => {
              setOpenBookModal(ModalState.EDITING);
            }}
          >
            <EditIcon fontSize="medium" />
          </Button>
        </Tooltip>
        <Tooltip title="Delete book" arrow>
          <Button
            size="small"
            sx={{
              width: '30px',
              height: '50px',
              color: theme.palette.primary.contrastText,
            }}
            onClick={() => {
              setDeleteModal(true);
            }}
          >
            <DeleteIcon fontSize="medium" />
          </Button>
        </Tooltip>
      </Stack>
      <Stack
        width="100%"
        height="100%"
        paddingX={3}
        paddingBottom={3}
        overflow="scroll"
      >
        <Stack
          alignItems="center"
          padding={5}
          sx={{
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
          }}
        >
          <Typography variant="h5">{selectedBook.title}</Typography>
        </Stack>
        <DeleteBookModal
          open={deleteModal}
          setOpen={setDeleteModal}
          title={selectedBook?.title}
          deleteBookFunc={deleteBookFunc}
        />
        {selectedBook.quotes !== undefined &&
        selectedBook?.quotes?.length > 0 ? (
          <Masonry
            sx={{ paddingLeft: seeMenu ? 0 : 4 }}
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

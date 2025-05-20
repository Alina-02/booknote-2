import Masonry from '@mui/lab/Masonry';
import {
  Button,
  Divider,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import QuoteCard from '../quotes/QuoteCard';
import { Book } from '../../models/books';
import { Quote } from '../../models/quotes';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';

import DeleteBookModal from '../books/DeleteBookModal';
interface Props {
  setOpenQuoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenBookModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBook: Book;
  setSelectedQuote: React.Dispatch<React.SetStateAction<Quote | undefined>>;
  setSeeMenu: React.Dispatch<React.SetStateAction<boolean>>;
  seeMenu: boolean;
}

const SelectedBook = (props: Props) => {
  const {
    setOpenQuoteModal,
    setOpenBookModal,
    selectedBook,
    setSeeMenu,
    setSelectedQuote,
    seeMenu,
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
            onClick={(e) => {
              setOpenBookModal(true);
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
            onClick={(e) => {
              setDeleteModal(true);
            }}
          >
            <DeleteIcon fontSize="medium" />
          </Button>
        </Tooltip>
      </Stack>
      <Stack height="100%" paddingX={3}>
        <Stack alignItems="center" padding={5}>
          <Typography variant="h5">{selectedBook.title}</Typography>
        </Stack>
        <DeleteBookModal
          open={deleteModal}
          setOpen={setDeleteModal}
          title={selectedBook?.title}
          selectedBook={selectedBook}
        />
        {selectedBook?.quotes?.length > 0 ? (
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
      </Stack>
    </Stack>
  );
};

export default SelectedBook;

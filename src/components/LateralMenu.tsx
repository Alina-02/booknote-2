import { Button, Stack, Tooltip, useTheme } from '@mui/material';
import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

import { Book } from '../models/books';
import BookCard from './books/BookCard';

interface Props {
  books: Book[];
  seeMenu: boolean;
  setSeeMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setUpsideDown: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book | undefined>>;
  onClickBookCard: (book: Book) => void;
  setOpenBookModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LateralMenu = (props: Props) => {
  const {
    books,
    seeMenu,
    setSeeMenu,
    setUpsideDown,
    setSelectedBook,
    onClickBookCard,
    setOpenBookModal,
  } = props;
  const theme = useTheme();
  return (
    <Stack
      minWidth="350px"
      paddingX={2}
      paddingY={2}
      justifyContent="space-between"
      sx={{
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <Stack spacing={2}>
        <Stack direction={'row'} spacing={1}>
          <Tooltip title="Books" placement={'bottom'} arrow>
            <Button
              variant="contained"
              size="small"
              sx={{
                width: '30px',
                height: '50px',
              }}
              onClick={() => {
                setSeeMenu(!seeMenu);
              }}
            >
              <MenuIcon sx={{ fontSize: '30px' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Main page" arrow>
            <Button
              variant="contained"
              size="small"
              sx={{
                width: '30px',
                height: '50px',
              }}
              onClick={() => {
                setUpsideDown(false);
                setSeeMenu(false);
                setSelectedBook(undefined);
              }}
            >
              <HomeIcon sx={{ fontSize: '30px' }} />
            </Button>
          </Tooltip>
        </Stack>
        <Stack spacing={1} sx={{ overflowY: 'scroll' }} maxHeight="750px">
          {books?.map((book) => (
            <BookCard book={book} onClick={() => onClickBookCard(book)} />
          ))}
        </Stack>
      </Stack>
      <Button
        sx={{ marginTop: 2 }}
        variant="contained"
        onClick={() => setOpenBookModal(true)}
      >
        Add book
      </Button>
    </Stack>
  );
};

export default LateralMenu;

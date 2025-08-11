import { Button, Stack, Tooltip, useTheme } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

import BookCard from './books/BookCard';

import { Sidebar } from 'react-pro-sidebar';
import { Book } from '../../domain/models/books';
import { useStore } from '../store/useStore';

interface Props {
  seeMenu: boolean;
  setSeeMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const LateralMenu = (props: Props) => {
  const { seeMenu, setSeeMenu } = props;
  const theme = useTheme();

  const { setSelectedBook } = useStore();

  return (
    <Sidebar
      collapsed={!seeMenu}
      collapsedWidth="0"
      width="350px"
      style={{ borderRightStyle: 'none' }}
    >
      <Stack
        height="100vh"
        paddingX={2}
        paddingY={2}
        justifyContent="space-between"
        sx={{
          backgroundColor: theme.palette.primary.light,
          overflow: 'hidden',
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
                  setSeeMenu(false);
                  setSelectedBook(null);
                }}
              >
                <HomeIcon sx={{ fontSize: '30px' }} />
              </Button>
            </Tooltip>
          </Stack>
          <Stack spacing={1} sx={{ overflow: 'scroll' }} height="700px">
            {JSON.parse(localStorage.getItem('books'))?.map((book: Book) => (
              <BookCard
                book={book}
                onClick={() => setSelectedBook(book)}
                key={book.bookId}
              />
            ))}
          </Stack>
        </Stack>
        {/*<Button
          sx={{ marginTop: 2 }}
          variant="contained"
          onClick={() => setOpenBookModal(ModalState.CREATING)}
        >
          Add book
        </Button>*/}
      </Stack>
    </Sidebar>
  );
};

export default LateralMenu;

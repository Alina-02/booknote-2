import { Button, Stack, Tooltip, useTheme } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

import BookCard from '../books/BookCard';

import { Sidebar } from 'react-pro-sidebar';
import { useMediaQuery } from 'react-responsive';

import { Book } from '../../../domain/models/books';
import { useStore } from '../../store/useStore';

interface Props {
  seeMenu: boolean;
  setSeeMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const LateralMenu = (props: Props) => {
  const { seeMenu, setSeeMenu } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 700 });

  const { setSelectedBook, books } = useStore();

  return (
    <Sidebar
      collapsed={!seeMenu}
      collapsedWidth="0"
      width={isMobile ? '100vw' : '300px'}
      style={{
        borderRightStyle: 'none',
        position: 'fixed',
        zIndex: 3,
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      }}
    >
      <Stack
        height="100vh"
        paddingX={'10px'}
        paddingY={'10px'}
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
          <Stack
            spacing={1}
            sx={{ overflowY: 'auto', paddingRight: 1.5 }}
            height="calc(100vh - 100px)"
          >
            {books?.map((book: Book, index) => (
              <BookCard
                book={book}
                onClick={() => {
                  setSeeMenu(false);
                  setSelectedBook(book);
                }}
                key={`${book.bookId}` + index}
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

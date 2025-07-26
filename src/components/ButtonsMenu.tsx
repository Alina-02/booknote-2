import { Button, Stack, Tooltip } from '@mui/material';
import React from 'react';

import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { Book } from '../utils/models/books';

interface Props {
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  setOpenProfilePopover: React.Dispatch<React.SetStateAction<boolean>>;
  seeMenu: boolean;
  setSeeMenu: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBook: Book | undefined;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book | undefined>>;
  setUpsideDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonsMenu = (props: Props) => {
  const {
    setAnchorEl,
    setOpenProfilePopover,
    seeMenu,
    setSeeMenu,
    selectedBook,
  } = props;
  return (
    <Stack>
      <Button
        size="small"
        sx={{
          width: '50px',
          height: '50px',
          position: 'absolute',
          top: 10,
          right: 10,
        }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setOpenProfilePopover(true);
        }}
      >
        <PersonIcon fontSize="large" />
      </Button>
      {!seeMenu && !selectedBook && (
        <Tooltip title="Books" placement={'right'} arrow>
          <Button
            variant={'contained'}
            size="small"
            sx={{
              width: '30px',
              height: '50px',
              position: 'absolute',
              top: 10,
              left: 10,
            }}
            onClick={() => {
              setSeeMenu(!seeMenu);
            }}
          >
            <MenuIcon sx={{ fontSize: '30px' }} />
          </Button>
        </Tooltip>
      )}
      {/*selectedBook && !seeMenu && (
        <Tooltip title="Main page" arrow>
          <Button
            size="small"
            sx={{
              width: '30px',
              height: '50px',
              position: 'absolute',
              top: !seeMenu ? 50 : 10,
              left: !seeMenu ? 10 : 60,
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
      )*/}
    </Stack>
  );
};

export default ButtonsMenu;

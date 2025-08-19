import { Button, Stack, Tooltip, useTheme } from '@mui/material';
import React, { useState } from 'react';

import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import ProfilePopover from './ProfilePopover';

interface Props {
  seeMenu: boolean;
  setSeeMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonsMenu = (props: Props) => {
  const { seeMenu, setSeeMenu } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [openProfilePopover, setOpenProfilePopover] = useState<boolean>(false);
  const theme = useTheme();

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
          zIndex: 2,
        }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setOpenProfilePopover(true);
        }}
      >
        <PersonIcon
          fontSize="large"
          sx={{
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : 'primary',
          }}
        />
      </Button>

      <ProfilePopover
        open={openProfilePopover}
        handleClose={() => setOpenProfilePopover(false)}
        anchorEl={anchorEl}
      />

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

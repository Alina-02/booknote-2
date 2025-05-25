import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  useColorScheme,
} from '@mui/material';
import React, { useContext } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import ContrastIcon from '@mui/icons-material/Contrast';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router';

interface Props {
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLButtonElement | null;
}

const ProfilePopover = (props: Props) => {
  const { open, handleClose, anchorEl } = props;

  const navigate = useNavigate();
  const { mode, setMode } = useColorScheme();

  const { handleLogOut } = useContext(AuthContext);

  const logOut = () => {
    handleLogOut();
    goToLogIn();
  };

  const goToLogIn = () => {
    navigate('/');
  };

  const changeTheme = () => {
    if (mode == 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  return (
    <Popover
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <MenuList sx={{ marginX: 1 }}>
        <MenuItem onClick={changeTheme}>
          <ListItemIcon>
            <ContrastIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText>{mode === 'dark' ? 'Light' : 'Dark'}</ListItemText>
        </MenuItem>
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText>Log-out</ListItemText>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

export default ProfilePopover;

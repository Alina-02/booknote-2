import { Button } from '@mui/material';
import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  onClickDeleteButton: () => void;
  onClickEditButotn: () => void;
}

const Settings = (props: Props) => {
  const { onClickDeleteButton, onClickEditButotn } = props;
  return (
    <>
      <Button
        size="small"
        sx={{
          width: '50px',
          height: '50px',
          position: 'absolute',
          top: 130,
          left: 10,
        }}
        onClick={onClickDeleteButton}
      >
        <DeleteIcon fontSize="large" />
      </Button>
      <Button
        size="small"
        sx={{
          width: '50px',
          height: '50px',
          position: 'absolute',
          top: 90,
          left: 10,
        }}
        onClick={onClickEditButotn}
      >
        <EditIcon fontSize="large" />
      </Button>
    </>
  );
};

export default Settings;

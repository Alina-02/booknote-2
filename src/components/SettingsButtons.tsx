import { Button, Stack, Tooltip } from '@mui/material';
import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  onClickDeleteButton: () => void;
  onClickEditButton: () => void;
  direction?: 'row' | 'column';
  spacing?: number;
}

const SettingsButtons = (props: Props) => {
  const {
    onClickDeleteButton,
    onClickEditButton,
    direction = 'column',
    spacing = 1,
  } = props;

  return (
    <Stack direction={direction} spacing={spacing}>
      <Tooltip title="Delete" arrow>
        <Button
          size="small"
          sx={{
            width: '50px',
            height: '50px',
          }}
          onClick={onClickDeleteButton}
        >
          <DeleteIcon fontSize="medium" />
        </Button>
      </Tooltip>
      <Tooltip title="Edit" arrow>
        <Button
          size="small"
          sx={{
            width: '50px',
            height: '50px',
          }}
          onClick={onClickEditButton}
        >
          <EditIcon fontSize="medium" />
        </Button>
      </Tooltip>
    </Stack>
  );
};

export default SettingsButtons;

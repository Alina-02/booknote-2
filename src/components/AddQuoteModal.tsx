import {
  Box,
  Button,
  Dialog,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddQuoteModal = (props: Props) => {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <Stack margin={3} spacing={3}>
        <Stack alignItems="center" paddingX={7}>
          <Typography variant="h2">Add quote</Typography>
        </Stack>
        <Stack spacing={2}>
          <Stack>
            <Typography variant="body1">Book</Typography>
            <TextField></TextField>
          </Stack>
          <Stack>
            <Typography variant="body1">Quote</Typography>
            <TextField multiline />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onClose}>
            Accept
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddQuoteModal;

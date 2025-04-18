import { Button, Dialog, Stack, TextField, Typography } from '@mui/material';
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
      <Button
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon fontSize="large" color="primary" />
      </Button>
      <Stack mx={3} mb={3} mt={1} spacing={3}>
        <Stack alignItems="center" paddingX={7}>
          <Typography variant="h2">Add quote</Typography>
        </Stack>
        <Stack spacing={2}>
          <Stack>
            <Typography variant="body1" fontWeight={600} ml={1}>
              Book
            </Typography>
            <TextField></TextField>
          </Stack>
          <Stack>
            <Typography variant="body1" fontWeight={600} ml={1}>
              Quote
            </Typography>
            <TextField multiline />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" spacing={30}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ height: '40px' }}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ height: '40px' }}
            fullWidth
          >
            Accept
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddQuoteModal;

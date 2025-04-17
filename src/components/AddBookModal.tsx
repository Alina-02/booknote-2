import {
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddBookModal = (props: Props) => {
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
        <Stack alignItems="center">
          <Typography variant="h2">Add book</Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Stack>
            <Typography variant="body1">Title</Typography>
            <TextField name="Title" title="Title" />
          </Stack>
          <Stack>
            <Typography variant="body1">Author</Typography>
            <TextField name="Author" title="Author" />
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="body1">Add tags</Typography>
          <Stack direction="row" spacing={1}>
            <Chip label="Fantasy" />
            <Chip label="Romance" />
            <Chip label="Novel" />
            <Chip label="Terror" />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack width="30%">
            <Typography variant="body1">Cover</Typography>
            <Box
              height="125px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ backgroundColor: 'gray' }}
            >
              <Button>
                <FileUploadIcon />
              </Button>
            </Box>
          </Stack>
          <Stack width="70%">
            <Typography variant="body1">First quote</Typography>
            <Box height="125px">
              <TextField
                sx={{ height: '125px' }}
                maxRows="4"
                multiline
                fullWidth
              />
            </Box>
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

export default AddBookModal;

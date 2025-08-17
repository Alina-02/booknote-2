import { Button, Dialog, Stack, Typography } from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  deleteBookFunc: () => void;
}

const DeleteBookModal = (props: Props) => {
  const { open, setOpen, title, deleteBookFunc } = props;

  const onDeleteBook = () => {
    deleteBookFunc();
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <Stack margin={1.5} alignItems="center" spacing={2}>
        <Stack paddingX={2} paddingTop={1} alignItems="center" spacing={2}>
          <Typography variant="body1">
            Are you sure you want to delete this book?
          </Typography>
          <Typography variant="body2">{title}</Typography>
        </Stack>
        <Stack
          justifyContent="space-between"
          direction="row"
          width="100%"
          spacing={2}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={onDeleteBook}
            fullWidth
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default DeleteBookModal;

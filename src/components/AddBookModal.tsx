import {
  Box,
  Button,
  Chip,
  Dialog,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import { addNewBook } from '../firebase/database_services';
import { useForm } from '../hooks/useForm';
import { Book } from '../models/books';
import { BookTags } from '../constants/bookTags';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddBookModal = (props: Props) => {
  const { open, onClose } = props;

  const theme = useTheme();

  const [tags, setTags] = useState<string[]>([]);

  const {
    handleLogInFormChange,
    title,
    author,

    error,
    setError,
    setForm,
  } = useForm({
    initialState: {
      title: '',
      author: '',
    },
  });

  const createNewBook = () => {
    const book: Book = {
      title: title,
      author: author,
      tags: tags,
    };
    addNewBook(book);
    setForm({
      title: '',
      author: '',
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
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
        <Stack alignItems="center">
          <Typography variant="h2">Add book</Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Stack width="100%">
            <Typography variant="body1" fontWeight={600} ml={1}>
              Title
            </Typography>
            <TextField
              name="title"
              title="Title"
              onChange={handleLogInFormChange}
              value={title}
              fullWidth
            />
          </Stack>
          <Stack width="100%">
            <Typography variant="body1" fontWeight={600} ml={1}>
              Author
            </Typography>
            <TextField
              name="author"
              title="Author"
              onChange={handleLogInFormChange}
              value={author}
              fullWidth
            />
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="body1" fontWeight={600} ml={1}>
            Add tags
          </Typography>
          <Stack direction="row" spacing={1}>
            {BookTags.map((tag) => {
              const selected = tags?.includes(tag?.name);
              return (
                <Chip
                  label={tag.name}
                  sx={{
                    backgroundColor: selected ? tag.color : 'auto',
                  }}
                  clickable
                  onClick={() => {
                    if (selected) {
                      setTags(tags.filter((t) => t !== tag.name));
                    } else {
                      setTags([...tags, tag.name]);
                    }
                  }}
                />
              );
            })}
          </Stack>
        </Stack>
        <Stack direction="row" spacing={3}>
          <Stack width="20%" spacing={1}>
            <Typography variant="body1" fontWeight={600} ml={1}>
              Cover
            </Typography>
            <Box
              height="175px"
              width="175px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="10px"
              sx={{ backgroundColor: theme.palette.primary.light }}
            >
              <Button>
                <FileUploadIcon fontSize="large" />
              </Button>
            </Box>
          </Stack>
          <Stack width="80%" spacing={1}>
            <Typography variant="body1" fontWeight={600} ml={1}>
              First quote
            </Typography>

            <Box height="175px">
              <TextField
                sx={{ height: '175px' }}
                maxRows="4"
                multiline
                fullWidth
              />
            </Box>
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
            onClick={createNewBook}
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

export default AddBookModal;

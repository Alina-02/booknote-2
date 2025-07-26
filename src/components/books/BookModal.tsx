import {
  Box,
  Button,
  Chip,
  Dialog,
  getContrastRatio,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
//import { addNewBook } from '../../firebase/database_services';
import { useForm } from '../../hooks/useForm';
import { Book } from '../../utils/models/books';
import { BookTags } from '../../utils/bookTags';
import { Formik } from 'formik';
import { addBook } from '../../utils/books';

interface Props {
  open: boolean;
  onClose: () => void;
  selectedBook?: Book;
  updateBookFunc: (updatedBook: Book) => void;
}

const BookModal = (props: Props) => {
  const { open, onClose, selectedBook, updateBookFunc } = props;
  const theme = useTheme();

  const [tags, setTags] = useState<string[]>(
    selectedBook ? selectedBook.tags : []
  );
  const [cover, setCover] = useState<File | null>(null);
  const hiddenFileInput = useRef(null);

  const { setForm } = useForm({
    initialState: {
      title: selectedBook ? selectedBook?.title : '',
      author: selectedBook ? selectedBook?.author : '',
    },
  });

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCover(e.target.files[0]);
    }
  };

  const createNewBook = (values: Book) => {
    const book: Book = {
      title: values.title,
      author: values.author,
      tags: values.tags,
      quotes: [],
    };

    if (selectedBook) {
      updateBookFunc(book);
    } else {
      addBook({ cover, book });
    }
    closeBookModal();
  };

  const closeBookModal = () => {
    setTags([]);
    setForm({
      title: '',
      author: '',
    });
    onClose();
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

        <Formik
          initialValues={
            selectedBook
              ? {
                  title: selectedBook.title,
                  author: selectedBook.author,
                  tags: selectedBook.tags,
                }
              : { title: '', author: '', tags: [''], quotes: [] }
          }
          onSubmit={createNewBook}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={1}>
                <Stack direction="row" spacing={2}>
                  <Stack width="100%">
                    <Typography variant="body1" fontWeight={600} ml={1}>
                      Title
                    </Typography>
                    <TextField
                      name="title"
                      title="Title"
                      onChange={handleChange}
                      value={values.title}
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
                      onChange={handleChange}
                      value={values.author}
                      fullWidth
                    />
                  </Stack>
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="body1" fontWeight={600} ml={1}>
                    Add tags
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    paddingBottom={1}
                    sx={{ overflowX: 'scroll' }}
                  >
                    {BookTags.map((tag) => {
                      const selected = values.tags?.includes(tag?.name);
                      return (
                        <Chip
                          key={tag.name}
                          label={tag.name}
                          sx={{
                            backgroundColor: selected ? tag.color : 'auto',
                            color: selected
                              ? getContrastRatio(tag.color, '#fff') > 4.5
                                ? '#fff'
                                : '#111'
                              : 'auto',
                          }}
                          clickable
                          onClick={() => {
                            if (selected) {
                              setFieldValue(
                                'tags',
                                tags.filter((t) => t !== tag.name)
                              );
                            } else {
                              setFieldValue('tags', [...tags, tag.name]);
                            }
                          }}
                        />
                      );
                    })}
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={3}>
                  <Stack spacing={1}>
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
                      <input
                        id="file"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleChange}
                        ref={hiddenFileInput}
                        accept="image/png,image/jpeg"
                      />
                      <Button
                        fullWidth
                        sx={{ height: '100%' }}
                        onClick={() => {
                          if (hiddenFileInput !== null) {
                            hiddenFileInput?.current.click();
                          }
                        }}
                      >
                        <FileUploadIcon fontSize="large" />
                      </Button>
                    </Box>
                  </Stack>
                  <Stack minWidth="200px" spacing={1} width="100%">
                    <Typography variant="body1" fontWeight={600} ml={1}>
                      First quote
                    </Typography>

                    <Box height="175px">
                      <TextField
                        sx={{ height: '175px' }}
                        onChange={handleChange}
                        value={values.quotes ? values.quotes[0] : ''}
                        maxRows="4"
                        multiline
                        fullWidth
                      />
                    </Box>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={30}
                  paddingTop={2}
                >
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
                    type="submit"
                    sx={{ height: '40px' }}
                    disabled={isSubmitting}
                    fullWidth
                  >
                    Accept
                  </Button>
                </Stack>
              </Stack>
            </form>
          )}
        </Formik>
      </Stack>
    </Dialog>
  );
};

export default BookModal;

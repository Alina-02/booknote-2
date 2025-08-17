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
import React, { useEffect, useRef, useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import { Book } from '../../../domain/models/books';
import { BookTags } from '../../../domain/bookTags';
import { Formik } from 'formik';
import { ModalState } from '../../../domain/modals';
import { addBook } from '../../../application/books/addBook';
import { useStore } from '../../store/useStore';

interface Props {
  modalState: ModalState;
  onClose: () => void;
  selectedBook?: Book;
  updateBookFunc: (updatedBook: Book) => void;
}

const BookModal = (props: Props) => {
  const { modalState, onClose, selectedBook, updateBookFunc } = props;
  const { setBooks, books } = useStore();
  const theme = useTheme();

  const open =
    modalState === ModalState.CREATING || modalState === ModalState.EDITING;

  const [tags, setTags] = useState<string[]>(
    selectedBook ? selectedBook.tags : []
  );
  const [cover, setCover] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setCover(file);
      setCoverImageUrl(URL.createObjectURL(file));
    } else {
      setCover(null);
      setCoverImageUrl(null);
    }
  };

  useEffect(() => {
    return () => {
      if (coverImageUrl) {
        URL.revokeObjectURL(coverImageUrl);
      }
    };
  }, [coverImageUrl]);

  const createNewBook = (values: Book) => {
    const book: Book = {
      title: values.title,
      author: values.author,
      tags: values.tags,
      quotes: values?.quotes[0].text.trim() === '' ? undefined : values.quotes,
    };

    if (modalState === ModalState.EDITING) {
      updateBookFunc(book);
    } else {
      const newBooks = addBook({ cover, book });
      if (newBooks) {
        setBooks(newBooks);
      }
    }
    closeBookModal();
  };

  const closeBookModal = () => {
    setTags([]);
    setCover(null);
    setCoverImageUrl(null);
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
          <Typography
            variant="h2"
            sx={{ fontSize: { sm: '4rem', md: '6rem' } }}
          >
            {modalState !== ModalState.CREATING ? 'Edit book' : 'Add book'}
          </Typography>
        </Stack>

        <Formik
          initialValues={
            modalState === ModalState.EDITING && selectedBook
              ? {
                  title: selectedBook.title,
                  author: selectedBook.author,
                  tags: selectedBook.tags,
                }
              : { title: '', author: '', tags: [''], quotes: [{ text: '' }] }
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
                      sx={{
                        backgroundImage: coverImageUrl
                          ? `url(${coverImageUrl})`
                          : 'none',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundColor: theme.palette.primary.light,
                      }}
                    >
                      <input
                        id="file"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleCoverChange}
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

                    <TextField
                      disabled={modalState === ModalState.EDITING}
                      sx={{ height: '100%' }}
                      onChange={(e) => {
                        const firstQuote = e.target.value;
                        setFieldValue('quotes', [{ text: firstQuote }]);
                      }}
                      value={values.quotes ? values.quotes[0].text : ''}
                      maxRows="6"
                      multiline
                      fullWidth
                    />
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

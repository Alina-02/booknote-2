import React from 'react';
import { Book } from '../models/books';
import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

interface Props {
  book: Book;
}

const BookCard = (props: Props) => {
  const theme = useTheme();
  const { book } = props;
  return (
    <Card sx={{ display: 'flex', width: '100%', cursor: 'pointer' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Stack direction="row" alignItems="center">
          <Typography component="div" variant="h6">
            {book?.title}
          </Typography>
          <Typography component="div" variant="body1" fontStyle="italic">
            - {book?.author}
          </Typography>
        </Stack>
        <Typography component="div" variant="body1">
          {book?.favQuote ?? 'Add a favorite quote.'}
        </Typography>
      </CardContent>
      {book?.bookCover && (
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          alt={`${book.title} cover`}
        />
      )}
      {!book?.bookCover && (
        <CardMedia
          sx={{ width: 151, backgroundColor: theme.palette.primary.main }}
        />
      )}
    </Card>
  );
};

export default BookCard;

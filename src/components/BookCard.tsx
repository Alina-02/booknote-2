import React from 'react';
import { Book } from '../models/books';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';

interface Props {
  book: Book;
}

const BookCard = (props: Props) => {
  const { book } = props;
  return (
    <Card sx={{ display: 'flex', width: '100%' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Stack direction="row" alignItems="center">
          <Typography component="div" variant="h6">
            {book.title}
          </Typography>
          <Typography component="div" variant="body1" fontStyle="italic">
            - {book.author}
          </Typography>
        </Stack>
        <Typography component="div" variant="body1">
          {book.favQuote}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        alt={`${book.title} cover`}
      ></CardMedia>
    </Card>
  );
};

export default BookCard;

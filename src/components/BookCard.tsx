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
    <Card
      sx={{
        display: 'flex',
        width: '100%',
        cursor: 'pointer',
      }}
    >
      <CardContent sx={{ flex: '1 0 auto', width: '250px', paddingTop: 0 }}>
        <Stack direction="row" alignItems="center" height="50px">
          <Typography
            component="div"
            variant="body1"
            fontWeight={600}
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {book?.title}
          </Typography>
        </Stack>
        <Typography
          component="div"
          variant="body1"
          fontStyle="italic"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          - {book?.author}
        </Typography>
      </CardContent>
      {book?.bookCover && (
        <CardMedia
          component="img"
          sx={{ width: 140 }}
          alt={`${book.title} cover`}
        />
      )}
      {!book?.bookCover && (
        <CardMedia
          sx={{ width: 140, backgroundColor: theme.palette.primary.main }}
        />
      )}
    </Card>
  );
};

export default BookCard;

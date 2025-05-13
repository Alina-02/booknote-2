import { Paper, Stack, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { Quote } from '../../models/quotes';
import SettingsButtons from '../SettingsButtons';
import { Book } from '../../models/books';
import { deleteQuote } from '../../firebase/database_services';

interface Props {
  quote: Quote;
  book: Book;
  onClick: () => void;
}

const QuoteCard = (props: Props) => {
  const { quote, book, onClick } = props;
  const theme = useTheme();

  const [hover, setHover] = useState<boolean>(false);

  return (
    <Paper
      elevation={2}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        position: 'relative',
        padding: 2,
        backgroundColor: theme.palette.primary.light,
        borderRadius: '10px',
      }}
    >
      <Typography variant="body2" textAlign="justify">
        {quote.text}
      </Typography>

      {hover && (
        <Stack
          height="100%"
          width="100%"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: '10px',
            backgroundColor: theme.palette.primary.light,
          }}
        >
          <SettingsButtons
            spacing={5}
            direction="row"
            onClickDeleteButton={() => {
              deleteQuote(quote, book);
            }}
            onClickEditButton={onClick}
          />
        </Stack>
      )}
    </Paper>
  );
};

export default QuoteCard;

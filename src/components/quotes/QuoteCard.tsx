import { Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Quote } from '../models/quotes';

interface Props {
  quote: Quote;
}

const QuoteCard = (props: Props) => {
  const { quote } = props;
  const theme = useTheme();
  return (
    <Paper
      elevation={2}
      sx={{
        backgroundColor: theme.palette.primary.light,
        padding: 2,
        borderRadius: '10px',
      }}
    >
      <Typography variant="body1">{quote.text}</Typography>
    </Paper>
  );
};

export default QuoteCard;

import { Paper, Typography, useTheme } from '@mui/material';
import React from 'react';

interface Props {
  quote: string;
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
      <Typography variant="body1">{quote}</Typography>
    </Paper>
  );
};

export default QuoteCard;

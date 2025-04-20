import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

interface Props {
  quote: string;
}

const QuoteCard = (props: Props) => {
  const { quote } = props;
  const theme = useTheme();
  return (
    <Box
      padding={2}
      borderRadius={'10px'}
      sx={{ backgroundColor: theme.palette.primary.light }}
    >
      <Typography variant="body1">{quote}</Typography>
    </Box>
  );
};

export default QuoteCard;

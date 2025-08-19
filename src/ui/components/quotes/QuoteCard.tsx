import { Paper, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { Quote } from '../../../domain/models/quotes';
import SettingsButtons from '../SettingsButtons';

interface Props {
  quote: Quote;
  onClick: () => void;
  deleteQuote: (quote: Quote) => void;
}

const QuoteCard = (props: Props) => {
  const { quote, onClick, deleteQuote } = props;
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
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.primary.dark
            : theme.palette.primary.light,
        borderRadius: '10px',
      }}
    >
      <Typography variant="body1" textAlign="justify">
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
              deleteQuote(quote);
            }}
            onClickEditButton={onClick}
          />
        </Stack>
      )}
    </Paper>
  );
};

export default QuoteCard;

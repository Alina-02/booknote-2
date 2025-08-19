import { Box, Button, InputBase, useTheme } from '@mui/material';
import { useState } from 'react';

interface Props {
  handleSearch: (inputSearch: string) => void;
}

const SearchBar = (props: Props) => {
  const { handleSearch } = props;

  const [inputSearch, setInputSearch] = useState<string>('');

  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: '50px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: 575,
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <InputBase
        placeholder="Search by book or author..."
        value={inputSearch}
        sx={{
          flex: 1,
          paddingLeft: 3,
          paddingY: 1.2,
          fontSize: '1rem',
          color: 'black',
        }}
        onChange={(e) => {
          setInputSearch(e.target.value.toLowerCase());
        }}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            handleSearch(inputSearch);
            setInputSearch('');
          }
        }}
      />
      <Button
        onClick={() => {
          handleSearch(inputSearch);
          setInputSearch('');
        }}
        variant="contained"
        sx={{
          borderRadius: 0,

          color: 'white',
          fontWeight: 600,
          textTransform: 'none',
          px: 4,
          '&:hover': {
            color: theme.palette.primary.contrastText,
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;

import React, { PropsWithChildren, useState } from 'react';
import LateralMenu from '../components/LateralMenu';
import ButtonsMenu from '../components/ButtonsMenu';
import { Box, Stack } from '@mui/material';

const Layout = ({ children }: PropsWithChildren) => {
  const [seeMenu, setSeeMenu] = useState<boolean>(false);

  return (
    <Stack direction="row">
      <LateralMenu seeMenu={seeMenu} setSeeMenu={setSeeMenu} />

      <Box sx={{ width: '100%' }}>
        <ButtonsMenu seeMenu={seeMenu} setSeeMenu={setSeeMenu} />
        {children}
      </Box>
    </Stack>
  );
};

export default Layout;

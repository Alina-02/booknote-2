import { PropsWithChildren, useState } from 'react';
import LateralMenu from '../components/lateralMenu/LateralMenu';
import ButtonsMenu from '../components/ButtonsMenu';
import { Box, Stack } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const Layout = ({ children }: PropsWithChildren) => {
  const [seeMenu, setSeeMenu] = useState<boolean>(false);

  const isMobile = useMediaQuery({ maxWidth: 700 });
  const onlyMenu = isMobile && seeMenu;

  return (
    <Stack direction="row">
      <LateralMenu seeMenu={seeMenu} setSeeMenu={setSeeMenu} />

      <Box sx={{ width: '100%' }}>
        <ButtonsMenu seeMenu={seeMenu} setSeeMenu={setSeeMenu} />
        {onlyMenu ? <></> : children}
      </Box>
    </Stack>
  );
};

export default Layout;

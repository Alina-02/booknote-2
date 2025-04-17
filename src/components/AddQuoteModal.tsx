import { Box, Modal } from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddQuoteModal = (props: Props) => {
  const { open, onClose } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <Box></Box>
    </Modal>
  );
};

export default AddQuoteModal;

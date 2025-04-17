import { Box, Modal } from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddBookModal = (props: Props) => {
  const { open, onClose } = props;
  return (
    <Modal open={open} onClose={onClose}>
      <Box></Box>
    </Modal>
  );
};

export default AddBookModal;

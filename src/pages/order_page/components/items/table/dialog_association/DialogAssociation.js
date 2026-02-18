import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  Collapse,
  IconButton,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ItemPage from './item_page/ItemPage';
import { useState} from 'react';

const DialogAssociation = ({ open, handleClose, order, item }) => {
  const [closable, setClosable] = useState(true)
  if(order == null) return

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (!closable) return; 
        handleClose();
      }}
      disableEscapeKeyDown={!closable}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2, p: 2 } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 24 }}>Associate Provider & Listing</Typography>
        <IconButton
          onClick={() => {
            if (!closable) return;
            handleClose();
          }}
          disabled={!closable}
          sx={{ color: 'rgba(0,0,0,0.7)' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box>
          <ItemPage item={item} order={order} setClosable={setClosable}/>
        </Box>
      </DialogContent>



    </Dialog>
  );
};

export default DialogAssociation;

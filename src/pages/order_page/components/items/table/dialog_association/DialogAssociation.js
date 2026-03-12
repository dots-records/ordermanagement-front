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

const DialogAssociation = ({ open, handleClose, order, item}) => {
  if(order == null || item == null) return
  
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        handleClose();
      }}
      fullWidth
      PaperProps={{ sx: {
                        backgroundColor: 'white',
                        color: 'black',
                        borderRadius: '0.5rem',
                        p: '1rem',
                        minWidth: '30vw'
                    } }}
    >
      <DialogTitle sx={{ p:'0.5rem'}}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: '1.5rem' }}>Associate Provider & Listing</Typography>
          <IconButton
            onClick={() => {
              handleClose();
            }}
            sx={{ color: 'rgba(0,0,0,0.7)' }}
          >
            <CloseIcon sx={{ fontSize: '1.5rem'}} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{p: 0}}>
        <Box sx={{ p: '1rem' }}>
          <ItemPage selectedItem={item} order={order} handleClose={handleClose}/>
        </Box>
      </DialogContent>



    </Dialog>
  );
};

export default DialogAssociation;

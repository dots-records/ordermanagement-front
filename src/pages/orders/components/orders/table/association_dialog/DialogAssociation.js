import React, { useEffect, useState } from 'react';
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
import ItemPage from './ItemPage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const DialogAssociation = ({ open, handleClose, order }) => {
  if(order == null) return
  const totalPages = order.items.length + 1; 
  const [page, setPage] = useState(0);

   useEffect(() => {
    setPage(0)
      }, [order]);
  

  const handleConfirm = () => {
  };


  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 2, p: 2 } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 24 }}>Association</Typography>
        <IconButton onClick={handleClose} sx={{ color: 'rgba(0,0,0,0.7)' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {page < order.items.length && (
          <Box>
            <Typography sx={{ 
              fontFamily: 'InterSemiBold', 
              fontSize: 16,
              color: "rgba(0,0,0,0.5)"
            }}>
              Item {page + 1} of {order.items.length}
            </Typography>
            <ItemPage item={order.items[page]} order={order} />
          </Box>
        )}

        {page === order.items.length && (
          <Box>
            <Typography variant="h6">Assoc finished</Typography>
          </Box>
        )}
      </DialogContent>



      <DialogActions sx={{ justifyContent: 'flex-end' }}>
        
        {page < totalPages - 1 &&
          <Button onClick={() => setPage((p) => p + 1)} sx={{ fontFamily: 'InterSemiBold', color: 'black' }}>
            Next
          </Button>
        }

        {page === totalPages - 1 &&
          <Button onClick={handleConfirm} sx={{ fontFamily: 'InterSemiBold', color: 'black' }}>
            Confirm
          </Button>
        }
      </DialogActions>

    </Dialog>
  );
};

export default DialogAssociation;

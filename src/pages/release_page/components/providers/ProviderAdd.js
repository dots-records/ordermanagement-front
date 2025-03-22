import React, { useState } from 'react';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ProviderAdd = () => {
    const [open, setOpen] = useState(false);
    const [orderType, setOrderType] = useState('Stock');
    const [price, setPrice] = useState('');
    const [units, setUnits] = useState('');
    const [link, setLink] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setPrice('');
        setUnits('');
        setLink('');
    };

    return (
        <>
            <AddIcon 
                onClick={handleOpen} 
                sx={{
                    fontSize: 22,
                    color: 'rgba(0,0,0,0.6)',
                    cursor: 'pointer',
                    '&:hover': {
                        color: 'rgba(0, 0, 0, 1)',
                    },
                }} 
            />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Typography
                        sx={{
                            textAlign: 'left',
                            fontFamily: 'InterRegular',
                            fontSize: 19,
                        }}
                    >
                        Add Provider
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        label="Order Type"
                        fullWidth
                        value={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                        margin="dense"
                        InputProps={{ style: { fontFamily: 'InterRegular' } }}
                    >
                        <MenuItem value="Stock" sx={{ fontFamily: 'InterRegular' }}>Stock</MenuItem>
                        <MenuItem value="Online" sx={{ fontFamily: 'InterRegular' }}>Online</MenuItem>
                    </TextField>

                    <TextField
                        margin="dense"
                        label="Price"
                        fullWidth
                        variant="outlined"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        InputProps={{ style: { fontFamily: 'InterRegular' } }}
                    />
                    
                    {orderType === 'Stock' ? (
                        <TextField
                            margin="dense"
                            label="Units"
                            fullWidth
                            variant="outlined"
                            value={units}
                            onChange={(e) => setUnits(e.target.value)}
                            InputProps={{ style: { fontFamily: 'InterRegular' } }}
                        />
                    ) : (
                        <TextField
                            margin="dense"
                            label="Link"
                            fullWidth
                            variant="outlined"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            InputProps={{ style: { fontFamily: 'InterRegular' } }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" sx={{ fontFamily: 'InterSemiBold' }}>
                        Cancel
                    </Button>
                    <Button color="primary" sx={{ fontFamily: 'InterSemiBold' }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProviderAdd;
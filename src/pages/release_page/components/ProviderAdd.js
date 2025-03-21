import React, { useState } from 'react';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ProviderAdd = () => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            
                <AddIcon onClick={handleOpen} sx={{fontSize:22,
                    color: 'rgba(0,0,0,0.6)',
                    cursor: 'pointer',
                    '&:hover': {
                        color: 'rgba(0, 0, 0, 1)',
                    },
                }} />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Release</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Release Number"
                        fullWidth
                        variant="outlined"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProviderAdd;

import React, { useState } from 'react';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { putReleaseFromDiscogs } from '../../../../services/releaseService';
import { getReleasesAndSearch } from '../../functions/Functions';

const TableAdd = ({ setReleasesPage, setLoading } ) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const  handleSave = async () => {
        setOpen(false);
        setLoading(true)
        await putReleaseFromDiscogs(inputValue)
        const response = await getReleasesAndSearch(0, "")
        setReleasesPage(response)
        setInputValue("")
        setLoading(false)
        
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="outlined"
                sx={{
                    position: 'absolute',
                    top: 24,
                    right: 330,
                    fontFamily: 'InterSemiBold',
                    fontSize: '13px',
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                    color: 'rgba(0,0,0,0.6)',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.03)',
                        color: 'rgba(0, 0, 0, 1)',
                        borderColor: 'rgba(0, 0, 0, 0.25)',
                    },
                }}
            >
                Add
            </Button>

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
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TableAdd;

import React, { useState } from 'react';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { createRelease, getReleasesCount } from '../../../../services/releaseService';
import { getSelectedTableReleases } from '../../functions/Functions';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';


const TableAdd = ({ setReleasesPage, setLoading, tableSelected, setCount} ) => {
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
        await createRelease(inputValue)
        const response = await getSelectedTableReleases(tableSelected, 0, "");
        setReleasesPage(response)
        setInputValue("")
        setCount(null)
        setLoading(false);
        
        let archivedParam = null;
        if (tableSelected === 'Active Releases') archivedParam = false;
        else if (tableSelected === 'Inactive Releases') archivedParam = true;
        else archivedParam = null; // All Releases
        const count = await getReleasesCount(archivedParam);
        setCount(count);
        
    };

    const isFormValid = () => {
        return /^[0-9]+$/.test(inputValue);
    };

    const minimalTextField = {
        variant: 'standard', 
        InputProps: {
            style: { color: 'black', fontFamily: 'InterRegular', fontSize: '1rem', },
        },
        InputLabelProps: {
            shrink: true,
            style: { color: 'rgba(0,0,0,0.5)', fontFamily: 'InterRegular',fontSize: '1rem', },
        },
        sx: {
            '& .MuiOutlinedInput-root': {
                borderRadius: 0, 
                '& fieldset': {
                    borderColor: 'rgba(0,0,0,0.6)',
                },
                '&:hover fieldset': {
                    borderColor: 'rgba(0,0,0,0.5)',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'rgba(0,0,0,0.85)',
                },
            },
        },
    };
    return (
        <>
            <Button
                onClick={handleOpen}
                variant="outlined"
                sx={{
                    fontFamily: 'InterSemiBold',
                    fontSize: '0.75rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    borderColor: 'rgba(0, 0, 0, 0.3)',
                    color: 'rgba(0,0,0,0.6)',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.03)',
                        color: 'rgba(0, 0, 0, 1)',
                        borderColor: 'rgba(0, 0, 0, 0.25)',
                    },
                }}
            >
                <AddIcon sx={{fontSize: '0.875rem' }}/>
            </Button>

            <Dialog
                key={open ? 'open' : 'closed'}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (e) => {
                        e.preventDefault();
                        if (isFormValid()) {
                            handleSave();
                        }
                    },
                    sx: {
                        backgroundColor: 'white',
                        color: 'black',
                        borderRadius: '0.5rem',
                        p: '1rem',
                        minWidth: '30vw'
                        
                    }
                }}
            >
                <DialogTitle sx={{ p:'0.5rem'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                        <Typography sx={{ fontFamily: "InterSemiBold", fontSize: '1.5rem' }}>
                            Add New Release
                        </Typography>
                        <IconButton
                            onClick={handleClose}
                            sx={{ color: 'rgba(0,0,0,1)'}}
                        >
                            <CloseIcon sx={{ fontSize: '1.5rem'}} />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{p:0}}>
                    <Box sx={{ p: '1rem' }}>
                        <TextField
                            label="Release Id"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            {...minimalTextField}
                            required
                        />
                    </Box>
                </DialogContent>
                <DialogActions >
                    <Button
                        type="submit"
                        sx={{ color: 'black', fontFamily: 'InterSemiBold', p:'0.5rem'}}
                        disabled={!isFormValid()}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TableAdd;

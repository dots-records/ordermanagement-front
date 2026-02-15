import React, { useState } from 'react';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { getSelectedTableOrders } from '../../../functions/Functions';
import vinted_icon from '../../../../../files/vinted_icon.png';
import wallapop_icon from '../../../../../files/wallapop_icon.png';


const TableAdd = ({ setOrdersPage, setLoading, tableSelected} ) => {
    const [open, setOpen] = useState(false);
    const [platform, setPlatform] = useState('Vinted');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const  handleSave = async () => {
        setOpen(false);
        setLoading(true)
        // Create order
        const response = await getSelectedTableOrders(tableSelected, 0, "");
        setOrdersPage(response)
        setLoading(false)
        
    };

    const isFormValid = () => {
        return true;
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="outlined"
                sx={{
                    position: 'absolute',
                    top: 24,
                    right:330 ,
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
                +
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
                    borderRadius: 2,
                    p: 2,
                    minWidth:400
                }
            }}>
            
                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Typography sx={{ fontFamily: "InterSemiBold", fontSize: 24 }}>
                            Add Order
                        </Typography>
                        <IconButton
                            onClick={handleClose}
                            sx={{ color: 'rgba(0,0,0,1)'  }}
                        >
                            <CloseIcon sx={{ fontSize: 24}} />
                        </IconButton>
                    </Box>
                </DialogTitle>
                                
                <DialogContent sx={{my:2}}>
                    <Typography
                        sx={{
                            fontFamily: 'InterRegular',
                            fontSize: 12.5,
                            color: 'rgba(0,0,0,0.5)',
                            mb: 0.5
                            }}
                        >
                        Platform *
                        </Typography>
                
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {platform === 'Vinted' ? (
                            <Box
                                component="img"
                                src={vinted_icon}
                                alt="vinted"
                                sx={{
                                height: 22,
                                width: 'auto',
                                objectFit: 'contain',
                                }}
                            />
                        ) : platform === 'Wallapop' ? (
                            <Box
                                component="img"
                                src={wallapop_icon}
                                alt="wallapop"
                                sx={{
                                    height: 22,
                                    width: 'auto',
                                    objectFit: 'contain',
                                }}
                            />
                        )  : null
                        }
                        <TextField
                            select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                                style: {
                                    color: 'black',
                                    fontFamily: 'InterRegular',
                                    fontSize: 16,
                                    backgroundColor: 'transparent', // quita fondo gris
                                },
                            }}
                            sx={{
                                '& .MuiSelect-select': {
                                    backgroundColor: 'transparent', // quita fondo gris al abrir
                                    '&:focus': {
                                        backgroundColor: 'transparent', // quita fondo gris al enfocar
                                    },
                                },
                            }}
                            required
                        >
                            <MenuItem value="Vinted">Vinted</MenuItem>
                            <MenuItem value="Wallapop">Wallapop</MenuItem>
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions >
                    <Button
                        type="submit"
                        sx={{ color: 'black', fontFamily: 'InterSemiBold', mx:1 }}
                        disabled={!isFormValid() }
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TableAdd;

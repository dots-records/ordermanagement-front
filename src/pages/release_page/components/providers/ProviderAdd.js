import React, { useState } from 'react'; 
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { createProviderInStock, createProviderOnline, getProviders } from "../../../../services/providerService.js"
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import LanguageIcon from '@mui/icons-material/Language';


const conditionOptions = [
    { label: 'Mint', value: 'M' },
    { label: 'Near Mint', value: 'NM' },
    { label: 'Very Good Plus', value: 'VG+' },
    { label: 'Very Good', value: 'VG' },
    { label: 'Good Plus', value: 'G+' },
    { label: 'Good', value: 'G' },
    { label: 'Fair', value: 'F' },
    { label: 'Poor', value: 'P' },
];

const ProviderAdd = ({ releaseId, setProviders, setLoading }) => {
    const [open, setOpen] = useState(false);
    const [providerType, setProviderType] = useState('In Stock');
    const [price, setPrice] = useState('');
    const [units, setUnits] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [condition, setCondition] = useState('M');

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setPrice('');
        setUnits('');
        setLink('');
        setCondition('M');
        setDescription('');
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            if (providerType === "In Stock") {
                await createProviderInStock(releaseId, price, units, condition, description);
            } else {
                await createProviderOnline(releaseId, price, link, condition, description);
            }
            const dataProviders = await getProviders(releaseId);
            setProviders(dataProviders);
            handleClose();
        } catch (error) {
            console.error("Error saving provider:", error);
        }
        setLoading(false);
    };

    const isFormValid = () => {
        const priceRegex = /^\d+(\.\d+)?$/;
        if (!price || !priceRegex.test(price)) return false;

        const unitsRegex = /^[1-9]\d*$/;
        if (providerType === "In Stock" && (!units || !unitsRegex.test(units))) return false;

        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
        if (providerType === "Online" && (!link || !urlRegex.test(link))) return false;

        if (!condition) return false;

        return true;
    };

    const minimalTextField = {
        variant: 'standard', 
        InputProps: {
            style: { color: 'black', fontFamily: 'InterRegular', fontSize: 16, },
        },
        InputLabelProps: {
            shrink: true,
            style: { color: 'rgba(0,0,0,0.5)', fontFamily: 'InterRegular',fontSize: 16, },
        },
        sx: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 0, // bordes cuadrados
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
                        p: 2
                    }
                }}
            >

                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Typography sx={{ fontFamily: "InterSemiBold", fontSize: 24 }}>
                            Add Provider
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
                            Provider Type*
                        </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {providerType === 'In Stock' ? (
                            <InventoryIcon sx={{ fontSize: 22, color: 'rgba(0,0,0,0.7)' }} />
                        ) : (
                            <LanguageIcon sx={{ fontSize: 22, color: 'rgba(0,0,0,0.7)' }} />
                        )}

                        <TextField
                            select
                            value={providerType}
                            onChange={(e) => setProviderType(e.target.value)}
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
                            <MenuItem value="In Stock">In Stock</MenuItem>
                            <MenuItem value="Online">Online</MenuItem>
                        </TextField>

                    </Box>
                    <Box sx={{ mt: 1.8 }}>
                        <Typography
                            sx={{
                                fontFamily: 'InterRegular',
                                fontSize: 12.5,
                                color: 'rgba(0,0,0,0.5)',
                                mb: 1.2
                            }}
                        >
                            Condition*
                        </Typography>
                        <ToggleButtonGroup
                            value={condition}
                            exclusive
                            onChange={(e, newValue) => {
                                if (newValue !== null) {
                                    setCondition(newValue);
                                }
                            }}
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                }}
                            >
                           {conditionOptions.map((option) => (
                                <ToggleButton
                                    key={option.value}
                                    value={option.value}
                                    sx={{
                                        fontFamily: 'InterRegular',
                                        fontSize: 14,
                                        px: 1.6,
                                        py: 0.4,
                                        color: 'rgba(0,0,0,0.7)',
                                        border: '1px solid rgba(0,0,0,0.25)',
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(0,0,0,0.85)',
                                            color: 'white',
                                            borderColor: 'rgba(0,0,0,0.85)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0,0,0,0.85)',
                                            },
                                        },
                                    }}
                                >
                                    {option.value}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt:3 }}>
                            <TextField
                                label="Price (.)"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                {...minimalTextField}
                                required
                                sx={{ width: '25%'}}
                            />

                            <TextField
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                {...minimalTextField}
                                sx={{ width: '75%'}}
                            />
                    </Box>
                    

                    {providerType === 'In Stock' ? (
                        <TextField
                            label="Units"
                            value={units}
                            onChange={(e) => setUnits(e.target.value)}
                            {...minimalTextField}
                            required
                            sx={{ mt:3, width: '25%'}}
                        />
                    ) : (
                        <TextField
                            label="Link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            {...minimalTextField}
                            required
                            sx={{ mt:3, width: '100%'}}
                        />
                    )}
                    
                </DialogContent>
                <DialogActions >
                    <Button
                        type="submit"
                        sx={{ color: 'black', fontFamily: 'InterSemiBold', mx:1 }}
                        disabled={!isFormValid()}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProviderAdd;

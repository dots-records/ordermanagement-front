import React, { useState } from 'react'; 
import { Typography, Button, Dialog, DialogTitle, DialogContent, 
    DialogActions, TextField, MenuItem, IconButton, Box, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { createProviderInStock, createProviderOnline, getProviders } from "../../../../services/providerService.js"
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import LanguageIcon from '@mui/icons-material/Language';
import { Snackbar, Alert } from '@mui/material';


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
    const [discCondition, setDiscCondition] = useState('M');
    const [sleeveCondition, setSleeveCondition] = useState('M');
    const [errorMessage, setErrorMessage] = useState('');
    const [openErrorPopup, setOpenErrorPopup] = useState(false);
    const [loadingProviderAdd, setLoadingProviderAdd] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setPrice('');
        setUnits('');
        setLink('');
        setDiscCondition('M');
        setSleeveCondition('M');
        setDescription('');
    };

    const handleSave = async () => {
        try {
            setLoadingProviderAdd(true)
            if (providerType === "In Stock") {
                await createProviderInStock(releaseId, price, units, discCondition, sleeveCondition , description);
            } else {
                await createProviderOnline(releaseId, price, link, discCondition, sleeveCondition, description);
            }
            setLoading(true);
            const dataProviders = await getProviders(releaseId);
            setProviders(dataProviders);
            handleClose();
        } catch (error) {
            console.log(error.message)
            setErrorMessage(error.message);
            setOpenErrorPopup(true);
                
        } finally {
            setLoadingProviderAdd(false)
            setLoading(false);
        }
        
    };

    const isFormValid = () => {
        const priceRegex = /^\d+(\.\d+)?\s*$/;
        if (!price || !priceRegex.test(price)) return false;

        const unitsRegex = /^[1-9]\d*\s*$/;
        if (providerType === "In Stock" && (!units || !unitsRegex.test(units))) return false;

        if (providerType === "Online" && (!link)) return false;

        if (!discCondition || !sleeveCondition ) return false;

        return true;
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
                    fontSize: '1.375rem',
                    color: 'rgba(0,0,0,0.6)',
                    cursor: 'pointer',
                    '&:hover': {
                        color: 'rgba(0, 0, 0, 1)',
                    },
                }} 
            />
                    
            <Dialog
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
                        minWidth: '40vw'
                    }
                }}
            >

                <DialogTitle sx={{ p:'0.5rem'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Typography sx={{ fontFamily: "InterSemiBold", fontSize: '1.5rem' }}>
                            Add Provider
                        </Typography>
                        <IconButton
                            onClick={handleClose}
                            sx={{ color: 'rgba(0,0,0,1)'  }}
                        >
                            <CloseIcon sx={{ fontSize: '1.5rem'}} />
                        </IconButton>
                    </Box>
                </DialogTitle>
                
                <DialogContent sx={{p: 0}}>
                    <Box sx={{ py: '1rem', px: '2rem',  gap: '1.5rem',display: 'flex', flexDirection: 'column' }}>
                        <Box>
                            <Typography
                                    sx={{
                                        fontFamily: 'InterRegular',
                                        fontSize: '0.78125rem',
                                        color: 'rgba(0,0,0,0.5)',
                                        mb: '0.25rem'
                                    }}
                                >
                                    Provider Type *
                                </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {providerType === 'In Stock' ? (
                                    <InventoryIcon sx={{ fontSize: '1.375rem', color: 'rgba(0,0,0,0.7)' }} />
                                ) : (
                                    <LanguageIcon sx={{ fontSize: '1.375rem', color: 'rgba(0,0,0,0.7)' }} />
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
                                            fontSize: '1rem',
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                    sx={{
                                        '& .MuiSelect-select': {
                                            backgroundColor: 'transparent', 
                                            '&:focus': {
                                                backgroundColor: 'transparent', 
                                            },
                                        },
                                    }}
                                    required
                                >
                                    <MenuItem value="In Stock">In Stock</MenuItem>
                                    <MenuItem value="Online">Online</MenuItem>
                                </TextField>

                            </Box>
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: 'InterRegular',
                                    fontSize: '0.78125rem',
                                    color: 'rgba(0,0,0,0.5)',
                                    mb: '0.6rem'
                                }}
                            >
                                Disc Condition *
                            </Typography>
                            <ToggleButtonGroup
                                value={discCondition}
                                exclusive
                                onChange={(e, newValue) => {
                                    if (newValue !== null) {
                                        setDiscCondition(newValue);
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
                                            fontSize: '0.875rem',
                                            px: '0.7rem',
                                            py: '0.2rem',
                                            color: 'rgba(0,0,0,0.7)',
                                            border: '0.0625rem solid rgba(0,0,0,0.25)',
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
                        <Box >
                            <Typography
                                sx={{
                                    fontFamily: 'InterRegular',
                                    fontSize: '0.78125rem',
                                    color: 'rgba(0,0,0,0.5)',
                                    mb: '0.6rem'
                                }}
                            >
                                Sleeve Condition *
                            </Typography>
                            <ToggleButtonGroup
                                value={sleeveCondition}
                                exclusive
                                onChange={(e, newValue) => {
                                    if (newValue !== null) {
                                        setSleeveCondition(newValue);
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
                                            fontSize: '0.875rem',
                                            px: '0.7rem',
                                            py: '0.2rem',
                                            color: 'rgba(0,0,0,0.7)',
                                            border: '0.0625rem solid rgba(0,0,0,0.25)',
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
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                                sx={{  width: '25%'}}
                            />
                        ) : (
                            <TextField
                                label="Link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                {...minimalTextField}
                                required
                                sx={{ width: '100%'}}
                            />
                        )}
                    </Box>
                </DialogContent>
                <DialogActions >
                    <Button
                        type="submit"
                        sx={{ color: 'black', fontFamily: 'InterSemiBold',  p:'0.5rem' }}
                        disabled={!isFormValid() || loadingProviderAdd}
                    >
                        {loadingProviderAdd ? <CircularProgress size={'1.25rem'} color="inherit" /> : "Save"}
                    </Button>
                </DialogActions>

                {loadingProviderAdd && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 10,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
            </Dialog>
            <Snackbar
                open={openErrorPopup}
                autoHideDuration={4000}
                onClose={() => setOpenErrorPopup(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity="error"
                    onClose={() => setOpenErrorPopup(false)}
                    sx={{ width: '100%', fontFamily: 'InterRegular' }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ProviderAdd;

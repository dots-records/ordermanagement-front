import React, { useState } from 'react'; 
import { useEffect } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, 
    TextField, MenuItem, IconButton, Box, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateProvider, getProviders, deleteProvider } from "../../../../../services/providerService.js"
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

const ProviderEdit = ({ releaseId, setProviders, setLoading, openEdit, setOpenEdit, provider }) => {
    const [providerType, setProviderType] = useState('');
    const [price, setPrice] = useState('');
    const [units, setUnits] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [discCondition, setDiscCondition] = useState('');
    const [sleeveCondition, setSleeveCondition] = useState('');
    const [loadingProvider, setLoadingProvider] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openErrorPopup, setOpenErrorPopup] = useState(false);

    

    useEffect(() => {
        if (provider) {
            setProviderType(provider.type);
            setPrice(provider.price);
            setUnits(provider.units);
            setLink(provider.link);
            setDescription(provider.description);
            setDiscCondition(provider.discCondition);
            setSleeveCondition(provider.sleeveCondition);
        }
    }, [provider]);

    const handleClose = () => {
        setOpenEdit(false);
    };

    const handleSave = async () => {
        try {
            setLoadingProvider(true)
            await updateProvider(releaseId, provider.id, providerType, price,  link,  units,
                discCondition, sleeveCondition, description);
            setLoading(true);
            const dataProviders = await getProviders(releaseId);
            setProviders(dataProviders);
            handleClose();
        } catch (error) {
            setErrorMessage(error.message);
            setOpenErrorPopup(true);
                
        } finally {
            setLoadingProvider(false)
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoadingProvider(true)
            await deleteProvider(releaseId, provider.id);
            setLoading(true);
            const dataProviders = await getProviders(releaseId);
            setProviders(dataProviders);
            handleClose();
        } catch (error) {
            setErrorMessage(error.message);
            setOpenErrorPopup(true);
                
        } finally {
            setLoadingProvider(false)
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

            <Dialog
                key={openEdit ? 'open' : 'closed'}
                open={openEdit}
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
                            Edit Provider
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
                        <Box >
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
                                sx={{ width: '25%'}}
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
                        onClick={handleDelete}
                        sx={{ color: 'rgba(231, 93, 93, 1)', fontFamily: 'InterSemiBold', p:'0.5rem' }}
                        disabled={ loadingProvider}
                    >
                        {loadingProvider ? <CircularProgress size={'1.25rem'} color="inherit" /> : "Delete"}
                    </Button>
                    <Button
                        type="submit"
                        sx={{ color: 'black', fontFamily: 'InterSemiBold', p:'0.5rem' }}
                        disabled={!isFormValid() || loadingProvider}
                    >
                        {loadingProvider ? <CircularProgress size={'1.25rem'} color="inherit" /> : "Update"}
                    </Button>
                </DialogActions>

                {loadingProvider && (
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

export default ProviderEdit;

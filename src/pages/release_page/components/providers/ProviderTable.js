import React, { useState } from 'react';
import { List, ListItem, Typography, Box, Chip, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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

const ProviderTable = ({ providers, loading }) => {
    const [open, setOpen] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);

    const handleRowClick = (provider) => {
        setSelectedProvider(provider);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProvider(null);
    };

    const handleSave = () => {
        console.log('Guardar cambios:', selectedProvider);
        handleClose();
    };

    const isFormValid = () => {
        if (!selectedProvider) return false;
        if (!selectedProvider.type) return false;
        if (!selectedProvider.price) return false;
        if (selectedProvider.type === 'Stock' && (!selectedProvider.units || !selectedProvider.condition)) return false;
        if (selectedProvider.type === 'Online' && !selectedProvider.link) return false;
        return true;
    };

    const minimalTextField = {
        variant: "standard",
        InputProps: { style: { color: 'black', fontFamily: 'InterRegular' } },
        InputLabelProps: { style: { color: 'rgba(0,0,0,0.7)', fontFamily: 'InterRegular' } },
        fullWidth: true,
        margin: "dense",
        sx: {
            '& .MuiInput-underline:before': { borderBottomColor: 'black' },
            '& .MuiInput-underline:after': { borderBottomColor: 'black' },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'black' },
            mb: 1
        }
    };

    if (loading) return <Typography>Cargando...</Typography>;

    return (
        <>
            <List>
                {providers.map((provider, index) => (
                    <ListItem
                        key={index}
                        onClick={() => handleRowClick(provider)}
                        sx={{ 
                            borderBottom: '1px solid #ddd',
                            gap: 2,
                            alignItems: 'center',
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.03)' }
                        }}
                    >
                        <Box
                            sx={{
                                fontFamily: 'InterSemiBold',
                                fontSize: 13.5,
                                color: 'rgba(0,0,0,0.85)',
                                backgroundColor: provider.type === 'Stock' 
                                    ? 'rgba(255, 207, 63, 0.15)' 
                                    : 'rgba(126, 202, 63, 0.15)',
                                border: provider.type === 'Stock' 
                                    ? '1px solid rgba(255, 207, 63, 0.7)' 
                                    : '1px solid rgba(126, 202, 63, 0.7)',
                                borderRadius: 1.2,
                                textAlign: 'center',
                                px: 1.2,
                                py: 0.5,
                            }}
                        >
                            {provider.condition}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 13.5, color: 'rgba(0,0,0,0.85)', mt: -0.2 }}>
                                {provider.type}
                            </Typography>
                            <Typography sx={{ fontFamily: 'InterRegular', fontSize: '11px', color: "rgba(0,0,0,0.5)", mt: -0.2 }}>
                                {provider.price} €
                            </Typography>
                        </Box>
                        <Box sx={{ ml: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
                            {provider.type === 'Stock' ? (
                                <Chip
                                    label={`${provider.units} units`}
                                    sx={{
                                        fontFamily: 'InterSemiBold',
                                        fontSize: 12,
                                        borderRadius: '6px',
                                        bgcolor: 'rgba(25, 118, 210, 0.08)',
                                        color: '#1976d2',
                                        height: 22,
                                    }}
                                />
                            ) : (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
                                    sx={{ fontFamily: 'InterSemiBold', fontSize: 12, textTransform: 'none', borderRadius: '6px', px: 1.5, py: 0.3 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(provider.link, '_blank');
                                    }}
                                >
                                    Open
                                </Button>
                            )}
                        </Box>
                    </ListItem>
                ))}
            </List>

            <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { backgroundColor: 'white', color: 'black', borderRadius: 2, p: 2 } }}>
                <DialogTitle>
                    <Typography sx={{ textAlign: 'left', fontFamily: "InterSemiBold", fontSize: 22 }}>
                        Edit Provider
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ pt: 1 }}>
                    <TextField
                        select
                        label="Provider Type"
                        value={selectedProvider?.type || ''}
                        onChange={(e) => setSelectedProvider({ ...selectedProvider, type: e.target.value })}
                        {...minimalTextField}
                    >
                        <MenuItem value="Stock">Stock</MenuItem>
                        <MenuItem value="Online">Online</MenuItem>
                    </TextField>

                    {selectedProvider?.type === 'Stock' && (
                        <TextField
                            select
                            label="Condition"
                            value={selectedProvider?.condition || ''}
                            onChange={(e) => setSelectedProvider({ ...selectedProvider, condition: e.target.value })}
                            {...minimalTextField}
                        >
                            {conditionOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}

                    <TextField
                        label="Price"
                        type="number"
                        value={selectedProvider?.price || ''}
                        onChange={(e) => setSelectedProvider({ ...selectedProvider, price: parseFloat(e.target.value) })}
                        {...minimalTextField}
                    />

                    {selectedProvider?.type === 'Stock' ? (
                        <TextField
                            label="Units"
                            type="number"
                            value={selectedProvider?.units || ''}
                            onChange={(e) => setSelectedProvider({ ...selectedProvider, units: parseInt(e.target.value) })}
                            {...minimalTextField}
                        />
                    ) : (
                        <TextField
                            label="Link"
                            value={selectedProvider?.link || ''}
                            onChange={(e) => setSelectedProvider({ ...selectedProvider, link: e.target.value })}
                            {...minimalTextField}
                        />
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 0, pt: 1 }}>
                    <Button onClick={handleClose} sx={{ color: 'black', fontFamily: 'InterSemiBold' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} sx={{ color: 'black', fontFamily: 'InterSemiBold' }} disabled={!isFormValid()}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProviderTable;

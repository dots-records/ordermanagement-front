import React, { useState } from 'react';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createProviderStock, createProviderOnline, getProviders } from "../../../../services/providerService.js"

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
    const [orderType, setOrderType] = useState('Stock');
    const [price, setPrice] = useState('');
    const [units, setUnits] = useState('');
    const [link, setLink] = useState('');
    const [condition, setCondition] = useState('M'); // Default Mint

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setPrice('');
        setUnits('');
        setLink('');
        setCondition('M');
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            if (orderType === "Stock") {
                await createProviderStock(releaseId, price, units, condition);
            } else {
                await createProviderOnline(releaseId, price, link);
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
        if (!price) return false;
        if (orderType === "Stock" && (!units || !condition)) return false;
        if (orderType === "Online" && !link) return false;
        return true;
    };

    return (
        <>
            <AddIcon 
                onClick={handleOpen} 
                sx={{
                    fontSize: 22,
                    color: 'rgba(0,0,0,0.6)',
                    cursor: 'pointer',
                    '&:hover': { color: 'rgba(0, 0, 0, 1)' },
                }} 
            />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Typography sx={{ textAlign: 'left', fontFamily: 'InterRegular', fontSize: 19 }}>
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
                        required
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
                        required
                    />

                    {orderType === 'Stock' ? (
                        <>
                            <TextField
                                margin="dense"
                                label="Units"
                                fullWidth
                                variant="outlined"
                                value={units}
                                onChange={(e) => setUnits(e.target.value)}
                                InputProps={{ style: { fontFamily: 'InterRegular' } }}
                                required
                            />
                            <TextField
                                select
                                margin="dense"
                                label="Condition"
                                fullWidth
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                InputProps={{ style: { fontFamily: 'InterRegular' } }}
                                required
                            >
                                {conditionOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value} sx={{ fontFamily: 'InterRegular' }}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </>
                    ) : (
                        <TextField
                            margin="dense"
                            label="Link"
                            fullWidth
                            variant="outlined"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            InputProps={{ style: { fontFamily: 'InterRegular' } }}
                            required
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" sx={{ fontFamily: 'InterSemiBold' }}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSave} 
                        color="primary" 
                        sx={{ fontFamily: 'InterSemiBold' }}
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

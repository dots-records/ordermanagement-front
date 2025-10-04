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
    const [condition, setCondition] = useState('M');

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

    // Estilo minimalista para todos los TextField
    const minimalTextField = {
        variant: "standard",
        InputProps: {
            style: { color: 'black', fontFamily: 'InterRegular' },
        },
        InputLabelProps: {
            style: { color: 'rgba(0,0,0,0.7)', fontFamily: 'InterRegular' },
        },
        fullWidth: true,
        margin: "dense",
        sx: {
            '& .MuiInput-underline:before': { borderBottomColor: 'black' },
            '& .MuiInput-underline:after': { borderBottomColor: 'black' },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'black' },
            mb: 1
        }
    };

    return (
        <>
            <AddIcon 
                onClick={handleOpen} 
                sx={{
                    fontSize: 22,
                    color: 'black',
                    cursor: 'pointer',
                    '&:hover': { color: 'gray' },
                }} 
            />

            <Dialog 
                open={open} 
                onClose={handleClose} 
                PaperProps={{ sx: { backgroundColor: 'white', color: 'black', borderRadius: 2, p: 2 } }}
            >
                <DialogTitle>
                    <Typography sx={{ textAlign: 'left', fontFamily: "InterSemiBold", fontSize: 22 }}>
                        Add Provider
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ pt: 1 }}>
                    <TextField
                        select
                        label="Provider Type"
                        value={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                        {...minimalTextField}
                        required
                    >
                        <MenuItem value="Stock">Stock</MenuItem>
                        <MenuItem value="Online">Online</MenuItem>
                    </TextField>

                    <TextField
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        {...minimalTextField}
                        required
                    />

                    {orderType === 'Stock' ? (
                        <>
                            <TextField
                                label="Units"
                                value={units}
                                onChange={(e) => setUnits(e.target.value)}
                                {...minimalTextField}
                                required
                            />
                            <TextField
                                select
                                label="Condition"
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                {...minimalTextField}
                                required
                            >
                                {conditionOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </>
                    ) : (
                        <TextField
                            label="Link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            {...minimalTextField}
                            required
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

export default ProviderAdd;

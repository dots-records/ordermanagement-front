import { Box, Typography, List, ListItem, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, Button
 } from "@mui/material"; 
import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { createPaymentAssociatedToOrder } from "../../../../../services/paymentService";
import { Snackbar, Alert, CircularProgress } from '@mui/material';

const PaymentAdd = ({ order, fetchOrder, isOrderFullyAssociated }) => {

    const [open, setOpen] = useState(false);
    const [prices, setPrices] = useState({});
    const [editing, setEditing] = useState({});
    const [loadingPaymentAdd, setLoadingPaymentAdd] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openErrorPopup, setOpenErrorPopup] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isFormValid = () => true;

    const handleSave = async () => {
        setLoadingPaymentAdd(true)
        const totals = Object.values(prices).reduce(
            (acc, item) => {
                acc.provider += Number(item.providerPrice || 0);
                acc.selling += Number(item.sellingPrice || 0);
                return acc;
            },
            { provider: 0, selling: 0 }
        );

        try {
            await createPaymentAssociatedToOrder(order.id, totals.provider, totals.selling);
            fetchOrder();
            handleClose();
        } catch (error) {
            setErrorMessage(error.message);
            setOpenErrorPopup(true);
                
        } finally {
            setLoadingPaymentAdd(false);
        }
    };

    useEffect(() => {
        if (!order?.items) return;

        const initialPrices = {};

        order.items.forEach(item => {
            initialPrices[item.id] = {
                providerPrice: item.provider?.price ?? 0,
                sellingPrice: item.listing?.sellingPrice ?? 0,
            };
        });

        initialPrices.shipping = { providerPrice: 0, sellingPrice: 0 };
        initialPrices.other = { providerPrice: 0, sellingPrice: 0 };

        setPrices(initialPrices);

    }, [order]);

    const startEditing = (id, field) => {
        setEditing(prev => ({ ...prev, [`${id}-${field}`]: true }));
    };

    const stopEditing = (id, field) => {
        setEditing(prev => ({ ...prev, [`${id}-${field}`]: false }));
    };

    const updatePrice = (id, field, value) => {
        setPrices(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }));
    };

    const inputStyleStrong = {
        textAlign: 'right',
        fontSize: '0.75rem',
        width: '3.75rem',
        fontFamily: 'InterSemiBold',
        color: 'rgba(0,0,0,0.85)',
        border: 'none',
        outline: 'none',
        background: 'transparent',
    };

    const inputStyleSoft = {
        ...inputStyleStrong,
        color: 'rgba(0,0,0,0.5)',
    };

    const sellingStyle = {
        textAlign: 'right',
        fontSize: '0.75rem',
        fontFamily: 'InterSemiBold',
        color: 'rgba(0,0,0,0.85)',
        flexShrink: 0,
        cursor: 'pointer',
    };

    const providerStyle = {
        ...sellingStyle,
        color: 'rgba(0,0,0,0.5)',
    };

    const renderRow = (item, isExtra = false) => {
        const providerPrice = prices[item.id]?.providerPrice ?? 0;
        const sellingPrice = prices[item.id]?.sellingPrice ?? 0;

        const editingProvider = editing[`${item.id}-provider`];
        const editingSelling = editing[`${item.id}-selling`];

        return (
            <ListItem
                key={item.id}
                sx={{ 
                    borderBottom: '0.0625rem solid #ddd',
                    gap: '1rem',
                    alignItems: 'center'
                }}
            >
                {!isExtra && (
                    <img 
                        src={item.release.thumb} 
                        style={{ 
                            width: '2.5rem',
                            height: '2.5rem',
                            objectFit: 'cover',
                            borderRadius: '0.25rem'
                        }}
                    />
                )}

                <Box > 
                    <Typography sx={{ fontFamily: 'InterBold', fontSize: '0.8125rem' , color: 'rgba(0,0,0,0.70)', textShadow: '0px 0px 4px rgba(0,0,0,0.10)' }}>
                        {item.release.name}
                    </Typography>

                    {!isExtra && (
                        <>
                            <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: '0.625rem', color: 'rgba(0,0,0,0.5)' }}>
                                {item.release.artists.map(a => a.name).join(', ')}
                            </Typography>

                            <Typography sx={{ fontFamily: 'InterRegular', fontSize: '0.5625rem', color: 'rgba(0,0,0,0.5)' }}>
                                {"Condition of Item: "}
                                {item.discCondition} {item.sleeveCondition}
                            </Typography>
                        </>
                    )}
                </Box>

                <Box sx={{ ml: 'auto', display: 'flex', gap: '1rem' }}>
                    {editingSelling ? (
                        <input
                            type="number"
                            value={sellingPrice}
                            onChange={(e) =>
                                updatePrice(item.id, 'sellingPrice', e.target.value)
                            }
                            onBlur={() => stopEditing(item.id, 'selling')}
                            autoFocus
                            style={inputStyleStrong}
                        />
                    ) : (
                        <Typography onClick={() => startEditing(item.id, 'selling')} sx={sellingStyle}>
                            {sellingPrice} €
                        </Typography>
                    )}

                    {editingProvider ? (
                        <input
                            type="number"
                            value={providerPrice}
                            onChange={(e) =>
                                updatePrice(item.id, 'providerPrice', e.target.value)
                            }
                            onBlur={() => stopEditing(item.id, 'provider')}
                            autoFocus
                            style={inputStyleSoft}
                        />
                    ) : (
                        <Typography onClick={() => startEditing(item.id, 'provider')} sx={providerStyle}>
                            {providerPrice} €
                        </Typography>
                    )}
                </Box>
            </ListItem>
        );
    };

    const extraItems = [
        { id: 'shipping', release: { name: 'Shipping' } },
        { id: 'other', release: { name: 'Other' } }
    ];

    const totals = Object.values(prices).reduce(
        (acc, item) => {
            acc.provider += Number(item.providerPrice || 0);
            acc.selling += Number(item.sellingPrice || 0);
            return acc;
        },
        { provider: 0, selling: 0 }
    );

    const benefit = totals.selling - totals.provider;

    return (
        <>
            <EditIcon
                onClick={() => {
                    if (isOrderFullyAssociated) {
                        handleOpen();
                    }
                }}
                sx={{
                    fontSize: '1.25rem',
                    color: isOrderFullyAssociated ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.25)',
                    cursor: isOrderFullyAssociated  ? 'pointer' : 'default',
                    '&:hover': {
                        color: isOrderFullyAssociated  ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.25)',
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
                        if (isFormValid()) handleSave();
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
                            Add Payment
                        </Typography>

                        <IconButton onClick={handleClose}>
                            <CloseIcon sx={{ fontSize: '1.5rem' }} />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent sx={{p: 0}}>
                    <Box
                        sx={{
                            p: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}
                    >
                        <List>
                            {order?.items.map(item => renderRow(item))}
                        </List>

                        <List >
                            {extraItems.map(item => renderRow(item, true))}
                        </List>

                        <List>
                            <ListItem
                                sx={{
                                    borderTop: '0.0625rem solid #ddd',
                                    borderBottom: '0.0625rem solid #ddd',
                                    gap: '1rem',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: 'InterBold',
                                        fontSize: '0.8125rem',
                                        color: 'rgba(0,0,0,0.85)',
                                    }}
                                >
                                    Total
                                </Typography>

                                <Box sx={{ ml: 'auto', display: 'flex', gap: '1rem' }}>
                                    <Typography
                                        sx={sellingStyle}
                                    >
                                        {totals.selling.toFixed(2)} €
                                    </Typography>

                                    <Typography
                                        sx={sellingStyle}
                                    >
                                        {totals.provider.toFixed(2)} €
                                    </Typography>
                                </Box>
                            </ListItem>
                            <ListItem
                                sx={{
                                    borderBottom: '0.0625rem solid #ddd',
                                    gap: '1rem',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: 'InterBold',
                                        fontSize: '0.8125rem',
                                        color: 'rgba(0,0,0,0.85)',
                                    }}
                                >
                                    Benefits
                                </Typography>

                                <Box sx={{ ml: 'auto', display: 'flex' }}>
                                    <Typography
                                        sx={sellingStyle}
                                    >
                                        {benefit.toFixed(2)} €
                                    </Typography>
                                </Box>
                            </ListItem>
                        </List>
                    </Box>
                </DialogContent>
                <DialogActions >
                    <Button
                        type="submit"
                        sx={{ color: 'black', fontFamily: 'InterSemiBold', p:'0.5rem'}}
                    >
                        {loadingPaymentAdd ? <CircularProgress size={'1.25rem'} color="inherit" /> : "Save"}
                    </Button>
                </DialogActions>
                {loadingPaymentAdd && (
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

export default PaymentAdd;
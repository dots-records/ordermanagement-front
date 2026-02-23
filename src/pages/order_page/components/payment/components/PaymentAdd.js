import { Box, Typography, List, ListItem, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, Button
 } from "@mui/material"; 
import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { createPayout } from '../../../../../services/paymentService'; // <- importamos tu servicio
import { patchOrderPaymentId } from "../../../../../services/orderService";

const PaymentAdd = ({ order, fetchOrder, isOrderFullyAssociated }) => {

    const [open, setOpen] = useState(false);
    const [prices, setPrices] = useState({});
    const [editing, setEditing] = useState({});
    

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isFormValid = () => true;

    const handleSave = async () => {
        // Calculamos totales
        const totals = Object.values(prices).reduce(
            (acc, item) => {
                acc.provider += Number(item.providerPrice || 0);
                acc.selling += Number(item.sellingPrice || 0);
                return acc;
            },
            { provider: 0, selling: 0 }
        );

        try {
            const response = await createPayout(order.id, totals.provider, totals.selling);
            const paymentId = response.data;
            await patchOrderPaymentId(order.id, paymentId);
            fetchOrder();
            handleClose();
        } catch (error) {
            console.error('Error creating payout:', error);
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
        width: 60,
        textAlign: 'right',
        fontSize: 12,
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
        width: 60,
        fontSize: 12,
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
                    borderBottom: '1px solid #ddd',
                    gap: 2,
                    alignItems: 'center',
                }}
            >
                {!isExtra && (
                    <img 
                        src={item.release.thumb} 
                        style={{ 
                            width: '35px',
                            height: '35px',
                            objectFit: 'cover',
                            borderRadius: '3px'
                        }}
                    />
                )}

                <Box> 
                    <Typography sx={{ fontFamily: 'InterBold', fontSize: 13 , color: 'rgba(0,0,0,0.70)', textShadow: '0px 0px 4px rgba(0,0,0,0.10)' }}>
                        {item.release.name}
                    </Typography>

                    {!isExtra && (
                        <>
                            <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 10, color: 'rgba(0,0,0,0.5)' }}>
                                {item.release.artists.map(a => a.name).join(', ')}
                            </Typography>

                            <Typography sx={{ fontFamily: 'InterRegular', fontSize: 9, color: 'rgba(0,0,0,0.5)' }}>
                                {"Condition of Item: "}
                                {item.discCondition} {item.sleeveCondition}
                            </Typography>
                        </>
                    )}
                </Box>

                <Box sx={{ ml: 'auto', display: 'flex' }}>
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
            <AddIcon
                onClick={() => {
                    if (isOrderFullyAssociated && order.paymentId == null) {
                        handleOpen();
                    }
                }}
                sx={{
                    fontSize: 20,
                    color: isOrderFullyAssociated && (order.paymentId == null) ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.25)',
                    cursor: isOrderFullyAssociated && (order.paymentId == null) ? 'pointer' : 'default',
                    '&:hover': {
                        color: isOrderFullyAssociated && (order.paymentId == null) ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.25)',
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
                        borderRadius: 2,
                        p: 2,
                    }
                }}
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Typography sx={{ fontFamily: "InterSemiBold", fontSize: 24 }}>
                            Add Payment
                        </Typography>

                        <IconButton onClick={handleClose}>
                            <CloseIcon sx={{ fontSize: 24 }} />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent sx={{ my:2 }}>
                    <List>
                        {order?.items.map(item => renderRow(item))}
                    </List>

                    <List sx={{ mt: 2 }}>
                        {extraItems.map(item => renderRow(item, true))}
                    </List>

                    <List sx={{ mt: 2 }}>
                        <ListItem
                            sx={{
                                borderTop: '1px solid #ddd',
                                borderBottom: '1px solid #ddd',
                                gap: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'InterBold',
                                    fontSize: 13,
                                    color: 'rgba(0,0,0,0.85)',
                                }}
                            >
                                Total
                            </Typography>

                            <Box sx={{ ml: 'auto', display: 'flex' }}>
                                <Typography
                                    sx={{
                                        textAlign: 'right',
                                        width: 60,
                                        fontSize: 12,
                                        fontFamily: 'InterSemiBold',
                                        color: 'rgba(0,0,0,0.85)',
                                    }}
                                >
                                    {totals.selling.toFixed(2)} €
                                </Typography>

                                <Typography
                                    sx={{
                                        textAlign: 'right',
                                        width: 60,
                                        fontSize: 12,
                                        fontFamily: 'InterSemiBold',
                                        color: 'rgba(0,0,0,0.5)',
                                    }}
                                >
                                    {totals.provider.toFixed(2)} €
                                </Typography>
                            </Box>
                        </ListItem>
                        <ListItem
                            sx={{
                                borderBottom: '1px solid #ddd',
                                gap: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'InterBold',
                                    fontSize: 13,
                                    color: 'rgba(0,0,0,0.85)',
                                }}
                            >
                                Benefits
                            </Typography>

                            <Box sx={{ ml: 'auto', display: 'flex' }}>
                                <Typography
                                    sx={{
                                        textAlign: 'right',
                                        width: 60,
                                        fontSize: 12,
                                        fontFamily: 'InterSemiBold',
                                        color: benefit < 0 ? 'red' : 'green',
                                    }}
                                >
                                    {benefit.toFixed(2)} €
                                </Typography>
                            </Box>
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions >
                    <Button
                        type="submit"
                        sx={{ color: 'black', fontFamily: 'InterSemiBold', mx:1 }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PaymentAdd;
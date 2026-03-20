import { Box, Typography, List, ListItem, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, Button, CircularProgress
 } from "@mui/material"; 
import React, { useState, useEffect } from 'react';
import {  getPayment } from '../../../../../services/paymentService'; 

const PaymentInfo = ({ order, isOrderFullyAssociated }) => {
    
    

    const [loading, setLoading] = useState(true);
    const [payment, setPayment] = useState(null);

    useEffect(() => {
        const fetchPayment = async () => {
            setLoading(true);
            try {
                const response = await getPayment(order.id);
                setPayment(response);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        if (isOrderFullyAssociated) {
            fetchPayment();
        } else {
            setLoading(false);
        }
    }, [order]);


    
    

    if (loading) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    width: "100%", 
                    height: "100%",
                    justifyContent: 'center',
                    alignItems: 'center',  
                }}
            >
                <CircularProgress size={'2.125rem'} />
            </Box>
        );
    }
    
    if (!isOrderFullyAssociated || (order.id == null) || payment == null) {
        return
    }
    

    const benefit = payment.payout - payment.cost;

    const sellingStyle = {
        textAlign: 'right',
        fontSize: '0.75rem',
        fontFamily: 'InterSemiBold',
        color: 'rgba(0,0,0,0.85)',
        flexShrink: 0,
    };

    const providerStyle = {
        ...sellingStyle,
        color: 'rgba(0,0,0,0.5)',
    };
    return (
        <>
            <List sx={{ p: '1rem' }}>
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
                    <Box sx={{ ml: 'auto', display: 'flex', gap:'1rem' }}>
                        <Typography
                            sx={sellingStyle}
                        >
                            {payment.payout.toFixed(2)} €
                        </Typography>
                        
                        <Typography
                            sx={providerStyle}
                        >
                            {payment.cost.toFixed(2)} €
                        </Typography>
                    </Box>
                </ListItem>
                <ListItem
                    sx={{
                        borderBottom: '0.0625rem solid #ddd',
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
        </>
    );
};

export default PaymentInfo;
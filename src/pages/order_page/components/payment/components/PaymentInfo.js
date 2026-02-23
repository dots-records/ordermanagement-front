import { Box, Typography, List, ListItem, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, Button, CircularProgress
 } from "@mui/material"; 
import React, { useState, useEffect } from 'react';
import { createPayout, getPayout } from '../../../../../services/paymentService'; 

const PaymentInfo = ({ order, isOrderFullyAssociated }) => {
    
    

    const [loading, setLoading] = useState(true);
    const [payment, setPayment] = useState(null);

    useEffect(() => {
        const fetchPayment = async () => {
            setLoading(true);
            try {
                const response = await getPayout(order.paymentId);
                setPayment(response);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        if (isOrderFullyAssociated && (order.paymentId != null)) {
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
                <CircularProgress size={33} />
            </Box>
        );
    }
    
    if (!isOrderFullyAssociated || (order.paymentId == null) || payment == null) {
        return
    }
    

    const benefit = payment.payout - payment.cost;
    return (
        <>
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
                                fontSize: 11,
                                fontFamily: 'InterSemiBold',
                                color: 'rgba(0,0,0,0.85)',
                            }}
                        >
                            {payment.payout.toFixed(2)} €
                        </Typography>
                        
                        <Typography
                            sx={{
                                textAlign: 'right',
                                width: 60,
                                fontSize: 11,
                                fontFamily: 'InterSemiBold',
                                color: 'rgba(0,0,0,0.5)',
                            }}
                        >
                            {payment.cost.toFixed(2)} €
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
                                fontSize: 11,
                                fontFamily: 'InterSemiBold',
                                color: 'rgba(0,0,0,0.85)',
                            }}
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
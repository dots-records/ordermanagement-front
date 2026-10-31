import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Box, 
    CircularProgress, 
    Typography,
    Checkbox
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

const TablePayments = ({ loading, payments}) => {
    


    if (loading) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    width: '100%',
                    height: '67vh',
                    justifyContent: 'center',
                    alignItems: 'center',  
                    color: 'black',
                }}
            >
                <CircularProgress size={'2.0625rem'} />
            </Box>
        );
    }
    
    return (
        <TableContainer
            sx={{ 
                height: '67vh',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '2px',
                },
            }}
        >
            <Table stickyHeader sx={{ height: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '1%' }}>Reason</TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)' }}>Payout</TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '40%' }}>Cost</TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '40%' }}>Benefit</TableCell>
                        <TableCell
                            sx={{
                                fontFamily: 'InterSemiBold',
                                color: 'rgba(0,0,0,0.65)',
                                width: '15%',
                                alignItems: 'center',
                            }}
                        >
                            Date
                            <ArrowDropDown sx={{ fontSize: '1.125rem', ml: '0.25rem' }} />
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '1%' }}>Select</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {payments?.length === 0 ? (
                        <TableRow sx={{ height: '100%' }}>
                            <TableCell colSpan={6} sx={{ p: 0}}>
                                <Box
                                    sx={{
                                        height: '100%',   
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        backgroundColor: 'rgba(0,0,0,0.015)',
                                    }}
                                >
                                <Typography sx={{ fontSize: '0.8rem', color: 'rgba(0, 0, 0, 0.45)', fontFamily: 'InterRegular' }}>
                                    No payments available
                                </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : (
                        payments?.map((payment, index) => {
                            return (
                                <TableRow
                                    key={payment.id}
                                    sx={{
                                        textDecoration: 'none',
                                        backgroundColor: index % 2 === 0 ? 'white' : 'rgba(0, 0, 0, 0.02)',
                                        '&:hover': {
                                            backgroundColor:'rgba(0, 0, 0, 0.05)',
                                        },
                                        transition: 'background-color 0.2s ease-in-out',
                                    }}
                                >
                                    <TableCell >
                                        <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: '0.75rem', color: 'rgba(0,0,0,0.5)'}}>
                                            {payment.id}                                                                                
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: '0.75rem', color: 'rgba(0,0,0,0.5)'}}>
                                            {payment.payout}                                                                                
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: '0.75rem', color: 'rgba(0,0,0,0.5)'}}>
                                            {payment.cost}                                                                                
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: '0.75rem', color: 'rgba(0,0,0,0.5)'}}>
                                            {payment.payout - payment.cost}  
                                        </Typography>
                                        
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontFamily: 'InterRegular', fontSize: '0.75rem', color: 'rgba(0,0,0,0.4)',}}>
                                            {payment.creationDate}                                                                                
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TablePayments;

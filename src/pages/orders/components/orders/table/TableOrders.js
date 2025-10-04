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
    Badge
} from '@mui/material';

import { getBoxColor, getBar } from './functions/Functions';

const TableOrders = ({ tableSelected, loading, setOrdersPage, numberPage, orders, searchTerm }) => {
    if (loading) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    width: 1176, 
                    mt: 2.5, 
                    height: 500,
                    justifyContent: 'center',
                    alignItems: 'center',  
                }}
            >
                <CircularProgress size={33} />
            </Box>
        );
    }

    return (
        <TableContainer
            sx={{ 
                width: 1176,
                mx: 'auto', 
                height: 500,
                mt: 2.5, 
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '2px',
                },
            }}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell 
                            sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '10px' }}
                        >
                            Id
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)' }}>
                            Items
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '170px' }}>
                            Status
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '170px' }}>
                            Created
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '80px' }}>
                            Select
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {orders?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} sx={{ textAlign: 'center', py: 2, height: '200px' }}>
                                <Box 
                                    sx={{ 
                                        border: '2px solid', 
                                        borderColor: 'rgba(0,0,0,0.1)',
                                        borderRadius: 1.5,
                                        height: '380px',  
                                        alignItems: 'center',  
                                        display: 'flex',  
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        backgroundColor: 'rgba(0,0,0,0.02)',
                                        mx: 'auto',
                                        maxWidth: '100%' 
                                    }}
                                >
                                    <Typography 
                                        variant="body2" 
                                        sx={{ color: 'rgba(0, 0, 0, 0.45)', fontFamily: 'InterSemiBold' }}
                                    >
                                        No orders available
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders?.map((order, index) => (
                            <TableRow
                                key={order.id}
                                component={Link}
                                to={`/orders/${order.id}`}
                                state={{ 
                                    newMessagesCustomer: order.newMessagesCustomer, 
                                    newMessagesSeller: order.newMessagesSeller, 
                                    newMessagesDiscogs: order.newMessagesDiscogs
                                }}
                                sx={{
                                    textDecoration: 'none',
                                    backgroundColor: index % 2 === 0 ? 'white' : 'rgba(0, 0, 0, 0.02)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                        '& .number-box': {
                                            color: 'rgba(0, 0, 0, 1)',
                                            borderColor: 'rgba(0, 0, 0, 0.25)',
                                        },
                                    },
                                }}
                            >
                                <TableCell>
                                    {order.newMessagesCustomer > 0 ? (
                                        <Badge
                                            badgeContent={
                                                <Typography
                                                    sx={{
                                                        fontFamily: 'InterSemiBold',
                                                        fontSize: '10px',
                                                        color: 'white',
                                                    }}
                                                >
                                                    {order.newMessagesCustomer}
                                                </Typography>
                                            }
                                            color="error"
                                            sx={{
                                                '& .MuiBadge-dot': {
                                                    backgroundColor: 'rgba(254, 117, 114)',
                                                },
                                            }}
                                        >
                                            <Box
                                                className="number-box"
                                                sx={{
                                                    fontFamily: 'InterSemiBold',
                                                    fontSize: 12,
                                                    color: 'rgba(0,0,0,0.85)',
                                                    backgroundColor: `${getBoxColor(order.status, order.archived)}0.15)`,
                                                    border: `1px solid ${getBoxColor(order.status, order.archived)}0.7)`,
                                                    borderRadius: 2,
                                                    textAlign: 'center',
                                                    py: 0.5,
                                                    px: 1.2,
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                                    transition: 'all 0.2s ease-in-out',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        backgroundColor: `${getBoxColor(order.status, order.archived)}0.25)`,
                                                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                                        transform: 'translateY(-1px)',
                                                    },
                                                }}
                                            >
                                                {order.id}
                                            </Box>
                                        </Badge>
                                    ) : (
                                        <Box
                                            className="number-box"
                                            sx={{
                                                fontFamily: 'InterSemiBold',
                                                fontSize: 12,
                                                color: 'rgba(0,0,0,0.85)',
                                                backgroundColor: `${getBoxColor(order.status, order.archived)}0.15)`,
                                                border: `1px solid ${getBoxColor(order.status, order.archived)}0.7)`,
                                                borderRadius: 2,
                                                textAlign: 'center',
                                                py: 0.5,
                                                px: 1.2,
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                                transition: 'all 0.2s ease-in-out',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: `${getBoxColor(order.status, order.archived)}0.25)`,
                                                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                                    transform: 'translateY(-1px)',
                                                },
                                            }}
                                        >
                                            {order.id}
                                        </Box>
                                    )}
                                </TableCell>

                                <TableCell sx={{ maxWidth: '200px' }}>
                                    <Typography 
                                        sx={{ 
                                            fontFamily: 'InterBold',
                                            fontSize: 14.5,
                                            color: 'rgba(0,0,0,0.70)', 
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {order.items.map(item => item.name).join(', ')}
                                    </Typography>
                                    <Typography 
                                        sx={{ 
                                            fontFamily: 'InterSemiBold',
                                            fontSize: 12,
                                            color: 'rgba(0,0,0,0.5)', 
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {order.items.map(item => item.artists.map(artist => artist.name)).join(', ')}
                                    </Typography>
                                </TableCell>

                                <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.75)' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        {getBar(order.status, order.id, tableSelected, setOrdersPage, numberPage, searchTerm)}
                                    </Box>
                                </TableCell>

                                <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.75)', fontSize: 12 }}>
                                    {order.created}
                                </TableCell>

                                <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.75)', fontSize: 12 }}>
                                    por hacer
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableOrders;

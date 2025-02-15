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



const TableNotifications = ({loading, notifications }) => {
    if (loading) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    width: 200, 
                    mt: 2, 
                    height: 400,
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
                width: 300,
                mx: 'auto', 
                height: 400,
                mt: 2, 
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '2px',
                },
            }}
        >
            <Table >
                

                <TableBody>
                    {notifications?.length === 0 ? (
                        <TableRow>
                            <TableCell 
                                sx={{ 
                                    textAlign: 'center', 
                                    py: 2, 
                                    height: '200px' 
                                }}
                            >
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
                                        sx={{ 
                                            color: 'rgba(0, 0, 0, 0.45)', 
                                            fontFamily: 'InterSemiBold' 
                                        }}
                                    >
                                        No messages available
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : (
                        notifications?.map((notification, index) => (
                            
                            <TableRow
                component={Link}
                to={`/orders/${notification.orderId}`}
                
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
                      <Box
                        sx={{
                        }}
                      >
                        {notification.orderId}
                      </Box>
                  
                                </TableCell>

                                <TableCell>
                      <Box
                        sx={{
                        }}
                      >
                        {notification.type}
                      </Box>
                  
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableNotifications;

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
    Badge,
    Button, 
    ListItem,
    Checkbox
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { getBoxColor, getBar } from './functions/Functions';
import AlbumIcon from '@mui/icons-material/Album';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import Popover from '@mui/material/Popover';
import MoneyIcon from '@mui/icons-material/Money';
import CheckIcon from '@mui/icons-material/Check';


const TableOrders = ({ tableSelected, loading, setOrdersPage, numberPage, orders, searchTerm }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleAssocClick = (event, order) => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        setSelectedOrder(order);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
        setSelectedOrder(null);
    };

    const open = Boolean(anchorEl);
    if (loading) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    width: '100%',
                    height: '65vh',
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
        <>
        
        <TableContainer
            sx={{ 
                height: '65vh',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '2px',
                },
            }}
        >
            <Table stickyHeader sx={{ height: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell 
                            sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '1%',
                            }}
                        >
                            Id
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)'  }}>
                            Title
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '15%' }}>
                            Status
                        </TableCell>
                        <TableCell
                            sx={{
                                fontFamily: 'InterSemiBold',
                                color: 'rgba(0,0,0,0.65)',
                                width: '15%',
                                alignItems: 'center',
                            }}
                            >
                            Created
                            <ArrowDropDown sx={{ fontSize: '1.125rem', ml: '0.25rem' }} />
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '1%' }}>
                            Link
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '1%' }}>
                            It.
                        </TableCell>
                        

                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '1%' }}>
                            Warn.
                        </TableCell>
                        
                    </TableRow>
                </TableHead>

                 <TableBody
                    sx={{
                        minHeight: '100%',
                    }}
                >
                    {orders?.length === 0 ? (
                        <TableRow sx={{ height: '100%' }}>
                            <TableCell colSpan={8} sx={{ p: 0}}>
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
                                    No orders available
                                </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders?.map((order, index) => {
                            const isReadyToPack =
                                    order.status === "Payment Received" &&
                                    order.items?.every(item => item.associated === true) &&
                                    (!order.warning || order.warning.trim() === "");

                            return (
                            
                            <TableRow
                                key={order.id}
                                component={Link}
                                to={`/orders/${order.id}`}
                                sx={{
                                    maxHeight: 'max-content',
                                    textDecoration: 'none',
                                    background: order.justAdded
                                        ? 'linear-gradient(90deg, rgba(33,150,243,0.03), rgba(33,150,243,0.00))'
                                        : isReadyToPack
                                        ? 'linear-gradient(90deg, rgba(126, 202, 63,0.08), rgba(126, 202, 63,0.02))'
                                        : index % 2 === 0
                                        ? 'white'
                                        : 'rgba(0, 0, 0, 0.02)',
                                    boxShadow: order.justAdded
                                        ? 'inset 0 0 10px rgba(33,150,243,0.1)'
                                        : isReadyToPack
                                        ? 'inset 0 0 10px rgba(126, 202, 63,0.1)'
                                        : 'none',
                                    '&:hover': {
                                        backgroundColor: order.justAdded
                                            ? 'rgba(33,150,243,0.05)'
                                            : isReadyToPack
                                            ? 'rgba(126, 202, 63,0.05)'
                                            : 'rgba(0, 0, 0, 0.05)',
                                        '& .number-box': {
                                            color: order.justAdded
                                                ? '#03386eff'
                                                : isReadyToPack
                                                ? 'rgb(65, 124, 17)'
                                                : 'rgba(0,0,0,1)',
                                            borderColor:  'rgba(0,0,0,0.25)',
                                        },
                                    },
                                }}
                            >
                                
                                <TableCell>
                                    
                                        <Box
                                            className="number-box"
                                            sx={{
                                                fontFamily: 'InterSemiBold',
                                                fontSize: '0.75rem',
                                                color: order.justAdded
                                                    ? 'rgba(47, 101, 183, 1)'
                                                    : isReadyToPack
                                                    ? 'rgb(85, 143, 38)'
                                                    : 'rgba(0,0,0,0.85)',
                                                backgroundColor: order.justAdded
                                                    ? 'rgba(33,150,243,0.10)'
                                                    : isReadyToPack
                                                    ? 'rgba(126, 202, 63,0.1)'
                                                    : `${getBoxColor(order.status, order.archived)}0.15)`,
                                                border: order.justAdded
                                                    ? '0.0625rem solid rgba(33,150,243,0.5)'
                                                    : isReadyToPack
                                                    ? '0.0625rem  solid rgba(111, 173, 60, 0.5)'
                                                    : `0.0625rem  solid ${getBoxColor(order.status, order.archived)}0.75)`,
                                                textShadow: order.justAdded
                                                    ? '0px 0px 4px rgba(33,150,243,0.15)'
                                                    : isReadyToPack
                                                    ? '0px 0px 4px rgba(126, 202, 63,0.15)'
                                                    : '0px 0px 4px rgba(0,0,0,0.10)',
                                                borderRadius: '0.5rem',
                                                textAlign: 'center',
                                                py: '0.25rem',
                                                px: '0.6rem',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                                transition: 'all 0.2s ease-in-out',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: order.justAdded
                                                        ? 'rgba(33,150,243,0.10)'
                                                        : isReadyToPack
                                                        ? 'rgba(126, 202, 63,0.2)'
                                                        : `${getBoxColor(order.status, order.archived)}0.25)`,
                                                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                                    transform: 'translateY(-1px)',
                                                },
                                            }}
                                        >
                                            {order.id}
                                        </Box>
                                </TableCell>

                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {(order.justAdded || isReadyToPack) && (
                                            <Box
                                                sx={{
                                                    width: '0.5rem',
                                                    height: '0.5rem',
                                                    flexShrink: 0,
                                                    borderRadius: '50%',
                                                    background: order.justAdded
                                                        ? 'linear-gradient(135deg, #42a5f5, #1e88e5)'
                                                        : 'linear-gradient(135deg, #66bb6a, #388e3c)', 
                                                    boxShadow: order.justAdded
                                                        ? '0 0 6px rgba(33,150,243,0.6)'
                                                        : '0 0 6px rgba(126, 202, 63,0.6)',
                                                    animation: 'pulse 1.8s infinite ease-in-out',
                                                    '@keyframes pulse': {
                                                        '0%': { transform: 'scale(0.8)', opacity: 1 },
                                                        '50%': { transform: 'scale(1)', opacity: 0.5 },
                                                        '100%': { transform: 'scale(0.8)', opacity: 1 },
                                                    },
                                                }}
                                            />
                                        )}

                                        <Typography
                                            sx={{
                                                fontFamily: 'InterBold',
                                                fontSize: '0.90625rem',
                                                color: order.justAdded
                                                    ? 'rgba(47, 101, 183, 1)'
                                                    : isReadyToPack
                                                    ? 'rgb(85, 143, 38)'
                                                    : 'rgba(0,0,0,0.75)',

                                                textShadow: order.justAdded
                                                    ? '0px 0px 4px rgba(33,150,243,0.15)'
                                                    : isReadyToPack
                                                    ? '0px 0px 4px rgba(85, 143, 38,0.15)'
                                                    : '0px 0px 4px rgba(0,0,0,0.10)',
                                                transition: 'all 0.25s ease-in-out',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'normal',
                                                wordBreak: 'break-word', 
                                            }}
                                        >
                                            {order.items.map(item => item.release.name).join(', ')}
                                        </Typography>
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontFamily: 'InterSemiBold',
                                            fontSize: '0.75rem',
                                            color: order.justAdded
                                                    ? 'rgba(47, 101, 183, 0.7)'
                                                    : isReadyToPack
                                                    ? 'rgba(85, 143, 38, 0.7)'
                                                    : 'rgba(0,0,0,0.5)',
                                            transition: 'color 0.3s ease-in-out',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {order.items.map(item => item.release.artists.map(artist => artist.name)).join(', ')}
                                    </Typography>
                                </TableCell>
                                    
                                

                               

                                <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.75)', }}>
                                        {getBar(order.status, order.id, tableSelected, setOrdersPage, numberPage, searchTerm)}
                                </TableCell>

                                <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.75)', fontSize: '0.8125rem'}}>
                                    
                                    <Box sx ={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        {order.created}
                                    </Box>
                                </TableCell>

                                <TableCell sx={{ textAlign: 'center' }}>
                                    {order.uri ? (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                window.open(order.uri, '_blank');
                                            }}
                                            sx={{
                                                width: '2rem',
                                                height: '2rem',
                                                minWidth: '2rem',
                                                borderRadius: '0.375rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderColor: 'rgba(0,0,0,0.2)',
                                                color: 'rgba(0,0,0,0.65)',    
                                                backgroundColor: 'white',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                                    borderColor: 'rgba(0,0,0,0.3)',
                                                    color: 'rgba(0,0,0,0.85)',
                                                },
                                            }}
                                        >
                                            <OpenInNewIcon sx={{ fontSize: '1.125rem' }} />
                                        </Button>
                                    ) : (
                                        <Typography sx={{ fontSize: '0.75rem', color: 'rgba(0,0,0,0.5)' }}>
                                           Not Av.
                                        </Typography>
                                    )}
                                </TableCell>

                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={(e) => handleAssocClick(e, order)}
                                        sx={{
                                            width: '2rem',
                                            height: '2rem',
                                            minWidth: '2rem',
                                            borderRadius: '0.375rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderColor: 'rgba(0,0,0,0.2)',
                                            backgroundColor: 'white',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0,0,0,0.05)',
                                                borderColor: 'rgba(0,0,0,0.3)',
                                            },
                                        }}
                                    >
                                        {order.items?.every(item => item.associated === true) ? (
                                            <CheckIcon sx={{ color: 'rgba(0,0,0,0.65)', fontSize: '1.125rem' }} />
                                        ) : (
                                            <PriorityHighRoundedIcon sx={{ color: 'rgba(0,0,0,0.65)', fontSize: '1.125rem' }} />
                                        )}
                                    </Button>

                                </TableCell>

                                

                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            width: '2rem',
                                            height: '2rem',
                                            minWidth: '2rem',
                                            borderRadius: '0.375rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderColor: 'rgba(0,0,0,0.2)',
                                            backgroundColor: 'white',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0,0,0,0.05)',
                                                borderColor: 'rgba(0,0,0,0.3)',
                                            },
                                        }}
                                    >
                                        {(order.warning != null && order.warning.trim() !== "")? (
                                            <PriorityHighRoundedIcon sx={{ color: 'rgba(0,0,0,0.65)', fontSize: '1.125rem' }} />
                                        ) : (
                                            <CheckIcon sx={{ color: 'rgba(0,0,0,0.65)', fontSize: '1.125rem' }} />
                                        )}
                                    </Button>

                                </TableCell>
                            </TableRow>
                        );
                        })
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            PaperProps={{
                sx: {
                    p:'0.5rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                }
            }}
        >
            {selectedOrder?.items.map((item, index) => (
                <ListItem
                        key={index}
                        sx={{ 
                            borderBottom: '1px solid #ddd',
                            borderLeft: item.associated ? '2px solid rgba(126, 202, 63,0.4)' : "transparent",
                            backgroundColor: item.associated ? "rgba(126, 202, 63,0.075)" : "transparent",
                            gap: '1rem',
                            alignItems: 'center',
                        }}
                    >
                        <img 
                            src={item.release.thumb} 
                            style={{ 
                                width: '2.5rem', height: '2.5rem', objectFit: 'cover', borderRadius: '0.25rem'}}
                        />
                        <Box > 
                            <Typography sx={{ fontFamily: 'InterBold', fontSize: '0.8125rem' , color: 'rgba(0,0,0,0.70)', textShadow:  '0px 0px 4px rgba(0,0,0,0.10)'}}>
                                {item.release.name}
                            </Typography>
                            <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: '0.625rem', color: 'rgba(0,0,0,0.5)',}}>
                                {item.release.artists.map(artist => artist.name).join(', ')}
                            </Typography>

                            <Typography sx={{ fontFamily: 'InterRegular', fontSize: '0.5625rem', color: 'rgba(0,0,0,0.5)',}}>
                                {"Condition of Item: "}
                                {item.discCondition}
                                {" "}
                                {item.sleeveCondition}
                            </Typography>
                            
                        </Box>

                    {item.associated && (
                        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                            <CheckIcon 
                                sx={{ 
                                    fontSize: '1.125rem',
                                    color: '#2e7d32',
                                    backgroundColor: 'rgba(46,125,50,0.1)',
                                    borderRadius: '50%',
                                    p: '0.15rem'
                                }} 
                            />
                        </Box>
                    )}

                   
                </ListItem>
            ))}
        </Popover>

        </>
    );
    
}

export default TableOrders;

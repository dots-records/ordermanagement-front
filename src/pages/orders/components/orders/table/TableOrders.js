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
        <>
        <TableContainer
            sx={{ 
                width: '100%',
                height: '60vh',
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
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)'  }}>
                            Title
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '180px' }}>
                            Status
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '140px' }}>
                            Created
                            <ArrowDropDown sx={{ fontSize: 18, ml: 0.3,  color: 'rgba(0,0,0,0.65)' }} />
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '40px' }}>
                            Link
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '40px' }}>
                            Items
                        </TableCell>
                        
                    </TableRow>
                </TableHead>

                <TableBody>
                    {orders?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} sx={{ textAlign: 'center', py: 2, height: '200px' }}>
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
                                    background: order.justAdded
                                        ? 'linear-gradient(90deg, rgba(33,150,243,0.03), rgba(33,150,243,0.00))'
                                        : index % 2 === 0
                                        ? 'white'
                                        : 'rgba(0, 0, 0, 0.02)',
                                    boxShadow: order.justAdded ? 'inset 0 0 10px rgba(33,150,243,0.1)' : 'none',
                                    '&:hover': {
                                        backgroundColor: order.justAdded
                                            ? 'rgba(33,150,243,0.05)'
                                            : 'rgba(0, 0, 0, 0.05)',
                                        '& .number-box': {
                                            color: order.justAdded ? '#03386eff' : 'rgba(0,0,0,1)',
                                            borderColor:  'rgba(0,0,0,0.25)',
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
                                            sx={{
                                                '& .MuiBadge-badge': {
                                                    backgroundColor: order.justAdded
                                                        ? 'rgba(47, 101, 183, 0.85)' // azul si cambió
                                                        : 'rgba(226, 30, 26, 0.85)', // rojo si no
                                                    color: 'white',
                                                    boxShadow: order.justAdded
                                                        ? '0 0 6px rgba(33,150,243,0.2)'
                                                        : '0 0 6px rgba(254,117,114,0.2)',
                                                    fontFamily: 'InterSemiBold',
                                                },
                                            }}
                                        >
                                            <Box
                                                className="number-box"
                                                sx={{
                                                    fontFamily: 'InterSemiBold',
                                                    fontSize: 12,
                                                    color: order.justAdded ? 'rgba(47, 101, 183, 1)': 'rgba(0,0,0,0.85)',
                                                    backgroundColor: order.justAdded ? 'rgba(33,150,243,0.10)': `${getBoxColor(order.status, order.archived)}0.15)`,
                                                    border: order.justAdded ? '1px solid rgba(33,150,243,0.5)': `1px solid ${getBoxColor(order.status, order.archived)}0.75)`,
                                                    textShadow: order.justAdded ? '0px 0px 4px rgba(33,150,243,0.15)' : '0px 0px 4px rgba(0,0,0,0.10)',
                                                
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
                                                        backgroundColor: order.justAdded ? 'rgba(33,150,243,0.20)' : `${getBoxColor(order.status, order.archived)}0.25)`,
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
                                               color: order.justAdded ? 'rgba(47, 101, 183, 1)': 'rgba(0,0,0,0.85)',
                                                    backgroundColor: order.justAdded ? 'rgba(33,150,243,0.10)': `${getBoxColor(order.status, order.archived)}0.15)`,
                                                    border: order.justAdded ? '1px solid rgba(33,150,243,0.5)': `1px solid ${getBoxColor(order.status, order.archived)}0.75)`,
                                                    textShadow: order.justAdded ? '0px 0px 4px rgba(33,150,243,0.15)' : '0px 0px 4px rgba(0,0,0,0.10)',
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
                                                    backgroundColor: order.justAdded ? 'rgba(33,150,243,0.20)' :`${getBoxColor(order.status, order.archived)}0.25)`,
                                                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                                                    transform: 'translateY(-1px)',
                                                },
                                            }}
                                        >
                                            {order.id}
                                        </Box>
                                    )}
                                </TableCell>

                                <TableCell sx={{ maxWidth: '200px', position: 'relative'}}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {order.justAdded && (
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    mt: 0.07,
                                                    background: 'linear-gradient(135deg, #42a5f5, #1e88e5)',
                                                    boxShadow: '0 0 6px rgba(33,150,243,0.6)',
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
                                                fontSize: 14.5,
                                                color: order.justAdded ? 'rgba(47, 101, 183, 1)' : 'rgba(0,0,0,0.75)',
                                                textShadow: order.justAdded ? '0px 0px 4px rgba(33,150,243,0.15)' : '0px 0px 4px rgba(0,0,0,0.10)',
                                                borderRadius: 1,
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
                                            fontSize: 12,
                                            color: order.justAdded ? 'rgba(13, 71, 161, 0.7)' : 'rgba(0,0,0,0.5)',
                                            transition: 'color 0.3s ease-in-out',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-word',
                                            mt: 0.2
                                        }}
                                    >
                                        {order.items.map(item => item.release.artists.map(artist => artist.name)).join(', ')}
                                    </Typography>
                                </TableCell>
                                    
                                

                               

                                <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.75)' }}>
                                        {getBar(order.status, order.id, tableSelected, setOrdersPage, numberPage, searchTerm)}
                                </TableCell>

                                <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.75)', fontSize: 13}}>
                                    
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
                                                width: 32,
                                                height: 32,
                                                minWidth: 32,
                                                borderRadius: 1.5,          // esquinas suaves
                                                padding: 0,                  // icono centrado
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderColor: 'rgba(0,0,0,0.2)', // borde gris suave
                                                color: 'rgba(0,0,0,0.65)',      // color del icono gris oscuro
                                                backgroundColor: 'white',
                                                transition: 'all 0.2s ease-in-out',
                                                
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0,0,0,0.05)', // hover sutil
                                                    borderColor: 'rgba(0,0,0,0.3)',
                                                    color: 'rgba(0,0,0,0.85)',
                                                },
                                            }}
                                        >
                                            <OpenInNewIcon sx={{ fontSize: 18 }} />
                                        </Button>
                                    ) : (
                                        <Typography sx={{ fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>
                                           
                                        </Typography>
                                    )}
                                </TableCell>

                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={(e) => handleAssocClick(e, order)}
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            minWidth: 32,
                                            borderRadius: 1.5,
                                            padding: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderColor: 'rgba(0,0,0,0.2)',
                                            backgroundColor: 'white',
                                            transition: 'all 0.2s ease-in-out',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0,0,0,0.05)',
                                                borderColor: 'rgba(0,0,0,0.3)',
                                            },
                                        }}
                                    >
                                        {order.items?.every(item => item.associated === true) ? (
                                            <AlbumIcon sx={{ color: 'rgba(0,0,0,0.65)', fontSize: 22 }} />
                                        ) : (
                                            <PriorityHighRoundedIcon sx={{ color: 'rgba(0,0,0,0.65)', fontSize: 22 }} />
                                        )}
                                    </Button>

                                </TableCell>

                                

                            </TableRow>
                        ))
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
                    p: 2,
                    borderRadius: 2,
                    minWidth: 250,
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
                            gap: 2,
                            alignItems: 'center',
                        }}
                    >
                    <img 
                            src={item.release.thumb} 
                            style={{ width: '35px', height: '35px', objectFit: 'cover', borderRadius: '3px'}}
                        />
                    <Box> 
                            <Typography sx={{ fontFamily: 'InterBold', fontSize: 13 , color: 'rgba(0,0,0,0.70)', textShadow:  '0px 0px 4px rgba(0,0,0,0.10)'}}>
                                {item.release.name}
                            </Typography>
                            <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 10, color: 'rgba(0,0,0,0.5)',}}>
                                {item.release.artists.map(artist => artist.name).join(', ')}
                            </Typography>

                            <Typography sx={{ fontFamily: 'InterRegular', fontSize: 9, color: 'rgba(0,0,0,0.5)',}}>
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
                                    fontSize: 18,
                                    color: '#2e7d32',
                                    backgroundColor: 'rgba(46,125,50,0.1)',
                                    borderRadius: '50%',
                                    p: 0.3
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

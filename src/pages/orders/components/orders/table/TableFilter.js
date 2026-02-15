
import React, { useState } from 'react';
import {Typography, Box, Menu, MenuItem, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Money, AccessTime, LocalShipping, DoNotDisturb, Receipt, Autorenew} from '@mui/icons-material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


import { setActiveOrders, setInactiveOrders, setAllOrders } from '../../../functions/Functions';

const TableFilter = ({filter, setFilter}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (status) => {
        setFilter(status);
        setAnchorEl(null);
    };

    return(
        <>
            <Button
                        aria-controls={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        variant="outlined"
                        sx={{
                            textDecoration: 'none',
                            position: 'absolute',  // Posición absoluta
                            top: 24,               // Ajusta la distancia desde el borde superior
                            right: 407,             // Ajusta la distancia desde el borde derecho
                            fontFamily: 'InterSemiBold',
                            fontSize: '13px',
                            backgroundColor: 'rgba(0, 0, 0, 0.03)',  // Color de fondo normal
                            borderColor: 'rgba(0, 0, 0, 0.2)',       // Color del borde normal
                            color: 'rgba(0,0,0,0.6)',                // Color del texto normal
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.03)', // Color de fondo al hacer hover
                                color: 'rgba(0, 0, 0, 1)',              // Color del texto al hacer hover
                                borderColor: 'rgba(0, 0, 0, 0.25)',    // Color del borde al hacer hover
                                '& .MuiSvgIcon-root': {                // Estilo para el icono cuando se pasa el ratón sobre el botón
                                    color: 'rgba(0, 0, 0, 1)',        // Color del icono al hacer hover
                                },
                            },
                        }}
                    >
                        {filter}
                        <MenuIcon sx={{ fontSize: '10px', ml: 0.5 }} /> {/* Muestra el filtro seleccionado */}
                    </Button>

            <Menu
                id="filter-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                    sx: {
                        width: 255,
                        '& .MuiMenuItem-root': {
                            fontSize: 12,
                            fontFamily: 'InterSemiBold',
                        },
                    },
                }}
            >
                <MenuItem onClick={() => handleClose('All')}>All</MenuItem>

                <MenuItem onClick={() => handleClose('Payment Received')}>
                    <Money sx={{ fontSize: 20, color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: 12, fontFamily: 'InterSemiBold', ml: 1 }}>
                        Payment Received
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose('In Progress')}>
                    <AccessTime sx={{ fontSize: 20, color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: 12, fontFamily: 'InterSemiBold', ml: 1 }}>
                        In Progress
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose('Shipped')}>
                    <LocalShipping sx={{ fontSize: 20, color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: 12, fontFamily: 'InterSemiBold', ml: 1 }}>
                        Shipped
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose("Cancelled (Per Buyer's Request)")}>
                    <DoNotDisturb sx={{ fontSize: 20, color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: 12, fontFamily: 'InterSemiBold', ml: 1 }}>
                        Cancelled (Per Buyer's Request)
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose('Cancelled (Non-Paying Buyer)')}>
                    <DoNotDisturb sx={{ fontSize: 20, color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: 12, fontFamily: 'InterSemiBold', ml: 1 }}>
                        Cancelled (Non-Paying Buyer)
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose('Cancelled (Item Unavailable)')}>
                    <DoNotDisturb sx={{ fontSize: 20, color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: 12, fontFamily: 'InterSemiBold', ml: 1 }}>
                        Cancelled (Item Unavailable)
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose('Invoice Sent')}>
                    <Receipt sx={{ fontSize: 20, color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: 12, fontFamily: 'InterSemiBold', ml: 1 }}>
                        Invoice Sent
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose('Payment Pending')}>
                    <Autorenew sx={{ fontSize: 20, color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: 12, fontFamily: 'InterSemiBold', ml: 1 }}>
                        Payment Pending
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose('Other')}>
                    <MoreHorizIcon sx={{ fontSize: 20, color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: 12, fontFamily: 'InterSemiBold', ml: 1 }}>
                        Other
                    </Typography>
                </MenuItem>
            </Menu>

        </>
    )

}

export default TableFilter;

import React, { useState } from 'react';
import {Typography, Box, Menu, MenuItem, Button} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Money, AccessTime, LocalShipping, DoNotDisturb, Receipt, Autorenew} from '@mui/icons-material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


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
                    fontFamily: 'InterSemiBold',
                    fontSize: '0.75rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.03)', 
                    borderColor: 'rgba(0, 0, 0, 0.3)',      
                    color: 'rgba(0,0,0,0.6)',             
                    textTransform: 'none',
                    gap: '0.5rem',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.03)',
                        color: 'rgba(0, 0, 0, 1)',              
                        borderColor: 'rgba(0, 0, 0, 0.25)', 
                        '& .MuiSvgIcon-root': {               
                            color: 'rgba(0, 0, 0, 1)',    
                        },
                    },
                }}
            >
                {filter}
                <MenuIcon sx={{fontSize: '0.75rem' }} />
            </Button>

            <Menu
                id="filter-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                    sx: {
                        width: '15.9375rem',
                        '& .MuiMenuItem-root': {
                            fontSize: '0.75rem',
                            fontFamily: 'InterSemiBold',
                        },
                    },
                }}
            >
                <MenuItem onClick={() => handleClose('All')}>All</MenuItem>

                <MenuItem onClick={() => handleClose('Payment Received')} sx={{gap:'0.5rem'}}>
                    <Money sx={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: '0.75rem',fontFamily: 'InterSemiBold'}}>
                        Payment Received
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose('In Progress')} sx={{gap:'0.5rem'}}>
                    <AccessTime sx={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: '0.75rem', fontFamily: 'InterSemiBold'}}>
                        In Progress
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose('Shipped')} sx={{gap:'0.5rem'}}>
                    <LocalShipping sx={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: '0.75rem', fontFamily: 'InterSemiBold' }}>
                        Shipped
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose("Cancelled (Per Buyer's Request)")} sx={{gap:'0.5rem'}}>
                    <DoNotDisturb sx={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: '0.75rem', fontFamily: 'InterSemiBold' }}>
                        Cancelled (Per Buyer's Request)
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose('Cancelled (Non-Paying Buyer)')} sx={{gap:'0.5rem'}}>
                    <DoNotDisturb sx={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: '0.75rem', fontFamily: 'InterSemiBold' }}>
                        Cancelled (Non-Paying Buyer)
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose('Cancelled (Item Unavailable)')} sx={{gap:'0.5rem'}}>
                    <DoNotDisturb sx={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: '0.75rem', fontFamily: 'InterSemiBold' }}>
                        Cancelled (Item Unavailable)
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose('Invoice Sent')} sx={{gap:'0.5rem'}}>
                    <Receipt sx={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: '0.75rem', fontFamily: 'InterSemiBold'}}>
                        Invoice Sent
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose('Payment Pending')} sx={{gap:'0.5rem'}}>
                    <Autorenew sx={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: '0.75rem', fontFamily: 'InterSemiBold' }}>
                        Payment Pending
                    </Typography>
                </MenuItem>

                <MenuItem onClick={() => handleClose('Other')} sx={{gap:'0.5rem'}}>
                    <MoreHorizIcon sx={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.6)' }} />
                    <Typography sx={{ fontSize: '0.75rem', fontFamily: 'InterSemiBold' }}>
                        Other
                    </Typography>
                </MenuItem>
            </Menu>

        </>
    )

}

export default TableFilter;
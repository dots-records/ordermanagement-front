import { useNavigate } from "react-router-dom";
import { Box, Typography, List, ListItem, IconButton } from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddLinkIcon from '@mui/icons-material/AddLink';CheckIcon
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
import DialogAssociation from "./dialog_association/DialogAssociation";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DialogReleaseSwap from "./dialog_release_swap/DialogReleaseSwap";
import Popover from '@mui/material/Popover';
import SelectedProvider from "./item_information/SelectedProvider";
import SelectedListing from "./item_information/SelectedListing";
import AddIcon from '@mui/icons-material/Add';

const TableItems = ({ order, fetchOrder }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogSwapOpen, setDialogSwapOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleCheckClick = (event, item) => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        setSelectedItem(item);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
        setSelectedItem(null);
    };

    const handleOpenDialog = (item) => {
        setSelectedItem(item);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedItem(null);
        fetchOrder();
    };

    const handleOpenDialogSwap = (item) => {
        setSelectedItem(item);
        setDialogSwapOpen(true);
    };

    const handleCloseDialogSwap = () => {
        setDialogSwapOpen(false);
        setSelectedItem(null);
        fetchOrder();
    };
    
    
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    return (
        <>
            <List>
                {order?.items.map((item, index) => (
                    <ListItem
                        key={index}
                        sx={{ 
                            borderBottom: '1px solid #ddd',
                            borderLeft: item.associated ? '0.125rem solid rgba(126, 202, 63,0.4)' : "transparent",
                            backgroundColor: item.associated ? "rgba(126, 202, 63,0.075)" : "transparent",
                            gap: '1rem',
                            alignItems: 'center',
                        }}
                    >
                        <img 
                            src={item.release.thumb} 
                            style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover', borderRadius: '0.25rem'}}
                        />
                        <Box > 
                            <Typography sx={{ fontFamily: 'InterBold', fontSize: '0.8125rem' , color: 'rgba(0,0,0,0.70)', 
                                textShadow:  '0px 0px 4px rgba(0,0,0,0.10)'}}>
                                {item.release.name}
                            </Typography>
                            <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: '0.625rem', color: 'rgba(0,0,0,0.5)'}}>
                                {item.release.artists.map(artist => artist.name).join(', ')}
                            </Typography>
                            <Typography sx={{ fontFamily: 'InterRegular', fontSize: '0.5625rem', color: 'rgba(0,0,0,0.5)'}}>
                                {"Condition of Item: "}
                                {item.discCondition}
                                {" "}
                                {item.sleeveCondition}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                ml: 'auto',
                                gap: '0.5rem',
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >

                            <IconButton
                                size="small"
                                disabled={item.associated}
                                onClick={() => handleOpenDialogSwap(item)}
                                sx={{
                                    color: 'rgba(0,0,0,0.45)',
                                    '&:hover': {
                                        color: 'rgba(0,0,0,0.85)',
                                    },
                                    '&.Mui-disabled': {
                                        color: 'rgba(0,0,0,0.2)', 
                                    }
                                }}
                            >
                                {item.release.id == null ? (
                                    <AddIcon sx={{ fontSize: '1.0625rem' }} />
                                ) : (
                                    <SwapHorizIcon sx={{ fontSize: '1.0625rem' }} />
                                )}
                            </IconButton>

                            <IconButton
                                size="small"
                                onClick={() => window.open(`/releases/${item.release.id}`, "_blank")}
                                sx={{
                                    color: 'rgba(0,0,0,0.45)',
                                    '&:hover': {
                                        color: 'rgba(0,0,0,0.85)',
                                    },
                                }}
                            >
                                <OpenInNewIcon sx={{ fontSize: '1.0625rem' }} />
                            </IconButton>
                                                
                            {!item.associated && (
                                <IconButton
                                    size="small"
                                    onClick={() => handleOpenDialog(item)}
                                    sx={{
                                        color: 'rgba(0,0,0,0.45)',
                                        
                                        '&:hover': {
                                            color: 'rgba(0,0,0,0.85)',
                                        },
                                    }}
                                >
                                    
                                    <AddLinkIcon sx={{ fontSize: '1.0625rem' }} />
                                </IconButton>
                            )}

                            {item.associated && (
                                <IconButton
                                    size="small"
                                    onClick={(e) => handleCheckClick(e, item)}
                                    sx={{
                                        color: '#2e7d32',
                                    }}
                                >
                                    
                                    <CheckIcon sx={{ fontSize: '1.0625rem' }} />
                                </IconButton>
                            )}
                        </Box>

                        
                    </ListItem>
                ))}
            </List>
            <DialogAssociation
                open={dialogOpen}
                handleClose={handleCloseDialog}
                order={order}
                item={selectedItem}
            />

            <DialogReleaseSwap
                open={dialogSwapOpen}
                handleClose={handleCloseDialogSwap}
                order={order}
                item={selectedItem}
            />

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
                        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                        justifyContent: "center",
                    }
                }}
            >
                {selectedItem != null && (
                    <>
                        <SelectedProvider provider={selectedItem.provider}/>
                        <SelectedListing listing={selectedItem.listing}/>
                    </>
                )}
            </Popover>
        </>
    );
};

export default TableItems;

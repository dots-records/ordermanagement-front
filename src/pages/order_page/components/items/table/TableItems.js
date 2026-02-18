import { useNavigate } from "react-router-dom";
import { Box, Typography, List, ListItem, IconButton } from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddLinkIcon from '@mui/icons-material/AddLink';CheckIcon
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
import DialogAssociation from "./dialog_association/DialogAssociation";

const TableItems = ({ order, loading, fetchOrder }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpenDialog = (item) => {
        setSelectedItem(item);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedItem(null);
        fetchOrder();
    };
    
    const navigate = useNavigate();

    //hacer que returne una bolita de esas
    if (loading) {
        return <Typography>Cargando...</Typography>;
    }

    return (
        <>
            <List>
                {order?.items.map((item, index) => (
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
                        </Box>

                        <Box
                            sx={{
                                ml: 'auto',
                                gap: 1,
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <IconButton
                                size="small"
                                onClick={() => navigate(`/releases/${item.release.id}`)}
                                sx={{
                                    color: 'rgba(0,0,0,0.45)',
                                    '&:hover': {
                                        color: 'rgba(0,0,0,0.85)',
                                    },
                                }}
                            >
                                <OpenInNewIcon sx={{ fontSize: 17 }} />
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
                                    
                                    <AddLinkIcon sx={{ fontSize: 17 }} />
                                </IconButton>
                            )}

                            {item.associated && (
                                <IconButton
                                    size="small"
                                    onClick={() => navigate(`/releases/${item.release.id}`)}
                                    sx={{
                                        color: '#2e7d32',
                                    }}
                                >
                                    
                                    <CheckIcon sx={{ fontSize: 15 }} />
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
        </>
    );
};

export default TableItems;

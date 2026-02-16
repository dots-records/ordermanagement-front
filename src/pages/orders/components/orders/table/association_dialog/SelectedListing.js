import {
  List,
  ListItem,
  Typography,
  Box,
  IconButton,
  Button,
  Checkbox,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useState, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { patchOrderItemListing } from '../../../../../../services/itemService';
import { CircularProgress } from '@mui/material';

const SelectedListing = ({ orderId, itemId, listing, provider }) => {
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [price, setPrice] = useState(listing.sellingPrice);

    const handleSave = async () => {
        try {
            setLoading(true);
            await patchOrderItemListing(
                orderId,
                itemId,
                listing.id,
                listing.platform,
                listing.link,
                Number(price)
            );
            setIsEditing(false);
            setLoading(false);
        } catch (error) {
            console.error('Error al guardar el precio', error);
        }
    };
    


    useEffect(() => {
        setPrice(listing.sellingPrice);
    }, [listing]);

    const getDaysAgo = (dateString) => {
        if (!dateString) return null;

        const lastEdit = new Date(dateString);
        const now = new Date();

        const diffMs = now - lastEdit;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        return diffDays;
    };



    if (!listing) {
        return (
        <Typography
            sx={{
            fontSize: 12,
            color: 'rgba(0,0,0,0.4)',
            px: 1,
            py: 1.4,
            }}
        >
            Info. Not Available
        </Typography>
        );
    }
    const daysAgo = getDaysAgo(listing.dateLastEdition);

    return (
        <ListItem
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 2,
                cursor: "cursor" ,
                backgroundColor: 'white',
                border: '1px solid rgba(0,0,0,0.06)'
            }}
        >
                
        <Box sx ={{ width: "170px"}}>                
                    <Box
                    sx={{
                        fontFamily: 'InterSemiBold',
                        fontSize: 10,
                        color: 'rgba(0, 0, 0, 0.6)' ,
                        backgroundColor: 'rgba(0,0,0,0.02)',
                        border: '1px solid rgba(0,0,0,0.2)' ,
                        textShadow:'0px 0px 4px rgba(0,0,0,0.10)',
                        borderRadius: 2,
                        textAlign: 'center',
                        py: 0.5,
                        px: 1.2,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow:  '0 1px 3px rgba(0,0,0,0.1)' ,
                        '&:hover': {
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)' ,
                        transform:'translateY(-1px)',
                        },
                    }}
                    >
                    {listing.platform}
                    </Box>
                </Box>

                {isEditing ? (
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        autoFocus
                        style={{
                            textAlign: 'right',
                            fontSize: 12,
                            width: 80,
                            fontFamily: 'InterSemiBold',
                            color: 'rgba(0,0,0,0.85)',
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                        }}
                    />
                ) : (
                    <Typography
                        onClick={() => setIsEditing(true)}
                        sx={{
                            textAlign: 'right',
                            fontSize: 12,
                            width: 80,
                            fontFamily: 'InterSemiBold',
                            color: 'rgba(0,0,0,0.85)',
                            flexShrink: 0,
                            cursor: 'pointer',
                        }}
                    >
                        {price} €
                    </Typography>
                )}
                <Box
                    sx={{
                    width: 80,
                    textAlign: 'center',
                    }}
                >
                    <Typography
                    sx={{
                        fontSize: 10,
                        color:'rgba(0,0,0,0.4)' ,
                        fontFamily: 'InterRegular',
                        
                    }}
                    >
                    {daysAgo === null
                        ? ''
                        : daysAgo === 0
                        ? 'Today'
                        : daysAgo === 1
                        ? '1 day'
                        : `${daysAgo} days`}
                    </Typography>
                </Box>

                <Box
                    sx={{
                    ml: 'auto',
                    width: 30,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexShrink: 0,
                    }}
                >
                    {listing.link && (
                    <IconButton
                        size="small"
                        onClick={(e) => {
                        e.stopPropagation(); // 🔹 evita que el ListItem reciba el click
                        window.open(listing.link, '_blank');
                        }}
                        sx={{
                        color: 'rgba(0,0,0,0.45)' ,
                        '&:hover': {
                            color: 'rgba(0,0,0,0.85)',
                        },
                        }}
                    >
                        <OpenInNewIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    )}
                    
                </Box>
                
                <IconButton
                    onClick={handleSave}
                    size="small"
                    disabled={loading}
                    sx={{
                            color: 'rgba(0,0,0,0.45)' ,
                            '&:hover': {
                                color: 'rgba(0,0,0,0.85)',
                            },
                            }}
                >
                    {loading ? (
                        <CircularProgress
                            size={16}  // 🔹 ajusta el tamaño al botón
                            sx={{
                                color: 'rgba(0,0,0,0.85)', 
                            }}
                        />
                    ) : (
                        <SaveIcon sx={{ fontSize: 16 }} />
                    )}
                </IconButton>
                

                
                </ListItem>
            );
}

export default SelectedListing;

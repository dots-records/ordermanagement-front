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
import { patchOrderItemListing, patchOrderItemProvider } from '../../../../../../../../../services/itemService';
import { CircularProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SelectedListing = ({ order, item, listing, provider, setChanged}) => {
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [price, setPrice] = useState(listing.sellingPrice);
    const [errorMessage, setErrorMessage] = useState('');
    const [openErrorPopup, setOpenErrorPopup] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);
            await patchOrderItemListing(
                order.id,
                item.id,
                listing.id,
                listing.platform,
                listing.link,
                Number(price)
            );
            await patchOrderItemProvider(
                order.id,
                item.id,
                provider.id,
                provider.type,
                provider.price,
                provider.link,
                provider.units,
                provider.discCondition,
                provider.sleeveCondition,
                provider.description,
            );
            setChanged(true)
        } catch (error) {
            setErrorMessage(error.message);
            setOpenErrorPopup(true);
                
        }  finally {
            setIsEditing(false);
            setLoading(false);
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
            fontSize: '0.75rem',
            color: 'rgba(0,0,0,0.4)',
            }}
        >
            Info. Not Available
        </Typography>
        );
    }
    const daysAgo = getDaysAgo(listing.dateLastEdition);

    return (
        <>
            <ListItem
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    px: '2rem',
                    borderRadius: '1rem',
                    cursor: "cursor" ,
                    backgroundColor: 'white',
                    border: '1px solid rgba(0,0,0,0.06)'
                }}
            >
                    
            <Box sx ={{ width: "25%"}}>                
                        <Box
                            sx={{
                                fontFamily: 'InterSemiBold',
                                fontSize: '0.625rem',
                                color: 'rgba(0, 0, 0, 0.6)' ,
                                backgroundColor: 'rgba(0,0,0,0.02)',
                                border: '0.0625rem solid rgba(0,0,0,0.2)'  ,
                                textShadow:'0px 0px 4px rgba(0,0,0,0.10)',
                                borderRadius: '0.5rem',
                                textAlign: 'center',
                                py: '0.25rem',
                                px: '0.6rem',
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
                                fontSize: '0.75rem',
                                width: '15%',
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
                                fontSize: '0.75rem',
                                width: '15%',
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
                            width: '20%',
                            textAlign: 'center',
                            ml: 'auto',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '0.625rem',
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
                    <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
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
                                    size={'1rem'}  // 🔹 ajusta el tamaño al botón
                                    sx={{
                                        color: 'rgba(0,0,0,0.85)', 
                                    }}
                                />
                            ) : (
                                <SaveIcon sx={{  fontSize: '1rem'}} />
                            )}
                        </IconButton>
                    </Box>
                    

                    
                    </ListItem>
                <Snackbar
                    open={openErrorPopup}
                    autoHideDuration={4000}
                    onClose={() => setOpenErrorPopup(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        severity="error"
                        onClose={() => setOpenErrorPopup(false)}
                        sx={{ width: '100%', fontFamily: 'InterRegular' }}
                    >
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </>
        );
}

export default SelectedListing;

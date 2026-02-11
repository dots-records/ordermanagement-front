import React, { useState } from 'react'; 

import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from '@mui/material';

import vinted_icon from '../../../../../../files/vinted_icon.png';
import wallapop_icon from '../../../../../../files/wallapop_icon.png';
import discogs_icon from '../../../../../../files/discogs_icon.png';
import {createListingVinted, createListingWallapop, createListingDiscogs} from "../../../../../../services/listingService"


const ListingAdd = ({ open, onClose, providerId, releaseId }) => {
    
    const [platform, setPlatform] = useState('Vinted');
    const [link, setLink] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [loadingListingsAdd, setLoadingListingAdd] = useState(false);

    const handleSave = async () => {
        try {
            setLoadingListingAdd(true);

            if (platform === "Vinted") {
                await createListingVinted(releaseId, providerId, link, sellingPrice);
            } else if (platform === "Wallapop"){
                await createListingWallapop(releaseId, providerId, link, sellingPrice);
            } else if (platform === "Discogs"){
                await createListingDiscogs(releaseId, providerId, sellingPrice);
            }

            onClose();
            setLink('');
            setSellingPrice('');

        } catch (error) {
            console.error("Error creating listing:", error);
        } finally {
            setLoadingListingAdd(false);
        }
    };


    const isFormValid = () => {
        const priceRegex = /^\d+(\.\d+)?\s*$/;
        if (!sellingPrice || !priceRegex.test(sellingPrice)) return false;

        if (platform === 'Vinted' || platform === 'Wallapop') {
            const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
            if (!link || !urlRegex.test(link)) return false;
        }
        
        return true;
    };

    const minimalTextField = {
        variant: 'standard', 
        InputProps: {
            style: { color: 'black', fontFamily: 'InterRegular', fontSize: 16, },
        },
        InputLabelProps: {
            shrink: true,
            style: { color: 'rgba(0,0,0,0.5)', fontFamily: 'InterRegular',fontSize: 16, },
        },
        sx: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 0, // bordes cuadrados
            '& fieldset': {
                borderColor: 'rgba(0,0,0,0.6)',
            },
            '&:hover fieldset': {
                borderColor: 'rgba(0,0,0,0.5)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgba(0,0,0,0.85)',
            },
        },
    },
    };
    

    return (
        <>
                    
            <Dialog
                key={open ? 'open' : 'closed'}
                open={open}
                onClose={onClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (e) => {
                        e.preventDefault();
                        if (isFormValid()) {
                            handleSave();
                        }
                    },
                    sx: {
                        backgroundColor: 'white',
                        color: 'black',
                        borderRadius: 2,
                        p: 2
                    }
                }}
            >

                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Typography sx={{ fontFamily: "InterSemiBold", fontSize: 24 }}>
                            Add Listing
                        </Typography>
                        <IconButton
                            onClick={onClose}
                            sx={{ color: 'rgba(0,0,0,1)'  }}
                        >
                            <CloseIcon sx={{ fontSize: 24}} />
                        </IconButton>
                    </Box>
                </DialogTitle>
                
                <DialogContent sx={{my:2}}>
                    <Typography
                        sx={{
                            fontFamily: 'InterRegular',
                            fontSize: 12.5,
                            color: 'rgba(0,0,0,0.5)',
                            mb: 0.5
                        }}
                    >
                        Platform *
                    </Typography>
  

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {platform === 'Vinted' ? (
                            <Box
                                component="img"
                                src={vinted_icon}
                                alt="vinted"
                                sx={{
                                height: 22,
                                width: 'auto',
                                objectFit: 'contain',
                                }}
                            />
                        ) : platform === 'Wallapop' ? (
                            <Box
                                component="img"
                                src={wallapop_icon}
                                alt="wallapop"
                                sx={{
                                height: 22,
                                width: 'auto',
                                objectFit: 'contain',
                                }}
                            />
                        ) : platform === 'Discogs' ? (
                            <Box
                                component="img"
                                src={discogs_icon}
                                alt="discogs"
                                sx={{
                                height: 22,
                                width: 'auto',
                                objectFit: 'contain',
                                }}
                            />
                        ) : null
                        }

                        
                        
                        <TextField
                            select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                                style: {
                                    color: 'black',
                                    fontFamily: 'InterRegular',
                                    fontSize: 16,
                                    backgroundColor: 'transparent', // quita fondo gris
                                },
                            }}
                            sx={{
                                '& .MuiSelect-select': {
                                    backgroundColor: 'transparent', // quita fondo gris al abrir
                                    '&:focus': {
                                     backgroundColor: 'transparent', // quita fondo gris al enfocar
                                    },
                                },
                            }}
                            required
                        >
                            <MenuItem value="Vinted">Vinted</MenuItem>
                            <MenuItem value="Wallapop">Wallapop</MenuItem>
                            <MenuItem value="Discogs">Discogs</MenuItem>
                        </TextField>
                    </Box>
                    {(platform === 'Vinted' || platform === 'Wallapop') && (
                        <TextField
                            label="Link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            {...minimalTextField}
                            required
                            sx={{ mt:3, width: '100%'}}
                        />
                    )}


                    <TextField
                        label="Selling Price"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                        {...minimalTextField}
                        required
                        sx={{ mt:3, width: '25%'}}
                    />
                    
                </DialogContent>
                <DialogActions >
                    <Button
                        type="submit"
                        sx={{ color: 'black', fontFamily: 'InterSemiBold', mx:1 }}
                        disabled={!isFormValid() || loadingListingsAdd}
                    >
                        {loadingListingsAdd ? <CircularProgress size={20} color="inherit" /> : "Save"}
                    </Button>
                </DialogActions>

                {loadingListingsAdd && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 10,
                            borderRadius: 2
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
            </Dialog>
        </>
    );
};

export default ListingAdd;

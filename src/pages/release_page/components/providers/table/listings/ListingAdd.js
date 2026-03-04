import React, { useState } from 'react'; 

import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from '@mui/material';

import vinted_icon from '../../../../../../files/vinted_icon.png';
import wallapop_icon from '../../../../../../files/wallapop_icon.png';
import discogs_icon from '../../../../../../files/discogs_icon.png';
import {createListingVinted, createListingWallapop, 
    createListingDiscogs, createListingOther } from "../../../../../../services/listingService"


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
            } else if (platform === "Other"){
                await createListingOther(releaseId, providerId, link, sellingPrice);
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

        if (platform === 'Vinted' || platform === 'Wallapop' || platform === 'Other') {
            const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
            if (!link || !urlRegex.test(link)) return false;
        }
        
        return true;
    };

    const minimalTextField = {
        variant: 'standard', 
        InputProps: {
            style: { color: 'black', fontFamily: 'InterRegular', fontSize: '1rem', },
        },
        InputLabelProps: {
            shrink: true,
            style: { color: 'rgba(0,0,0,0.5)', fontFamily: 'InterRegular',fontSize: '1rem', },
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
                        borderRadius: '0.5rem',
                        p: '1rem',
                        minWidth: '40vw'
                    }
                }}
            >

                <DialogTitle sx={{ p:'0.5rem'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Typography sx={{ fontFamily: "InterSemiBold", fontSize: '1.5rem' }}>
                            Add Listing
                        </Typography>
                        <IconButton
                            onClick={onClose}
                            sx={{ color: 'rgba(0,0,0,1)'  }}
                        >
                            <CloseIcon sx={{ fontSize: '1.5rem'}} />
                        </IconButton>
                    </Box>
                </DialogTitle>
                
                <DialogContent sx={{p: 0}}>
                    <Box sx={{ py: '1rem', px: '2rem',  gap: '1.5rem',display: 'flex', flexDirection: 'column' }}>
                        <Box >
                            <Typography
                                sx={{
                                    fontFamily: 'InterRegular',
                                    fontSize: '0.78125rem',
                                    color: 'rgba(0,0,0,0.5)',
                                    mb: '0.25rem'
                                }}
                            >
                                Platform *
                            </Typography>
        

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {platform === 'Vinted' ? (
                                    <Box
                                        component="img"
                                        src={vinted_icon}
                                        alt="vinted"
                                        sx={{
                                            height: '1.375rem',
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
                                            height: '1.375rem',
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
                                            height: '1.375rem',
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
                                            fontSize: '1rem',
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
                                    <MenuItem value="Other">Other</MenuItem>
                                </TextField>
                            </Box>
                    </Box>
                    {(platform === 'Vinted' || platform === 'Wallapop'|| platform === 'Other') && (
                        <TextField
                            label="Link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            {...minimalTextField}
                            required
                            sx={{width: '100%'}}
                        />
                    )}


                    <TextField
                        label="Selling Price"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                        {...minimalTextField}
                        required
                        sx={{ width: '50%'}}
                    />
                    </Box>


                    
                </DialogContent>
                <DialogActions >

                    {(platform === 'Vinted' || platform === 'Wallapop') && (
                        <Button
                            sx={{ color: 'black', fontFamily: 'InterSemiBold', p:'0.5rem' }}
                            onClick={() => {
                                if (platform === 'Vinted') {
                                    window.open("https://www.vinted.es/items/new", '_blank');
                                } else if (platform === 'Wallapop') {
                                    window.open("https://es.wallapop.com/app/catalog/upload", '_blank');
                                }
                            }}
                        >
                            Upload
                        </Button>
                    )}
                    <Button
                        type="submit"
                        sx={{ color: 'black', fontFamily: 'InterSemiBold', p:'0.5rem' }}
                        disabled={!isFormValid() || loadingListingsAdd}
                    >
                        {loadingListingsAdd ? <CircularProgress size={'1.25rem'} color="inherit" /> : "Save"}
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

    import React, { useState, useEffect } from 'react';
    import {
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Box,
    CircularProgress
    } from '@mui/material';
    import CloseIcon from '@mui/icons-material/Close';
    import { patchSellingPriceListing, patchLinkListing } from '../../../../../../services/listingService';

    const ListingEdit = ({ open, onClose, selectedListings, releaseId, providerId}) => {
    const singleListing = selectedListings.length === 1 ? selectedListings[0] : null;

    const [link, setLink] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (singleListing) {
        setLink(singleListing.link || '');
        setSellingPrice(singleListing.sellingPrice);
        } else if (selectedListings.length > 1) {
        setLink('');
        setSellingPrice('');
        }
    }, [selectedListings]);

    const minimalTextField = {
        variant: 'standard',
        InputProps: {
        style: { color: 'black', fontFamily: 'InterRegular', fontSize: 16 },
        },
        InputLabelProps: {
        shrink: true,
        style: { color: 'rgba(0,0,0,0.5)', fontFamily: 'InterRegular', fontSize: 16 },
        },
        sx: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '& fieldset': { borderColor: 'rgba(0,0,0,0.6)' },
            '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.5)' },
            '&.Mui-focused fieldset': { borderColor: 'rgba(0,0,0,0.85)' },
        },
        },
    };

    const isFormValid = () => {
        const priceRegex = /^\d+(\.\d+)?\s*$/;
        if (!sellingPrice || !priceRegex.test(sellingPrice)) return false;

        if (selectedListings.length === 1) {
        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
        if (!link || !urlRegex.test(link)) return false;
        }

        return true;
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            if (selectedListings.length === 1) {
            // Usamos singleListing.id y enviamos directamente sellingPrice
            await patchSellingPriceListing(
                releaseId,
                providerId,
                singleListing.id,
                sellingPrice
            );

            if (singleListing.platform !== 'Discogs') {
                await patchLinkListing(
                releaseId,
                providerId,
                singleListing.id,
                link
                );
            }
            } else {
            // Actualizamos todos los listings seleccionados
            await Promise.all(
                selectedListings.map((l) =>
                patchSellingPriceListing(releaseId, providerId, l.id, sellingPrice)
                )
            );
            }

            onClose();
        } catch (error) {
            console.error("Error updating listing:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog
        key={open ? 'open' : 'closed'}
        open={open}
        onClose={onClose}
        PaperProps={{
            component: 'form',
            onSubmit: (e) => {
            e.preventDefault();
            if (isFormValid()) handleSave();
            },
            sx: { backgroundColor: 'white', color: 'black', borderRadius: 2, p: 2, minWidth:400 }
        }}
        >
        <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 24 }}>
                Edit Listing
            </Typography>
            <IconButton onClick={onClose} sx={{ color: 'rgba(0,0,0,1)' }}>
                <CloseIcon sx={{ fontSize: 24 }} />
            </IconButton>
            </Box>
        </DialogTitle>

        <DialogContent sx={{ my: 2 }}>
            {selectedListings.length === 1 && (
            <TextField
                label="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                {...minimalTextField}
                required
                fullWidth
                sx={{ mb: 3 }}
                disabled={singleListing?.platform === 'Discogs'}
            />
            )}

            <TextField
            label="Selling Price"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            {...minimalTextField}
            required
            sx={{ width: '25%' }}
            />
        </DialogContent>

        <DialogActions>
            <Button
            type="submit"
            sx={{ color: 'black', fontFamily: 'InterSemiBold', mx: 1 }}
            disabled={!isFormValid() || loading}
            >
            {loading ? <CircularProgress size={20} color="inherit" /> : "Save"}
            </Button>
        </DialogActions>

        {loading && (
            <Box
            sx={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
                backgroundColor: 'rgba(255,255,255,0.7)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                zIndex: 10, borderRadius: 2
            }}
            >
            <CircularProgress />
            </Box>
        )}
        </Dialog>
    );
    };

    export default ListingEdit;

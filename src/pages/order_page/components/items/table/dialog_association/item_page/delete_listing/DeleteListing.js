import {
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { useState, useEffect } from 'react';
import { deleteListing } from '../../../../../../../../services/listingService';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const DeleteListing = ({item, setChanged}) => {
    
    const [errorMessage, setErrorMessage] = useState('');
    const [openErrorPopup, setOpenErrorPopup] = useState(false);

    useEffect(() => {
        const deleteListingFront = async () => {
            try {
                await deleteListing(item.release.id, item.provider.id, item.listing.id)
                setChanged(true)
            } catch (error) {
                setErrorMessage(error.message);
                setOpenErrorPopup(true);
            } 
        };
        deleteListingFront();
    
    }, []);
    
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column',
                 p: '1rem',  textAlign: 'center', gap: '1rem', alignItems: 'center'}}>
                <Typography
                    sx={{
                        fontFamily: 'InterRegular',
                        fontSize: '0.8125rem',
                        color: 'rgba(0,0,0,0.6)',
                    }}
                >
                    Deleting Listing
                </Typography>
                <CircularProgress size={'1.5rem'} sx={{color: 'rgba(0,0,0,0.4)'}} />
            </Box>
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

export default DeleteListing;

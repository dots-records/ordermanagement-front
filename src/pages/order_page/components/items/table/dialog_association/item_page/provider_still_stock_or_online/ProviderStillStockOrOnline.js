import {
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { patchOrderItemAssociated } from '../../../../../../../../services/itemService';
import { patchProviderUnits } from '../../../../../../../../services/providerService';
import ListingAdd from './add_listing/ListingAdd';


const ProviderStillStockOrOnline = ({order, item, handleClose}) => {
    
    const [errorMessage, setErrorMessage] = useState('');
    const [openErrorPopup, setOpenErrorPopup] = useState(false);
    const [showNextComponent, setShowNextComponent] = useState(false);

    useEffect(() => {

        const handleAssociated = async () => {
            try {
                await patchOrderItemAssociated(order.id, item.id, true);
            } catch (error) {
                setErrorMessage(error.message);
                setOpenErrorPopup(true);
                throw error; 
            }
        };

        const handleUnits = async () => {
            try {
                await patchProviderUnits(
                    item.release.id,
                    item.provider.id,
                    item.provider.units - 1
                );
            } catch (error) {
                setErrorMessage("You have to update the units of the provider manually to (Units: " + (item.provider.units - 1) + 
                    ") and create the new listing: " + item.listing.platform + ", " + 
                    item.listing.sellingPrice + "Eur. Error: " + error.message);
                setOpenErrorPopup(true);
                throw error; 
            }
        };

        const handle = async () => {
            try {
                await handleAssociated();

                if (item.provider.type === 'In Stock') {
                    await handleUnits();
                }

                setShowNextComponent(true);
            } catch (e) {
                
            }
        };

        handle();

    }, []);

    if (showNextComponent) {
        return (
           <ListingAdd item={item} handleClose={handleClose} />
        );
    }
        
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
                    Marking item as associated & Updating the units of the provider (if type is 'In Stock')
                </Typography>
                <CircularProgress size={'1.5rem'} sx={{color: 'rgba(0,0,0,0.4)'}} />
            </Box>
            <Snackbar
                open={openErrorPopup}
                autoHideDuration={30000}
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

export default ProviderStillStockOrOnline;

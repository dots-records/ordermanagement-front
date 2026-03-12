import {
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { useState, useEffect } from 'react';
import { deleteProvider, getProviders } from '../../../../../../../../services/providerService';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { patchOrderItemAssociated } from '../../../../../../../../services/itemService';
import { getRelease, updateArchived } from '../../../../../../../../services/releaseService';


const DeleteProvider = ({item, order,  handleClose}) => {
    
    const [errorMessage, setErrorMessage] = useState('');
    const [openErrorPopup, setOpenErrorPopup] = useState(false);


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

        const handleDeleteProvider = async () => {
            try {
                await deleteProvider(item.release.id, item.provider.id)
            } catch (error) {
                setErrorMessage("Delete the assoaciated provider and archive the release " + item.release.name + 
                    " if it does not have more providers"
                    + ". Error: " +  error.message);
                setOpenErrorPopup(true);
                throw error; 
            }
        };

        const handleReleaseArchive = async () => {
            try {
                const providers = await getProviders(item.release.id)
                if(!providers || providers.length == 0) {
                    await updateArchived([item.release.id], true)
                }
            } catch (error) {
                setErrorMessage("Archive release " + item.release.name + ""
                    + ". Error: " +  error.message);
                setOpenErrorPopup(true);
                throw error; 
            }
        };
    
        const handle = async () => {
            try {
                await handleAssociated();
                await handleDeleteProvider();
                await handleReleaseArchive();
                handleClose()
            } catch (e) {
                    
            }
        };
    
        handle();
    
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
                    Marking item as associated, Deleting Provider & Archiving release if no more providers are available
                </Typography>
                <CircularProgress size={'1.5rem'} sx={{color: 'rgba(0,0,0,0.4)'}} />
            </Box>
            <Snackbar
                open={openErrorPopup}
                autoHideDuration={60000}
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

export default DeleteProvider;

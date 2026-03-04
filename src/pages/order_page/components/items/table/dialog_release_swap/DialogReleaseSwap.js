import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  Collapse,
  IconButton,
  TextField,
  Chip
} from '@mui/material';
import { CircularProgress } from '@mui/material';
import React, { useState } from 'react'; 
import CloseIcon from '@mui/icons-material/Close';
import { getRelease } from '../../../../../../services/releaseService';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { patchOrderItemRelease } from '../../../../../../services/itemService';



const DialogReleaseSwap = ({ open, handleClose, order, item }) => {
    const [releaseId, setReleaseId] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSave = async () => {
        try {
            setLoading(true);

            const release = await getRelease(releaseId)

            if (!release) {
                throw new Error("Problem obtaining the release");
            }
            if(release.archived){
                throw new Error("The release " + release.title + " is archived");
            }
            
            await patchOrderItemRelease(order.id, item.id, release.id, release.title, release.artists, release.thumb);

            handleClose();
            setReleaseId('');

        } catch (error) {
            setErrorMessage(error.message || "Error inesperado");
        } finally {
            setLoading(false);
        }
    };


    const isFormValid = () => {
        return /^\d+$/.test(releaseId);
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
                borderRadius: 0, 
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
    if(order == null) return

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
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
                        minWidth: '30vw'
                    }
                }}
            >
                <DialogTitle sx={{ p:'0.5rem'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: '1.5rem' }}>Associate Release</Typography>
                        <IconButton
                        onClick={
                            handleClose}
                        sx={{ color: 'rgba(0,0,0,0.7)' }}
                        >
                            <CloseIcon sx={{ fontSize: '1.5rem'}} />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent sx={{p: 0}}>
                    <Box sx={{ p: '1rem' }}>
                        <TextField
                            label="Release Id"
                            value={releaseId}
                            onChange={(e) => setReleaseId(e.target.value)}
                            {...minimalTextField}
                            required
                        />
                    </Box>
                </DialogContent>
                <DialogActions  >
                    <Button
                        type="submit"
                        sx={{ color: 'black', fontFamily: 'InterSemiBold', p:'0.5rem'}}
                        disabled={!isFormValid() || loading}
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : "Save"}
                    </Button>
                </DialogActions>

                {loading && (
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
            <Snackbar
                open={!!errorMessage}
                autoHideDuration={4000}
                onClose={() => setErrorMessage(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{
                        fontFamily: 'InterRegular',
                        fontSize: '0.8125rem',
                        borderRadius: '0.25rem'
                    }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default DialogReleaseSwap;

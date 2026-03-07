import {
  List,
  ListItem,
  Typography,
  Box,
  Chip,
  Button,
  Collapse
} from '@mui/material';
import { useState, useEffect } from 'react';
import TableProviders from './tables/TableProviders';
import SelectedListing from './components/SelectedListing'; 
import SelectedProvider from './components/SelectedProvider';
import ListingAdd from './components/ListingAdd';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { patchProviderUnits, deleteProvider, getProviders} from '../../../../../../../services/providerService';
import TableListingsForDeletion from './tables/TableListingsForDeletion';
import { updateArchived } from '../../../../../../../services/releaseService';



const ItemPage = ({ order, item, setClosable}) => {
    const [listingAssociated, setListingAssociated] = useState(null);
    const [providerAssociated, setProviderAssociated] = useState(null);
    const [itemAfterAssociation, setItemAfterAssociation] = useState(false);
    const [listingHandled, setListingHandled] = useState(false);
    const [listingsDeleted, setListingsDeleted] = useState(false);
    const [providerDeleted, setProviderDeleted] = useState(false);
    const [showNotificationAssociation, setShowNotificationAssociation] = useState(false);
    const [showNotificationListingAdded, setShowNotificationListingAdded] = useState(false);

    useEffect(() => {
        setListingAssociated(null);
        setProviderAssociated(null);
        setItemAfterAssociation(false);
        setShowNotificationAssociation(false);
        setShowNotificationListingAdded(false);
        setListingHandled(false);
        setProviderDeleted(false);
    }, [item]);

    useEffect(() => {
        if (itemAfterAssociation) {
            if(providerAssociated.type === 'In Stock') {
                const newUnits = providerAssociated.units - 1;
                setProviderAssociated(prev => ({
                    ...prev,
                    units: newUnits
                }));
                patchProviderUnits(item.release.id, providerAssociated.id
                , providerAssociated.units - 1
                )
            }
            setClosable(false);
            setShowNotificationAssociation(true);
        }
    }, [itemAfterAssociation]);

    useEffect(() => {
        if (listingHandled) {
            setClosable(true);
            setShowNotificationListingAdded(true);
        }
    }, [listingHandled]);

    const handleDeletion = async () => {
        await deleteProvider(item.release.id, providerAssociated.id);
        const providers = await getProviders(item.release.id);
        if (!providers || providers.length === 0) {
            updateArchived([item.release.id], true);
        }
        setProviderDeleted(true)
        setClosable(true);
    };

    if (!item) return <Typography>Cargando...</Typography>;

    return (
            <Box>
                
                <ListItem
                    sx={{
                        backgroundColor: 'white',
                        borderBottom: '1px solid #ddd',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex',  gap: '1rem',alignItems: 'center' }}>
                        <img 
                            src={item.release.thumb} 
                            style={{ width: '3rem', height: '3rem', objectFit: 'cover', borderRadius: '0.25rem'}}
                        />
                        <Box> 
                            <Typography sx={{ fontFamily: 'InterBold', fontSize: '0.875rem' , color: 'rgba(0,0,0,0.70)', textShadow:  '0px 0px 4px rgba(0,0,0,0.10)'}}>
                                {item.release.name}
                            </Typography>
                            <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: '0.75rem', color: 'rgba(0,0,0,0.5)'}}>
                                {item.release.artists.map(artist => artist.name).join(', ')}
                            </Typography>
                            <Typography sx={{ fontFamily: 'InterRegular', fontSize: '0.625rem', color: 'rgba(0,0,0,0.5)',}}>
                                                            {"Condition of Item: "}
                                                            {item.discCondition}
                                                            {" "}
                                                            {item.sleeveCondition}
                            </Typography>
                        </Box>
                        
                    </Box>
                </ListItem>
                {!itemAfterAssociation ? (
                    <>
                        <Collapse in={true}>
                            <Box sx={{ px: '1rem', backgroundColor:"rgba(0,0,0,0.02)" }}>
                                <TableProviders
                                    setListingAssociated={setListingAssociated}
                                    providerAssociated={providerAssociated}
                                    setProviderAssociated={setProviderAssociated}
                                    listingAssociated={listingAssociated}
                                    releaseId={item.release.id}
                                    order={order}
                                />
                            </Box>
                        </Collapse>
                        {listingAssociated != null &&  (

                            <Box
                                sx={{
                                    px: '1rem',
                                    py: '1rem',
                                    mt: '1rem',
                                    borderTop: '0.0625rem solid #ddd',
                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                }}
                            >
                                <SelectedListing 
                                    orderId={order.id}
                                    itemId={item.id}
                                    releaseId={item.release.id}
                                    provider={providerAssociated} 
                                    listing={{ ...listingAssociated }} 
                                    setItemAfterAssociation={setItemAfterAssociation}
                                />
                            </Box>
                        )}
                    </>
                ) : (
                    <>
                    {((providerAssociated.type === 'Online') ||
                            (providerAssociated.type === 'In Stock' && providerAssociated.units > 0)) ? (
                                <Box>
                                    {!listingHandled ? (
                                        <>
                                            <Box sx={{ borderBottom: '1px solid #ddd', py: '1rem',px: '1rem', textAlign: 'center'}}>
                                                <Box sx={{ fontFamily: "InterRegular", 
                                                            fontSize: "0.7rem",
                                                            color: 'rgba(0,0,0,0.5)',
                                                            backgroundColor: 'rgba(0,0,0,0.02)',
                                                            borderRadius: '0.125rem',
                                                            border: '1px solid rgba(0,0,0,0.15)',
                                                            marginLeft: "auto",
                                                            px: '0.5rem',
                                                            py: '0.5rem',
                                                        }}
                                                    >
                                                        Provider still has stock. Replace {listingAssociated.platform} Listing.
                                                    
                                                </Box>
                                            </Box>
                                            <Box sx={{ px: '1rem', backgroundColor:"rgba(0,0,0,0.02)" }}>
                                                <SelectedProvider provider={providerAssociated}/>
                                            </Box>
                                            

                                            
                                            <ListingAdd releaseId={item.release.id} providerId={providerAssociated.id}
                                            listing={listingAssociated} setListingHandled={setListingHandled}/>
                                        </>
                                    ) : (
                                        <Box sx={{ borderBottom: '1px solid #ddd', py: '1rem',px: '1rem', textAlign: 'center'}}>
                                                <Box sx={{ fontFamily: "InterRegular", 
                                                            fontSize: "0.7rem",
                                                            color: 'rgba(0,0,0,0.5)',
                                                            backgroundColor: 'rgba(0,0,0,0.02)',
                                                            borderRadius: '0.125rem',
                                                            border: '1px solid rgba(0,0,0,0.15)',
                                                            marginLeft: "auto",
                                                            px: '0.5rem',
                                                            py: '0.5rem',
                                                        }}
                                                    >
                                                        Listing Added
                                                    
                                                </Box>
                                            </Box>
                                    )}
                                </Box>
                            ) : (providerAssociated.type === 'In Stock' && providerAssociated.units === 0) ? (
                                    listingsDeleted == false ? (
                                        <Box>
                                            
                                            <Box sx={{ borderBottom: '1px solid #ddd', py: '1rem',px: '1rem', textAlign: 'center'}}>
                                                <Box sx={{ fontFamily: "InterRegular", 
                                                            fontSize: "0.7rem",
                                                            color: 'rgba(0,0,0,0.5)',
                                                            backgroundColor: 'rgba(0,0,0,0.02)',
                                                            borderRadius: '0.125rem',
                                                            border: '1px solid rgba(0,0,0,0.15)',
                                                            marginLeft: "auto",
                                                            px: '0.5rem',
                                                            py: '0.5rem',
                                                        }}
                                                    >
                                                        Provider is Out of Stock. Delete All Listings
                                                    
                                                </Box>
                                            </Box>
                                            <Box sx={{ px: '1rem', backgroundColor:"rgba(0,0,0,0.02)" }}>
                                                <SelectedProvider provider={providerAssociated}/>
                                            </Box>
                                            <Box sx={{ px: '1rem', backgroundColor:"rgba(0,0,0,0.02)" }}>
                                                <TableListingsForDeletion releaseId={item.release.id} 
                                                setListingsDeleted={setListingsDeleted}
                                                provider={providerAssociated}/>
                                            </Box>
                                    </Box>
                                ):(
                                    <> 
                                        <Box sx={{ borderBottom: '1px solid #ddd', py: '1rem',px: '1rem', textAlign: 'center'}}>
                                                <Box sx={{ fontFamily: "InterRegular", 
                                                            fontSize: "0.7rem",
                                                            color: 'rgba(0,0,0,0.5)',
                                                            backgroundColor: 'rgba(0,0,0,0.02)',
                                                            borderRadius: '0.125rem',
                                                            border: '1px solid rgba(0,0,0,0.15)',
                                                            marginLeft: "auto",
                                                            px: '0.5rem',
                                                            py: '0.5rem',
                                                        }}
                                                    >
                                                        Delete Provider and Archive Release (If there are no more providers left)
                                                    
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: "flex", justifyContent: "center", py: '1rem' }}>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={handleDeletion}
                                                    disabled={providerDeleted}
                                                    sx={{
                                                        fontFamily: 'InterRegular',
                                                        fontSize: '0.75rem',
                                                        px:'1rem',
                                                        py: '0.5rem',
                                                        backgroundColor: providerDeleted ? 'rgba(126, 202, 63,0.075)':'rgba(0,0,0,0.75)',
                                                        textTransform: 'none',
                                                        boxShadow: 'none',
                                                        '&:hover': {
                                                            backgroundColor: providerDeleted ? 'none' : 'rgba(0,0,0,0.9)',
                                                        }
                                                    }}
                                                >
                                                    {providerDeleted ? 'Handled' : 'Handle Provider and Release'}
                                                </Button>
                                            </Box>
                                        </>
                                )
                                
                            ) : null}
                        
                    </>
                )}
                
                <Snackbar
                    open={showNotificationAssociation}
                    autoHideDuration={3000}
                    onClose={() => setShowNotificationAssociation(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{
                            backgroundColor: "rgba(126, 202, 63,0.8)",
                            fontFamily: 'InterRegular',
                            fontSize: '0.8125rem',
                            borderRadius: '0.25rem'
                        }}
                    >
                        Listing y Provider associated correctly
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={showNotificationListingAdded}
                    autoHideDuration={3000}
                    onClose={() => setShowNotificationListingAdded(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{
                            backgroundColor: "rgba(126, 202, 63,0.8)",
                            fontFamily: 'InterRegular',
                            fontSize: '0.8125rem',
                            borderRadius: '0.25rem'
                        }}
                    >
                        Listing created correctly
                    </Alert>
                </Snackbar>

            </Box>
    );
    

}

export default ItemPage;

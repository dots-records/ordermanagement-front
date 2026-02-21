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
import TableListingsAfterAssociation from './tables/TableListingsAfterAssociation';
import ListingAdd from './components/ListingAdd';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { patchProviderUnits } from '../../../../../../../services/providerService';
import TableListingsForDeletion from './tables/TableListingsForDeletion';



const ItemPage = ({ order, item, setClosable}) => {
    const [listingAssociated, setListingAssociated] = useState(null);
    const [providerAssociated, setProviderAssociated] = useState(null);
    const [itemAfterAssociation, setItemAfterAssociation] = useState(false);
    const [listingHandled, setListingHandled] = useState(false);
    const [showNotificationAssociation, setShowNotificationAssociation] = useState(false);
    const [showNotificationListingAdded, setShowNotificationListingAdded] = useState(false);

    useEffect(() => {
        setListingAssociated(null);
        setProviderAssociated(null);
        setItemAfterAssociation(false);
        setShowNotificationAssociation(false);
        setShowNotificationListingAdded(false);
        setListingHandled(false);
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

    if (!item) return <Typography>Cargando...</Typography>;

    return (
            <Box>
                
                <ListItem
                    sx={{
                        borderLeft: '4px solid transparent',
                        backgroundColor: 'white',
                        borderBottom: '1px solid #ddd',
                        gap: 2,
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <img 
                            src={item.release.thumb} 
                            style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '3px'}}
                        />
                        <Box> 
                            <Typography sx={{ fontFamily: 'InterBold', fontSize: 14 , color: 'rgba(0,0,0,0.70)', textShadow:  '0px 0px 4px rgba(0,0,0,0.10)'}}>
                                {item.release.name}
                            </Typography>
                            <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 12, color: 'rgba(0,0,0,0.5)',}}>
                                {item.release.artists.map(artist => artist.name).join(', ')}
                            </Typography>
                            <Typography sx={{ fontFamily: 'InterRegular', fontSize: 10, color: 'rgba(0,0,0,0.5)',}}>
                                                            {"Condition of Item: "}
                                                            {item.discCondition}
                                                            {" "}
                                                            {item.sleeveCondition}
                                                        </Typography>
                        </Box>
                        
                    </Box>
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
                    
                    </Box>
                </ListItem>
                {!itemAfterAssociation ? (
                    <>
                        <Collapse in={true}>
                            <Box sx={{ px: 2, backgroundColor:"rgba(0,0,0,0.02)" }}>
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
                                    px: 6,
                                    py: 1,
                                    mt: 2,
                                    borderTop: '1px solid #ddd',
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
                    // Hay un problema porque aqui el provider no esta actualizado
                    <>
                    {((providerAssociated.type === 'Online') ||
                            (providerAssociated.type === 'In Stock' && providerAssociated.units > 0)) ? (
                                <Box>
                                    {!listingHandled ? (
                                        <>

                                            <Box sx={{ px: 2, backgroundColor:"rgba(0,0,0,0.02)" }}>
                                                <SelectedProvider provider={providerAssociated}/>
                                            </Box>
                                            <Box sx={{ borderBottom: '1px solid #ddd', py: 1}}>
                                                <Typography
                                                    sx={{
                                                        fontFamily: 'InterRegular',
                                                        fontSize: 11,
                                                        color: 'rgba(0,0,0,0.5)',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    Provider still has stock. Replace {listingAssociated.platform} Listing.
                                                </Typography>
                                            </Box>

                                            
                                            <ListingAdd releaseId={item.release.id} providerId={providerAssociated.id}
                                            listing={listingAssociated} setListingHandled={setListingHandled}/>
                                        </>
                                    ) : (
                                        <Box sx={{ px: 2, backgroundColor:"rgba(0,0,0,0.02)" }}>
                                            <SelectedProvider provider={providerAssociated}/>
                                            <TableListingsAfterAssociation releaseId={item.release.id} provider={providerAssociated}/>
                                        </Box>
                                    )}
                                </Box>
                            ) : (providerAssociated.type === 'In Stock' && providerAssociated.units === 0) ? (
                                <Box>
                                    <Box sx={{ px: 2, backgroundColor:"rgba(0,0,0,0.02)" }}>
                                        <SelectedProvider provider={providerAssociated}/>
                                    </Box>
                                    <Box sx={{ borderBottom: '1px solid #ddd', py: 1}}>
                                        <Typography
                                            sx={{
                                                fontFamily: 'InterRegular',
                                                fontSize: 11,
                                                color: 'rgba(0,0,0,0.5)',
                                                textAlign: 'center'
                                            }}
                                        >
                                            Provider is out of stock. Delete all listings.
                                        </Typography>
                                        
                                    </Box>
                                    <Box sx={{ px: 2, backgroundColor:"rgba(0,0,0,0.02)" }}>
                                        <TableListingsForDeletion releaseId={item.release.id} provider={providerAssociated}/>
                                    </Box>
                                </Box>
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
                            fontSize: 13,
                            borderRadius: 1
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
                            fontSize: 13,
                            borderRadius: 1
                        }}
                    >
                        Listing created correctly
                    </Alert>
                </Snackbar>

            </Box>
    );
    

}

export default ItemPage;

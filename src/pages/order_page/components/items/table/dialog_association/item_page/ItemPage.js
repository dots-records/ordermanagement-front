import {
  List,
  ListItem,
  Typography,
  Box,
  Chip,
  Button,
  Collapse, CircularProgress
} from '@mui/material';
import { useState, useEffect } from 'react';
import ProviderListingAssociation from './provider_listing_association/ProviderListingAssociation';
import { getItem } from '../../../../../../../services/itemService';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { getExistsListing, getListings } from '../../../../../../../services/listingService';
import DeleteListing from './delete_listing/DeleteListing';
import ProviderStillStockOrOnline from './provider_still_stock_or_online/ProviderStillStockOrOnline';
import TableListingsForDeletion from './table_listings_for_deletion/TableListingsForDeletion';
import { getExistsProvider } from '../../../../../../../services/providerService';
import DeleteProvider from './delete_provider/DeleteProvider';



const ItemPage = ({selectedItem, order, handleClose}) => {
    const [changed, setChanged] = useState(false);
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openErrorPopup, setOpenErrorPopup] = useState(false);
    const [listingExists, setListingExists] = useState(null);
    const [providerHasListings, setProviderHasListings] = useState(null);
    const [providerExists, setProviderExists] = useState(null);

    useEffect(() => {
        setLoading(true)
        const reloadItem = async () => {
            try {
                const data = await getItem(order.id, selectedItem.id);
                setItem(data);
                setChanged(false);
                if (data.listing && data.provider) {
                    const exists = 
                        await getExistsListing(data.release.id, data.provider.id, data.listing.id);
                    setListingExists(exists)
                    if(!exists) {
                        if (data.provider.type === 'In Stock' && data.provider.units == 1) {
                            const listings = await getListings(data.release.id, data.provider.id);
                            if(listings && listings.length > 0) {
                                setProviderHasListings(true)
                            } else {
                                setProviderHasListings(false)
                                const existsProvider = await getExistsProvider(data.release.id, data.provider.id)
                                setProviderExists(existsProvider)
                            }   
                        }
                    }
                }   
                setLoading(false);
            } catch (error) {
                setErrorMessage(error.message);
                setOpenErrorPopup(true);
            }  
        };
        reloadItem();

    }, [changed, order.id]);

    

    if (loading) return (
        <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: '1.5rem',
              }}
            >
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
    const needsAssociation = item.listing === null || item.provider === null;

    let content;

    if (needsAssociation) {
        content = (
            <ProviderListingAssociation
                item={item}
                order={order}
                setChanged={setChanged}
            />
        );
    } else {
        if (listingExists === true) {
            content = (
                <DeleteListing item={item} setChanged={setChanged} />
            );
        } else if (listingExists === false) {
            if(item.provider.type === 'Online' 
                || (item.provider.type === 'In Stock' && item.provider.units > 1)) {
                content = (
                    <ProviderStillStockOrOnline order={order} item={item} handleClose={handleClose}/>
                );   
            } else if (item.provider.type === 'In Stock' && item.provider.units == 1) {
                if(providerHasListings == true) {
                    content = (
                        <TableListingsForDeletion item={item} setChanged={setChanged} />
                    );
                } else if(providerHasListings == false){
                    if(providerExists == true) {
                     content =   <DeleteProvider item={item} order={order} handleClose={handleClose} />
                    } 
                }
                
            }
        }
    }
    return (
            <>
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
                    
                    {content}

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

export default ItemPage;

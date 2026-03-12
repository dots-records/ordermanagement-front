import {
  Box,
} from '@mui/material';
import TableProviders from './table_providers/TableProviders';
import { useState } from 'react';
import SelectedListing from './selected_listing/SelectedListing';


const ProviderListingAssociation = ({item, order, setChanged}) => {
    
    const [providerAssociated, setProviderAssociated] = useState(null);
    const [listingAssociated, setListingAssociated] = useState(null);
    
    return (
        <Box sx={{ px: '1rem', backgroundColor:"rgba(0,0,0,0.02)" }}>
            <TableProviders 
                item={item}
                order={order}
                providerAssociated={providerAssociated}
                setProviderAssociated={setProviderAssociated}
                listingAssociated={listingAssociated}
                setListingAssociated={setListingAssociated}
            />

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
                    <SelectedListing order={order} item={item} listing={listingAssociated}
                        provider={providerAssociated} setChanged={setChanged}/>
            
                </Box>
            )}
        </Box>
    );
    

}

export default ProviderListingAssociation;

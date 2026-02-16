import {
  List,
  ListItem,
  Typography,
  Box,
  Chip,
  Button,
  Collapse
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import TableProviders from './TableProviders';
import SelectedListing from './SelectedListing'; 



const ItemPage = ({ order, item }) => {
    const [listingAssociated, setListingAssociated] = useState(null);
    const [providerAssociated, setProviderAssociated] = useState(null);


    useEffect(() => {
        setListingAssociated(null);
        setProviderAssociated(null);
    }, [item]);

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
                        </Box>
                        
                    </Box>
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
                    
                    </Box>
                </ListItem>

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
                {listingAssociated != null && (
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
                            provider={providerAssociated} 
                            listing={{ ...listingAssociated }} 
                        />
                    </Box>
                )}
            </Box>
    );
    

}

export default ItemPage;

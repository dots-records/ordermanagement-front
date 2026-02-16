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
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { getProviders } from "../../../../../../services/providerService";
import TableListings from './TableListings';





const TableProviders = ({ releaseId, order, setListingAssociated, listingAssociated,
    providerAssociated, setProviderAssociated}) => {
    const [providers, setProviders] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const fetchProviders = async () => {
        setLoading(true);
        try {
        const response = await getProviders(releaseId);
        setProviders(response);
        } catch (err) {
        console.log(err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        if (!releaseId) return;
            fetchProviders();
    }, [releaseId]);
    

    const handleRowToggle = (provider) => {
        setProviderAssociated(prev =>
            prev?.id === provider.id ? null : provider
        );
    };

    if (loading) return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 3,
          }}
        >
          <CircularProgress size={24} sx={{ color: 'rgba(0,0,0,0.4)' }} />
        </Box>
      );

    if (!providers || providers.length === 0) {
          return (
            <Typography
              sx={{
                fontSize: 12,
                color: 'rgba(0,0,0,0.4)',
                px: 1,
                py: 1.4,
              }}
            >
              No Providers yet
            </Typography>
          );
        }
    return (
        <>
        <List>
            {providers.map((provider) => {
            const isOpen = providerAssociated?.id === provider.id;
            return (
                <Box key={provider.id}>
                <ListItem
                    onClick={() => handleRowToggle(provider)}
                    sx={{
                    borderBottom: '1px solid #ededed',
                    gap: 2,
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.03)' }
                    }}
                >
                    <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2,
                        fontFamily: 'InterSemiBold',
                        fontSize: 12.5,
                        color: 'rgba(0,0,0,0.8)',
                        backgroundColor:
                        provider.type === 'In Stock'
                            ? 'rgba(255, 207, 63, 0.12)'
                            : 'rgba(126, 202, 63, 0.12)',
                        border:
                        provider.type === 'In Stock'
                            ? '1px solid rgba(255, 207, 63, 0.45)'
                            : '1px solid rgba(126, 202, 63, 0.45)',
                        borderRadius: 8,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                        px: 1.4,
                        py: 0.6,
                    }}
                    >
                    <Box sx={{ lineHeight: 1 }}>
                        {provider.discCondition}
                    </Box>
                    <Box sx={{ lineHeight: 1, opacity: 0.75 }}>
                        {provider.sleeveCondition}
                    </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                        sx={{
                        fontFamily: 'InterSemiBold',
                        fontSize: 13,
                        color: 'rgba(0,0,0,0.85)',
                        mt: -0.2
                        }}
                    >
                        {provider.price} €
                    </Typography>
                    <Typography
                        sx={{
                        fontFamily: 'InterRegular',
                        fontSize: 10.5,
                        color: 'rgba(0,0,0,0.5)',
                        mt: -0.3
                        }}
                    >
                        {provider.type}
                        {provider.description && ` · ${provider.description}`}
                    </Typography>
                    </Box>
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
                    {provider.type === 'In Stock' ? (
                        <Chip
                        label={`${provider.units} units`}
                        sx={{
                            fontFamily: 'InterSemiBold',
                            fontSize: 12,
                            borderRadius: '6px',
                            bgcolor: 'rgba(25, 118, 210, 0.08)',
                            color: '#1976d2',
                            height: 22,
                        }}
                        />
                    ) : (
                        <Button
                        variant="outlined"
                        size="small"
                        endIcon={<OpenInNewIcon sx={{ fontSize: 15 }} />}
                        sx={{
                            fontFamily: 'InterSemiBold',
                            fontSize: 12,
                            textTransform: 'none',
                            borderRadius: '6px',
                            px: 1.5,
                            py: 0.3
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(provider.link, '_blank');
                        }}
                        >
                        Open
                        </Button>
                    )}
                    
                        

                    <ExpandMoreIcon
                        sx={{
                        fontSize: 21,
                        color: 'rgba(0,0,0,0.4)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: '0.2s'
                        }}
                    />
                    </Box>
                </ListItem>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <Box>
                        <TableListings releaseId={releaseId} 
                        provider={providerAssociated}
                        order={order}
                        listingAssociated={listingAssociated}
                        setListingAssociated={setListingAssociated}/>
                    </Box>
                        
                </Collapse>

                </Box>
            );
            })}
        </List>

       
        </>

    );
    };

export default TableProviders;

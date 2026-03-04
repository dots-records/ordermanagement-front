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
import { getProviders } from "../../../../../../../../services/providerService";
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
            py: '1.5rem',
          }}
        >
          <CircularProgress size={'1.5rem'} sx={{color: 'rgba(0,0,0,0.4)'}} />
        </Box>
      );

    if (!providers || providers.length === 0) {
          return (
            <Box sx={{width: '100%', justifyItems: 'center'}}>
                <Typography
                sx={{
                    fontSize: '0.75rem',
                    color: 'rgba(0,0,0,0.4)',
                    py: '0.5rem'

                }}
                >
                No Providers yet
                </Typography>
            </Box>
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
                    gap: '1rem',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.03)' }
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            fontFamily: 'InterSemiBold',
                            fontSize: '0.78125rem',
                            color: 'rgba(0,0,0,0.8)',
                            backgroundColor:
                            provider.type === 'In Stock'
                                ? 'rgba(255, 207, 63, 0.12)'
                                : 'rgba(126, 202, 63, 0.12)',
                            border:
                            provider.type === 'In Stock'
                                ? '0.0625rem solid rgba(255, 207, 63, 0.45)'
                                : '0.0625rem solid rgba(126, 202, 63, 0.45)',
                            borderRadius: '4rem',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                            px: '0.7rem',
                            py: '0.15rem',
                        }}
                    >
                    <Box >
                        {provider.discCondition}
                    </Box>
                    <Box sx={{ opacity: 0.75 }}>
                        {provider.sleeveCondition}
                    </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column',  overflow: 'hidden'}}>
                        <Typography
                            sx={{
                            fontFamily: 'InterSemiBold',
                            fontSize: '0.8125rem',
                            color: 'rgba(0,0,0,0.85)',
                            }}
                        >
                            {provider.price} €
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: 'InterRegular',
                                fontSize: '0.65625rem',
                                color: 'rgba(0,0,0,0.5)',
                                whiteSpace: 'normal',    
                                wordBreak: 'break-word',  
                                overflowWrap: 'anywhere',
                            
                            }}
                        >
                            {provider.type}
                            {provider.description && ` · ${provider.description}`}
                        </Typography>
                    </Box>
                    <Box sx={{ ml: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {provider.type === 'In Stock' ? (
                        <Chip
                            label={`${provider.units} units`}
                            sx={{
                                fontFamily: 'InterSemiBold',
                                fontSize: '0.75rem',
                                borderRadius: '0.375rem',
                                bgcolor: 'rgba(25, 118, 210, 0.08)',
                                color: '#1976d2',
                                height: '1.375rem',
                            }}
                        />
                    ) : (
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{
                                fontFamily: 'InterSemiBold',
                                fontSize: '0.75rem',
                                textTransform: 'none',
                                borderRadius: '0.375rem',
                                gap: '0.5rem',
                                height: '1.375rem',
                                color: '#1976d2',
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(provider.link, '_blank');
                            }}
                        >
                        Open
                        <OpenInNewIcon sx={{fontSize: '0.75rem',color: '#1976d2',}} />
                        </Button>
                    )}
                    
                        

                    <ExpandMoreIcon
                        sx={{
                        fontSize: '1.3125rem',
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

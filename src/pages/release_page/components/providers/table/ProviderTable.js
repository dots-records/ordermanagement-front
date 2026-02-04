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
import ProviderEdit from './ProviderEdit';
import ListingAdd from './listings/ListingAdd';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import ListingTable from './listings/ListingTable';



const ProviderTable = ({ providers, loading, setProviders, setLoading, releaseId }) => {
    const [openedProvider, setOpenedProvider] = useState(null);
    const [providerForEditing, setProviderForEditing] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAddListing, setOpenAddListing] = useState(false);
    const [listingsRefreshKey, setListingsRefreshKey] = useState(0);

    useEffect(() => {
        if (providers.length && !openedProvider) {
            setOpenedProvider(providers[0]);
        }
    }, [providers]);

    const handleEditOpen = (provider) => {
        setProviderForEditing({ ...provider });
        setOpenEdit(true);
    };
    const handleRowToggle = (provider) => {
        setOpenedProvider(prev =>
            prev?.id === provider.id ? null : provider
        );
    };

    const handleAddListingClose = () => {
        setOpenAddListing(false);
        setListingsRefreshKey(prev => prev + 1);
    };

    if (loading) return <Typography>Cargando...</Typography>;

    return (
        <>
        <List>
            {providers.map((provider) => {
            const isOpen = openedProvider?.id === provider.id;
            return (
                <Box key={provider.id}>
                <ListItem
                    onClick={() => handleRowToggle(provider)}
                    sx={{
                    borderBottom: '1px solid #ddd',
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
                        fontSize: 13.5,
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
                        fontSize: 14,
                        color: 'rgba(0,0,0,0.85)',
                        mt: -0.2
                        }}
                    >
                        {provider.price} €
                    </Typography>
                    <Typography
                        sx={{
                        fontFamily: 'InterRegular',
                        fontSize: 11.5,
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
                            fontSize: 13,
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
                        endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
                        sx={{
                            fontFamily: 'InterSemiBold',
                            fontSize: 13,
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
                    
                        <IconButton
                            size="small"
                            sx={{
                                color: 'rgba(0,0,0,0.4)',
                                '&:hover': {
                                color: 'rgba(0,0,0,0.85)',
                                backgroundColor: 'rgba(0,0,0,0.04)',
                                },
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEditOpen(provider);
                            }}
                            >
                            <EditIcon sx={{ fontSize: 18 }} />
                        </IconButton>

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
                    {isOpen && openedProvider && (
                        <>
                            <ListingTable
                                key={`${openedProvider.id}-${listingsRefreshKey}`}
                                releaseId={releaseId}
                                provider={openedProvider}
                            />

                            <Box
                                onClick={(e) => {
                                    setOpenAddListing(true);
                                }}
                                sx={{
                                    px: 0.4,
                                    py: 0.8,
                                    fontSize: 12.5,
                                    color: 'rgba(0,0,0,0.6)',
                                    backgroundColor: 'rgba(0,0,0,0.015)',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.04)',
                                    color: 'rgba(0,0,0,0.85)',
                                    },
                                }}
                            >
                                +
                            </Box>
                        </>


                    )}
                </Collapse>

                </Box>
            );
            })}
        </List>

        <ProviderEdit
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            setLoading={setLoading}
            setProviders={setProviders}
            releaseId={releaseId}
            provider={providerForEditing}
        />

        
        <ListingAdd
            open={openAddListing}
            onClose={handleAddListingClose}
            providerId={openedProvider?.id}
            releaseId={releaseId}
        />
        </>

    );
    };

export default ProviderTable;

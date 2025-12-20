import { useState } from 'react';
import { List, ListItem, Typography, Box, Chip, Button} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ProviderEdit from './ProviderEdit';

const ProviderTable = ({providers, loading, setProviders, setLoading, releaseId }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);

    const handleRowClick = (provider) => {
        setSelectedProvider({ ...provider }); 
        setOpenEdit(true);
    };


    if (loading) return <Typography>Cargando...</Typography>;

    return (
        <>
            <List>
                {providers.map((provider, index) => (
                    <ListItem
                        key={index}
                        onClick={() => handleRowClick(provider)}
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
                                fontFamily: 'InterSemiBold',
                                fontSize: 13.5,
                                color: 'rgba(0,0,0,0.85)',
                                backgroundColor: provider.type === 'In Stock' 
                                    ? 'rgba(255, 207, 63, 0.15)' 
                                    : 'rgba(126, 202, 63, 0.15)',
                                border: provider.type === 'In Stock' 
                                    ? '1px solid rgba(255, 207, 63, 0.7)' 
                                    : '1px solid rgba(126, 202, 63, 0.7)',
                                textShadow:'0px 0px 4px rgba(0,0,0,0.10)',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                borderRadius: 1.2,
                                textAlign: 'center',
                                px: 1.2,
                                py: 0.5,
                            }}
                        >
                            {provider.condition}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: 13.5, color: 'rgba(0,0,0,0.85)', mt: -0.2 }}>
                                {provider.price} €
                            </Typography>
                            <Typography sx={{ fontFamily: 'InterRegular', fontSize: '11px', color: "rgba(0,0,0,0.5)", mt: -0.3 }}>
                                {provider.type} {provider.description && ` · ${provider.description}`}
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
                                    endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
                                    sx={{ fontFamily: 'InterSemiBold', fontSize: 12, textTransform: 'none', borderRadius: '6px', px: 1.5, py: 0.3 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(provider.link, '_blank');
                                    }}
                                >
                                    Open
                                </Button>
                            )}
                        </Box>
                    </ListItem>
                ))}
            </List>
            <ProviderEdit openEdit={openEdit} setOpenEdit={setOpenEdit} setLoading={setLoading}
            setProviders={setProviders} releaseId={releaseId} provider={selectedProvider}/>
        </>
    );
};

export default ProviderTable;

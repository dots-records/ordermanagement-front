import React from 'react';
import { List, ListItem, Typography, Box } from '@mui/material';

const ProviderTable = ({ providers, loading }) => {
    if (loading) {
        return <Typography>Cargando...</Typography>;
    }

    return (
        <List>
            {providers.map((provider, index) => (
                <ListItem
                    key={index}
                    sx={{ 
                        borderBottom: '1px solid #ddd',
                        cursor: provider.type === 'Online' ? 'pointer' : 'default',
                        '&:hover': provider.type === 'Online' ? { backgroundColor: '#f5f5f5' } : {},
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr', // Dos columnas: tipo y datos
                        alignItems: 'center',
                        gap: 2 // Espacio entre columnas
                    }}
                    onClick={() => {
                        if (provider.type === 'Online' && provider.link) {
                            window.open(provider.link, '_blank');
                        }
                    }}
                >
                    {/* Primera columna: Caja con color dinámico */}
                    <Box
                        className="number-box"
                        sx={{
                            fontFamily: 'InterSemiBold',
                            fontSize: 13.5,
                            color: 'rgba(0,0,0,0.8)',
                            backgroundColor: provider.type === 'Stock' ? 'rgba(253, 214, 103, 0.2)' : 'rgba(145, 190, 89, 0.2)',
                            border: provider.type === 'Stock' ? '1px solid rgba(253, 214, 103, 0.8)' : '1px solid rgba(145, 190, 89, 0.8)',
                            borderRadius: 1.2,
                            textAlign: 'center',
                            p: 0.7,
                        }}
                    >
                        {provider.type}
                    </Box>

                    {/* Segunda columna: Precio y demás datos */}
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '12px',
                                color: "rgba(0,0,0,1)"
                            }}
                        >
                            Price: {provider.price}
                        </Typography>
                        <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: 12 }}>
                            {provider.type === 'Stock' ? `Units: ${provider.units}` : `Link: ${provider.link}`}
                        </Typography>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
};

export default ProviderTable;

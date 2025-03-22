import React, { useState } from 'react';
import { List, ListItem, ListItemText, Typography} from '@mui/material';

const ProviderTable = ({ providers, loading }) => {
    if (loading) {
        return <Typography>Cargando...</Typography>;
    }
    return (
        <List sx={{ border: '1px solid black' }}>
                {providers.map((provider, index) => (
                    <ListItem
                        key={index}
                        sx={{ borderBottom: '1px solid #ddd', cursor: 'pointer' }}
                        onClick={() => window.open(provider.url, '_blank')}
                    >
                        <ListItemText
                            primary={`ID: ${provider.releaseId} - Tipo: ${provider.type}`}
                            secondary={provider.url}
                        />
                    </ListItem>
                ))}
            </List>
    );
};

export default ProviderTable;

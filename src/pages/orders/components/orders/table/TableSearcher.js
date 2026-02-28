import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Icono de búsqueda
import { getSelectedTableOrders } from '../../../functions/Functions';

const TableSearcher = ({ setOrdersPage, setLoading, tableSelected, setSearchTerm }) => {
    const [localSearchTerm, setLocalSearchTerm] = useState();

    const handleSearch = async () => {
        if (!localSearchTerm) return; 
        setLoading(true);
        setSearchTerm(localSearchTerm);
        const backup = localSearchTerm;
        setLocalSearchTerm('');
        const response = await getSelectedTableOrders(tableSelected, 0, backup);
        console.log(response);
        setOrdersPage(response);
        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); 
        }
    };

    return (
        <Box
            sx={{
                textDecoration: 'none',
                fontFamily: 'InterRegular',
                fontSize: '0.75rem',
                color: 'rgba(0,0,0,0.6)', 
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.03)', 
                    color: 'rgba(0, 0, 0, 1)',
                    borderColor: 'rgba(0, 0, 0, 0.25)', 
                    '& .MuiSvgIcon-root': {
                        color: 'rgba(0, 0, 0, 1)', 
                    },
                },
            }}
        >
            <input
                type="text"
                placeholder="Search orders..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown} // Manejar la tecla presionada
                style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.75rem',
                    borderRadius: '0.25rem',
                    border: '0.08rem solid rgba(0, 0, 0, 0.3)',
                    width: '100%',
                }}
            />
            
        </Box>
    );
};

export default TableSearcher;

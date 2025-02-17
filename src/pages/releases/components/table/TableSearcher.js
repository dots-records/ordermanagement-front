import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { getSelectedTableReleases } from '../../functions/Functions';

const TableSearcher = ({ setReleasesPage, setLoading, tableSelected,  setSearchTerm }) => {
    const [localSearchTerm, setLocalSearchTerm] = useState();

    // Función para manejar la búsqueda
    const handleSearch = async () => {
        if (!localSearchTerm) return; // No hacer nada si el término de búsqueda está vacío
        setLoading(true);
        setSearchTerm(localSearchTerm);
        const backup = localSearchTerm;
        setLocalSearchTerm('');
        const response = await getSelectedTableReleases(tableSelected, 0, backup);
        console.log(response);
        setReleasesPage(response);
        setLoading(false);
    };

    // Función para manejar el evento de tecla presionada
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // Ejecutar la búsqueda al presionar Enter
        }
    };

    return (
        <Box
            sx={{
                textDecoration: 'none',
                position: 'absolute', // Posición absoluta
                top: 24, // Ajusta la distancia desde el borde superior
                right: 17, // Ajusta la distancia desde el borde derecho
                fontFamily: 'InterRegular',
                fontSize: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.03)', // Color de fondo normal
                borderColor: 'rgba(0, 0, 0, 0.2)', // Color del borde normal
                color: 'rgba(0,0,0,0.6)', // Color del texto normal
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.03)', // Color de fondo al hacer hover
                    color: 'rgba(0, 0, 0, 1)', // Color del texto al hacer hover
                    borderColor: 'rgba(0, 0, 0, 0.25)', // Color del borde al hacer hover
                    '& .MuiSvgIcon-root': {
                        // Estilo para el icono cuando se pasa el ratón sobre el botón
                        color: 'rgba(0, 0, 0, 1)', // Color del icono al hacer hover
                    },
                },
            }}
        >
            <input
                type="text"
                placeholder="Search releases..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown} // Manejar la tecla presionada
                style={{
                    padding: '8px 12px',
                    fontSize: '14px',
                    borderRadius: '4px',
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    width: 300,
                    height: 34.5,
                }}
            />
            
        </Box>
    );
};

export default TableSearcher;

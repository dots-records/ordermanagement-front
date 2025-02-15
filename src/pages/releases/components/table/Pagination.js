import { useState } from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getReleasesAndSearch } from '../../functions/Functions';

const Pagination = ({ releasePage, loading, setLoading, setReleasePage, searchTerm }) => {

    // Función para actualizar la página y obtener los pedidos
    const handlePageChange = async (newPage) => {
        setLoading(true);
        console.log(newPage);
        const response = await getReleasesAndSearch(newPage, searchTerm);
        setReleasePage(response);
        setLoading(false);
    };

    if (loading || releasePage == null) return null;

    // Calcular los valores para la paginación
    const currentPage = releasePage?.totalPages === 0 ? 0 : releasePage?.number + 1;
    const totalPages = releasePage?.totalPages || 0;

    return (
        <Box className="pagination" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', p: "3px" }}>
            <IconButton
                onClick={() => handlePageChange(releasePage?.number - 1)}
                disabled={releasePage?.number === 0 || releasePage?.totalPages === 0}
                aria-label="Anterior"
            >
                <ArrowBackIcon />
            </IconButton>

            <Typography
                sx={{
                    fontFamily: 'InterRegular',
                    fontSize: '15px',
                    color: 'rgba(0, 0, 0, 0.7)'
                }}
            >
                {`${currentPage} de ${totalPages}`}
            </Typography>

            <IconButton
                onClick={() => handlePageChange(releasePage?.number + 1)}
                disabled={releasePage?.number === releasePage?.totalPages - 1 || releasePage?.totalPages === 0}
                aria-label="Siguiente"
            >
                <ArrowForwardIcon />
            </IconButton>
        </Box>
    );
};

export default Pagination;

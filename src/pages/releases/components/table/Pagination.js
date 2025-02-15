import { useState } from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getReleasesAndSearch } from '../../functions/Functions';

const Pagination = ({ releasesPage, loading, setLoading, setReleasesPage, searchTerm }) => {

    // Función para actualizar la página y obtener los pedidos
    const handlePageChange = async (newPage) => {
        setLoading(true);
        console.log(newPage);
        const response = await getReleasesAndSearch(newPage, searchTerm);
        setReleasesPage(response);
        setLoading(false);
    };

    if (loading || releasesPage == null) return null;

    // Calcular los valores para la paginación
    const currentPage = releasesPage?.totalPages === 0 ? 0 : releasesPage?.number + 1;
    const totalPages = releasesPage?.totalPages || 0;

    return (
        <Box className="pagination" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', p: "3px" }}>
            <IconButton
                onClick={() => handlePageChange(releasesPage?.number - 1)}
                disabled={releasesPage?.number === 0 || releasesPage?.totalPages === 0}
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
                onClick={() => handlePageChange(releasesPage?.number + 1)}
                disabled={releasesPage?.number === releasesPage?.totalPages - 1 || releasesPage?.totalPages === 0}
                aria-label="Siguiente"
            >
                <ArrowForwardIcon />
            </IconButton>
        </Box>
    );
};

export default Pagination;

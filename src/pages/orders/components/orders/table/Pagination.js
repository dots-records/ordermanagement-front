import { useState } from 'react';
import { getSelectedTableOrders } from '../../../functions/Functions';
import { IconButton, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Pagination = ({ tableSelected, ordersPage, loading, setLoading, setOrdersPage, searchTerm }) => {

    // Función para actualizar la página y obtener los pedidos
    const handlePageChange = async (newPage) => {
        setLoading(true);
        console.log(newPage);
        const response = await getSelectedTableOrders(tableSelected, newPage, searchTerm);
        setOrdersPage(response);
        setLoading(false);
    };

    if (loading || ordersPage == null) return null;

    // Calcular los valores para la paginación
    const currentPage = ordersPage?.totalPages === 0 ? 0 : ordersPage?.number + 1;
    const totalPages = ordersPage?.totalPages || 0;

    return (
        <Box className="pagination" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', p: "3px" }}>
            <IconButton
                onClick={() => handlePageChange(ordersPage?.number - 1)}
                disabled={ordersPage?.number === 0 || ordersPage?.totalPages === 0}
                aria-label="Anterior"
            >
                <ArrowBackIcon sx={{ fontSize: 18 }}/>
            </IconButton>

            <Typography
                sx={{
                    fontFamily: 'InterRegular',
                    fontSize: 14,
                    color: 'rgba(0, 0, 0, 0.8)'
                }}
            >
                {`${currentPage} de ${totalPages}`}
            </Typography>

            <IconButton
                onClick={() => handlePageChange(ordersPage?.number + 1)}
                disabled={ordersPage?.number === ordersPage?.totalPages - 1 || ordersPage?.totalPages === 0}
                aria-label="Siguiente"
            >
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </IconButton>
        </Box>
    );
};

export default Pagination;

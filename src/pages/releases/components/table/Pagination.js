import { useState } from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getSelectedTableReleases } from '../../functions/Functions';

const Pagination = ({tableSelected, releasesPage, loading, setLoading, setReleasesPage, searchTerm }) => {

    const handlePageChange = async (newPage) => {
        setLoading(true);
        console.log(newPage);
        const response = await getSelectedTableReleases(tableSelected, newPage, searchTerm);
        setReleasesPage(response);
        setLoading(false);
    };

    if (loading || releasesPage == null) return null;
    const currentPage = releasesPage?.totalPages === 0 ? 0 : releasesPage?.number + 1;
    const totalPages = releasesPage?.totalPages || 0;

    return (
        <Box className="pagination" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem'}}>
            <IconButton
                onClick={() => handlePageChange(releasesPage?.number - 1)}
                disabled={releasesPage?.number === 0 || releasesPage?.totalPages === 0}
                aria-label="Anterior"
            >
                <ArrowBackIcon sx={{ fontSize: '1.125rem' }}/>
            </IconButton>

            <Typography
                sx={{
                    fontFamily: 'InterRegular',
                    fontSize: '0.875rem',
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
                <ArrowForwardIcon sx={{ fontSize: '1.125rem' }}/>
            </IconButton>
        </Box>
    );
};

export default Pagination;

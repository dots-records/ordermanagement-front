import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, Archive } from '@mui/icons-material';

const TableReleaseSelection = ({ releasesSelected, setReleasesSelected }) => {
    const handleDeselectAll = () => {
        setReleasesSelected([]);
    };

    return (
        <Box sx={{ position: 'absolute', top: 24, right: 407 }}>
            <AnimatePresence>
                {releasesSelected.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                                border: '1px solid rgba(0, 0, 0, 0.2)',
                                borderRadius: '4px',
                                color: 'rgba(0,0,0,0.6)',
                                padding: '4px 8px',
                                gap: '4px', // Espaciado entre elementos
                            }}
                        >
                            <Typography
    onClick={handleDeselectAll}
    sx={{
        fontSize: '13px',
        fontFamily: 'InterSemiBold',
        color: 'rgba(0,0,0,0.6)',
        cursor: 'pointer',
        p: '0px 4px',
        '&:hover': {
            color: 'rgba(0,0,0,1)', // Cambio a negro puro en hover
        },
    }}
>
    {releasesSelected.length} selected
</Typography>


                            {/* Línea divisoria */}
                            <Box sx={{ width: '1px', height: '24.5px', backgroundColor: 'rgba(0, 0, 0, 0.2)', mx: '4px' }} />

                            <Delete sx={{ fontSize: 20, color: 'rgba(0,0,0,0.6)' }} />

                            {/* Línea divisoria */}
                            <Box sx={{ width: '1px', height: '24.5px', backgroundColor: 'rgba(0, 0, 0, 0.2)', mx: '4px' }} />

                            <Archive sx={{ fontSize: 20, color: 'rgba(0,0,0,0.6)' }} />
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default TableReleaseSelection;

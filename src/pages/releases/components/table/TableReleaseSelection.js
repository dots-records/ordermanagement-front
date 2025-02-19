import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, Archive, Unarchive } from '@mui/icons-material';
import { getSelectedTableReleases } from '../../functions/Functions';
import { deleteReleases, archiveReleases, unarchiveReleases } from '../../../../services/releaseService';

const TableReleaseSelection = ({ releasesSelected, setReleasesSelected, tableSelected, setReleasesPage, setLoading }) => {
    const handleDeselectAll = () => {
        setReleasesSelected([]);
    };

    const handleDelete = async() => {
        setLoading(true);
        setReleasesSelected([]);
        await deleteReleases(releasesSelected);
        const response = await getSelectedTableReleases(tableSelected, 0, "");
        setReleasesPage(response);
        setLoading(false);
    };

    const handleArchive = async() => {
        setLoading(true);
        setReleasesSelected([]);
        await archiveReleases(releasesSelected);
        const response = await getSelectedTableReleases(tableSelected, 0, "");
        setReleasesPage(response);
        setLoading(false);
    };

    const handleUnarchive = async() => {
        setLoading(true);
        setReleasesSelected([]);
        await unarchiveReleases(releasesSelected);
        const response = await getSelectedTableReleases(tableSelected, 0, "");
        setReleasesPage(response);
        setLoading(false);
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
                                gap: '4px',
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
                                        color: 'rgba(0,0,0,1)',
                                    },
                                }}
                            >
                                {releasesSelected.length} selected
                            </Typography>

                            <Box sx={{ width: '1px', height: '24.5px', backgroundColor: 'rgba(0, 0, 0, 0.2)', mx: '4px' }} />
                            <Delete onClick={handleDelete} sx={{ fontSize: 20, color: 'rgba(0,0,0,0.6)', '&:hover': {
                                        color: 'rgba(0,0,0,1)',
                                    }, cursor: 'pointer' }} />
                            {tableSelected !== "All Releases" && (
                                <>
                                    <Box sx={{ width: '1px', height: '24.5px', backgroundColor: 'rgba(0, 0, 0, 0.2)', mx: '4px' }} />
                                    {tableSelected === "Active Releases" ? (
                                        <Archive onClick={handleArchive} sx={{ fontSize: 20, color: 'rgba(0,0,0,0.6)', '&:hover': {
                                            color: 'rgba(0,0,0,1)',
                                        }, cursor: 'pointer' }} />
                                    ) : (
                                        <Unarchive onClick={handleUnarchive} sx={{ fontSize: 20, color: 'rgba(0,0,0,0.6)', '&:hover': {
                                            color: 'rgba(0,0,0,1)',
                                        }, cursor: 'pointer' }} />
                                    )}
                                </>
                            )}
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default TableReleaseSelection;

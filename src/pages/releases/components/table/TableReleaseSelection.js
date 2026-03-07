import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, Archive, Unarchive } from '@mui/icons-material';
import { getSelectedTableReleases } from '../../functions/Functions';
import { deleteReleases, updateArchived, getReleasesCount  } from '../../../../services/releaseService';

const TableReleaseSelection = ({ releasesSelected, setReleasesSelected, tableSelected, setReleasesPage, setLoading, setCount}) => {
    const handleDeselectAll = () => {
        setReleasesSelected([]);
    };

    const handleDelete = async() => {
        setLoading(true);
        setReleasesSelected([]);
        await deleteReleases(releasesSelected);
        const response = await getSelectedTableReleases(tableSelected, 0, "");
        setReleasesPage(response);
        setCount(null);
        setLoading(false);

        let archivedParam = null;
        if (tableSelected === 'Active Releases') archivedParam = false;
        else if (tableSelected === 'Inactive Releases') archivedParam = true;
        else archivedParam = null;

        const count = await getReleasesCount(archivedParam);
        setCount(count);
    };

    const handleArchive = async() => {
        setLoading(true);
        await updateArchived(releasesSelected, true);
        setReleasesSelected([]);
        const response = await getSelectedTableReleases(tableSelected, 0, "");
        setReleasesPage(response);
        setCount(null);
        setLoading(false);

        let archivedParam = null;
        if (tableSelected === 'Active Releases') archivedParam = false;
        else if (tableSelected === 'Inactive Releases') archivedParam = true;
        else archivedParam = null;

        const count = await getReleasesCount(archivedParam);
        setCount(count);
    };

    const handleUnarchive = async() => {
        setLoading(true);
        await updateArchived(releasesSelected, false);
        setReleasesSelected([]);
        const response = await getSelectedTableReleases(tableSelected, 0, "");
        setReleasesPage(response);
        setCount(null);
        setLoading(false);

        let archivedParam = null;
        if (tableSelected === 'Active Releases') archivedParam = false;
        else if (tableSelected === 'Inactive Releases') archivedParam = true;
        else archivedParam = null;

        const count = await getReleasesCount(archivedParam);
        setCount(count);
    };

    return (
        <Box >
            <AnimatePresence >
                {releasesSelected.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        s
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                                border: '0.08rem solid rgba(0, 0, 0, 0.3)',
                                borderRadius: '0.25rem',
                                color: 'rgba(0,0,0,0.6)',
                                padding: '0.3rem 0.5rem',
                                gap: '0.25rem',
                            }}
                        >
                            <Typography
                                onClick={handleDeselectAll}
                                sx={{
                                    fontSize: '0.75rem',
                                    fontFamily: 'InterSemiBold',
                                    color: 'rgba(0,0,0,0.6)',
                                    cursor: 'pointer',
                                    p: '0 0.25rem',
                                    '&:hover': {
                                        color: 'rgba(0,0,0,1)',
                                    },
                                }}
                            >
                                {releasesSelected.length} selected
                            </Typography>

                            <Box sx={{ width: '0.0625rem', height: '1.5rem', backgroundColor: 'rgba(0, 0, 0, 0.2)', mx: '0.25rem' }} />
                            <Delete onClick={handleDelete} sx={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.6)', '&:hover': {
                                        color: 'rgba(0,0,0,1)',
                                    }, cursor: 'pointer' }} />
                            {tableSelected !== "All Releases" && (
                                <>
                                    <Box sx={{ width: '0.0625rem', height: '1.5rem', backgroundColor: 'rgba(0, 0, 0, 0.2)', mx: '0.25rem' }} />
                                    {tableSelected === "Active Releases" ? (
                                        <Archive onClick={handleArchive} sx={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.6)', '&:hover': {
                                            color: 'rgba(0,0,0,1)',
                                        }, cursor: 'pointer' }} />
                                    ) : (
                                        <Unarchive onClick={handleUnarchive} sx={{ fontSize: '1.25rem', color: 'rgba(0,0,0,0.6)', '&:hover': {
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

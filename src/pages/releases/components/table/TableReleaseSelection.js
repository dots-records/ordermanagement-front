import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, Archive, Unarchive } from '@mui/icons-material';
import { getSelectedTableReleases } from '../../functions/Functions';
import { Snackbar, Alert } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { deleteReleases, updateArchived, getReleasesCount  } from '../../../../services/releaseService';

const TableReleaseSelection = ({ releasesSelected, setReleasesSelected, tableSelected, setReleasesPage, setLoading, setCount}) => {
    
    const [errorMessage, setErrorMessage] = useState('');
    const [openErrorPopup, setOpenErrorPopup] = useState(false);
    const [loadingReleaseDelete, setLoadingReleaseDelete] = useState(false);
    const [loadingReleaseArchive, setLoadingReleaseArchive] = useState(false);
    const [loadingReleaseUnarchive, setLoadingReleaseUnarchive] = useState(false);

    const handleDeselectAll = () => {
        setReleasesSelected([]);
    };

    const handleDelete = async() => {
        try {
            setLoadingReleaseDelete(true)
            await deleteReleases(releasesSelected)
            setLoading(true);
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
        } catch (error) {
            setErrorMessage(error.message);
            setOpenErrorPopup(true);
        } finally{
            setLoadingReleaseDelete(false)
        }
    };

    const handleArchive = async() => {
        try {
            setLoadingReleaseArchive(true)
            await updateArchived(releasesSelected, true);
            setLoading(true);
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
        } catch (error) {
            setErrorMessage(error.message);
            setOpenErrorPopup(true);
        } finally{
            setLoadingReleaseArchive(false)
        }
    };

    const handleUnarchive = async() => {
        try {
            setLoadingReleaseUnarchive(true)
            await updateArchived(releasesSelected, false);
            setLoading(true);
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
        } catch (error) {
            setErrorMessage(error.message);
            setOpenErrorPopup(true);
        } finally{
            setLoadingReleaseUnarchive(false)
        }
    };

    return (
        <>
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
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            width: '1.25rem',
                                            height: '1.25rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {/* Icono delete */}
                                        <Delete
                                            onClick={!loadingReleaseDelete ? handleDelete : undefined}
                                            sx={{
                                                fontSize: '1.25rem',
                                                color: 'rgba(0,0,0,0.6)',
                                                cursor: loadingReleaseDelete ? 'default' : 'pointer',
                                                opacity: loadingReleaseDelete ? 0.3 : 1,
                                                '&:hover': {
                                                    color: loadingReleaseDelete
                                                        ? 'rgba(0,0,0,0.6)'
                                                        : 'rgba(0,0,0,1)',
                                                },
                                            }}
                                        />

                                        {/* Loader encima */}
                                        {loadingReleaseDelete && (
                                            <CircularProgress
                                                size={'1.25rem'}
                                                thickness={5}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                }}
                                            />
                                        )}
                                    </Box>
                                    {tableSelected !== "All Releases" && (
                                        <>
                                            <Box sx={{ width: '0.0625rem', height: '1.5rem', backgroundColor: 'rgba(0, 0, 0, 0.2)', mx: '0.25rem' }} />
                                            {tableSelected === "Active Releases" ? (
                                                <Box
                                                    sx={{
                                                        position: 'relative',
                                                        width: '1.25rem',
                                                        height: '1.25rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {/* Archive delete */}
                                                    <Archive
                                                        onClick={!loadingReleaseArchive ? handleArchive : undefined}
                                                        sx={{
                                                            fontSize: '1.25rem',
                                                            color: 'rgba(0,0,0,0.6)',
                                                            cursor: loadingReleaseArchive ? 'default' : 'pointer',
                                                            opacity: loadingReleaseArchive ? 0.3 : 1,
                                                            '&:hover': {
                                                                color: loadingReleaseArchive
                                                                    ? 'rgba(0,0,0,0.6)'
                                                                    : 'rgba(0,0,0,1)',
                                                            },
                                                        }}
                                                    />

                                                    {/* Loader encima */}
                                                    {loadingReleaseArchive && (
                                                        <CircularProgress
                                                            size={'1.25rem'}
                                                            thickness={5}
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                            }}
                                                        />
                                                    )}
                                                </Box>
                                                
                                            ) : (
                                                <Box
                                                    sx={{
                                                        position: 'relative',
                                                        width: '1.25rem',
                                                        height: '1.25rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {/* Archive delete */}
                                                    <Unarchive
                                                        onClick={!loadingReleaseUnarchive ? handleUnarchive : undefined}
                                                        sx={{
                                                            fontSize: '1.25rem',
                                                            color: 'rgba(0,0,0,0.6)',
                                                            cursor: loadingReleaseUnarchive ? 'default' : 'pointer',
                                                            opacity: loadingReleaseUnarchive ? 0.3 : 1,
                                                            '&:hover': {
                                                                color: loadingReleaseUnarchive
                                                                    ? 'rgba(0,0,0,0.6)'
                                                                    : 'rgba(0,0,0,1)',
                                                            },
                                                        }}
                                                    />

                                                    {/* Loader encima */}
                                                    {loadingReleaseUnarchive && (
                                                        <CircularProgress
                                                            size={'1.25rem'}
                                                            thickness={5}
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                            }}
                                                        />
                                                    )}
                                                </Box>
                                            )}
                                        </>
                                    )}
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
            <Snackbar
                open={openErrorPopup}
                autoHideDuration={4000}
                onClose={() => setOpenErrorPopup(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity="error"
                    onClose={() => setOpenErrorPopup(false)}
                    sx={{ width: '100%', fontFamily: 'InterRegular' }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default TableReleaseSelection;

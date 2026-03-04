import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Box, 
    CircularProgress, 
    Typography,
    Checkbox
} from '@mui/material';

const TableReleases = ({ loading, releases, releasesSelected, setReleasesSelected }) => {
    

    const handleSelect = (event, id) => {
        event.stopPropagation();
        setReleasesSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    if (loading) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    width: '100%',
                    height: '67vh',
                    justifyContent: 'center',
                    alignItems: 'center',  
                    color: 'black',
                }}
            >
                <CircularProgress size={'2.0625rem'} />
            </Box>
        );
    }
    
    return (
        <TableContainer
            sx={{ 
                height: '67vh',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '2px',
                },
            }}
        >
            <Table stickyHeader sx={{ height: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '1%' }}>Photo</TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)' }}>Title & Artists</TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)' }}>Description</TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '1%' }}>Select</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {releases?.length === 0 ? (
                        <TableRow sx={{ height: '100%' }}>
                            <TableCell colSpan={4} sx={{ p: 0}}>
                                <Box
                                    sx={{
                                        height: '100%',   
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        backgroundColor: 'rgba(0,0,0,0.015)',
                                    }}
                                >
                                <Typography sx={{ fontSize: '0.8rem', color: 'rgba(0, 0, 0, 0.45)', fontFamily: 'InterRegular' }}>
                                    No releases available
                                </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : (
                        releases?.map((release, index) => {
                            const isSelected = releasesSelected.includes(release.id);
                            return (
                                <TableRow
                                    key={release.id}
                                    component={Link}
                                    to={`/releases/${release.id}`}
                                    sx={{
                                        textDecoration: 'none',
                                        backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.05)' : (index % 2 === 0 ? 'white' : 'rgba(0, 0, 0, 0.02)'),
                                        '&:hover': {
                                            backgroundColor:'rgba(0, 0, 0, 0.05)',
                                        },
                                        transition: 'background-color 0.2s ease-in-out',
                                    }}
                                >
                                    <TableCell >
                                        <img 
                                            src={release.thumb} 
                                            alt={release.title} 
                                            style={{ width: '2.8125rem', height: '2.8125rem', objectFit: 'cover', borderRadius: '0.1875rem'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontFamily: 'InterBold', fontSize: '0.90625rem' , color: 'rgba(0,0,0,0.70)', textShadow:  '0px 0px 4px rgba(0,0,0,0.10)'}}>{release.title}</Typography>
                                        <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: '0.75rem', color: 'rgba(0,0,0,0.5)',
                                                 }}>
                                            {release.artists.map(artist => artist.name).join(', ')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontFamily: 'InterBold', fontSize: '0.90625rem', color: 'rgba(0,0,0,0.70)',  textShadow:  '0px 0px 4px rgba(0,0,0,0.10)' }}>{release.formats.map(format => format.name).join(', ')}</Typography>
                                        <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: '0.75rem', color: 'rgba(0,0,0,0.5)' }}>
                                            {release.formats.map(format => format.descriptions.join(', ')).join(' | ')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            checked={isSelected}
                                            onClick={(event) => event.stopPropagation()}
                                            onChange={(event) => handleSelect(event, release.id)}
                                            sx={{
                                                color: 'rgba(0,0,0,0.35)',
                                                '&.Mui-checked': {
                                                    color: 'rgba(0,0,0,0.6)',
                                                },
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableReleases;

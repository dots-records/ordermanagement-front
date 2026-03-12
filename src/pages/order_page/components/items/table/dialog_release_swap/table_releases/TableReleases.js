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
    Checkbox,
    IconButton
} from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { ArrowDropDown } from '@mui/icons-material';

const TableReleases = ({ loading, releases, setReleaseId, releaseId }) => {

    const handleSelect = (releaseId) => {
        setReleaseId(releaseId);
    };
    if (loading) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    width: '100%',
                    height: '40vh',
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
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '2px',
                },
            }}
        >
            <Table stickyHeader sx={{ height: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '1%',fontSize: '0.80rem', }}>Photo</TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)' ,fontSize: '0.80rem',}}>Title & Artists</TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '40%',fontSize: '0.80rem', }}>Description</TableCell>
                        <TableCell sx={{ fontFamily: 'InterSemiBold', color: 'rgba(0,0,0,0.65)', width: '1%',fontSize: '0.80rem', }}>Sel.</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {releases?.length === 0 ? (
                        <TableRow sx={{ height: '100%' }}>
                            <TableCell colSpan={4} sx={{ p: 0}}>
                                <Box
                                    sx={{
                                        height: '35vh',  
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
                            const isSelected = releaseId === release.id;
                            return (
                                <TableRow
                                    key={release.id}
                                    onClick={() => handleSelect(release.id)}
                                    sx={{
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        backgroundColor: isSelected
                                            ? 'rgba(0,0,0,0.08)'
                                            : index % 2 === 0
                                                ? 'white'
                                                : 'rgba(0,0,0,0.02)',
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
                                            style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover', borderRadius: '0.1875rem'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontFamily: 'InterBold', fontSize: '0.80rem' , color: 'rgba(0,0,0,0.70)', textShadow:  '0px 0px 4px rgba(0,0,0,0.10)'}}>{release.title}</Typography>
                                        <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: '0.65rem', color: 'rgba(0,0,0,0.5)',
                                                 }}>
                                            {release.artists.map(artist => artist.name).join(', ')}
                                            
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontFamily: 'InterBold', fontSize: '0.80rem', color: 'rgba(0,0,0,0.70)',  textShadow:  '0px 0px 4px rgba(0,0,0,0.10)' }}>
                                            {release.formats.map(format => format.name).join(', ')}
                                            {", "}
                                            { release.formats.map((format) => format.text).join(", ")}
                                        </Typography>
                                        <Typography sx={{ fontFamily: 'InterSemiBold', fontSize: '0.65rem', color: 'rgba(0,0,0,0.5)' }}>
                                            {release.formats.map(format => format.descriptions.join(', ')).join(' | ')}
                                        </Typography>
                                    </TableCell>
                                    <TableCell padding="checkbox">
                                        <IconButton
                                            onClick={() => {
                                                e.stopPropagation();
                                                handleSelect(release.id);
                                            }}
                                        >
                                            {isSelected ? (
                                                <RadioButtonCheckedIcon sx={{
                                                    fontSize: '1rem',
                                                    color: 'rgba(0,0,0,0.85)' ,
                                                    '&:hover': {
                                                        color: 'rgba(0,0,0,0.85)' ,
                                                    },
                                                    
                                                    }} 
                                                />
                                                ) : (
                                                <RadioButtonUncheckedIcon sx={{
                                                    fontSize: '1rem',
                                                    color:'rgba(0,0,0,0.45)' ,
                                                    '&:hover': {
                                                        color: 'rgba(0,0,0,0.85)' ,
                                                    },
                                                    
                                                    }} 
                                                />
                                            )}
                                        </IconButton>
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

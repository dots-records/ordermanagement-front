import React from 'react';
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
    Typography
} from '@mui/material';

const TableReleases = ({ loading, releases }) => {
    if (loading) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    width: 1176, 
                    mt: 2, 
                    height: 470,
                    justifyContent: 'center',
                    alignItems: 'center',  
                }}
            >
                <CircularProgress size={33} />
            </Box>
        );
    }
    
    return (
        <TableContainer
            sx={{ 
                width: 1176,
                mx: 'auto', 
                height: 470,
                mt: 2, 
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '2px',
                },
            }}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell 
                            sx={{ 
                                fontFamily: 'InterSemiBold', 
                                color: 'rgba(0,0,0,0.65)', 
                                width: '60px' 
                            }}
                        >
                            Photo
                        </TableCell>
                        <TableCell 
                            sx={{ 
                                fontFamily: 'InterSemiBold', 
                                color: 'rgba(0,0,0,0.65)', 
                                width: '10px' 
                            }}
                        >
                            Title & Artists
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {releases?.length === 0 ? (
                        <TableRow>
                            <TableCell 
                                colSpan={5} 
                                sx={{ 
                                    textAlign: 'center', 
                                    py: 2, 
                                    height: '200px' 
                                }}
                            >
                                <Box 
                                    sx={{ 
                                        border: '2px solid', 
                                        borderColor: 'rgba(0,0,0,0.1)',
                                        borderRadius: 1.5,
                                        height: '380px',  
                                        alignItems: 'center',  
                                        display: 'flex',  
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        backgroundColor: 'rgba(0,0,0,0.02)',
                                        mx: 'auto',
                                        maxWidth: '100%' 
                                    }}
                                >
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            color: 'rgba(0, 0, 0, 0.45)', 
                                            fontFamily: 'InterSemiBold' 
                                        }}
                                    >
                                        No releases available
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ) : (
                        releases?.map((release, index) => (
                            <TableRow
                                key={release.id}
                                component={Link}
                                to={`/releases/${release.id}`}
                                sx={{
                                    textDecoration: 'none',
                                    backgroundColor: index % 2 === 0 ? 'white' : 'rgba(0, 0, 0, 0.02)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                    },
                                }}
                            >
                                <TableCell sx={{ maxWidth: '10px' }}>
                                    <img 
                                        src={release.thumb} 
                                        alt={release.title} 
                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography 
                                        sx={{ 
                                            fontFamily: 'InterBold',
                                            fontSize: '16px',
                                            color: 'rgba(0,0,0,0.70)', 
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {release.title}
                                    </Typography>
                                    <Typography 
                                        sx={{ 
                                            fontFamily: 'InterSemiBold',
                                            fontSize: '12px',
                                            color: 'rgba(0,0,0,0.5)', 
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {release.artists.map(artist => artist.name).join(', ')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableReleases;

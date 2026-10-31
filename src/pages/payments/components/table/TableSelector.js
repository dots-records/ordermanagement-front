import React from 'react';
import {
    Typography,
    Box,
    Select,
    MenuItem,
    FormControl
} from '@mui/material';

const TableSelector = ({ month, setMonth, year, setYear }) => {
    const today = new Date();

    const selectStyles = {
        fontFamily: 'InterRegular',
        fontSize: '1rem',
        height: '2.25rem',
        minWidth: '8.125rem',
        borderRadius: '0.5rem',
        '& .MuiSelect-select': {
            padding: '0.5rem 2rem 0.5rem 0.75rem',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D0D0D0',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#888',
        },

        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D0D0D0',
            borderWidth: '0.0625rem',
        },
    };

    const menuStyles = {
        fontFamily: 'InterRegular',
        fontSize: '0.95rem',
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                textAlign: 'left',
            }}
        >
            <Typography
                sx={{
                    fontFamily: 'InterBold',
                    fontSize: '1.375rem',
                }}
            >
                Month
            </Typography>

            <FormControl size="small">
                <Select
                    id="month"
                    value={month}
                    onChange={(e) => {
                        setMonth(Number(e.target.value));
                    }}
                    sx={selectStyles}
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <MenuItem key={i + 1} value={i + 1} sx={menuStyles}>
                            {new Date(2000, i).toLocaleString('en-EN', {
                                month: 'long'
                            })}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Typography
                sx={{
                    fontFamily: 'InterBold',
                    fontSize: '1.375rem',
                }}
            >
                Year
            </Typography>

            <FormControl size="small">
                <Select
                    id="year"
                    value={year}
                    onChange={(e) => {
                        setYear(Number(e.target.value));
                    }}
                    
                    sx={{
                        ...selectStyles,
                        minWidth: '100px',
                    }}
                >
                    {Array.from(
                        { length: 7 },
                        (_, i) => today.getFullYear() - 5 + i
                    ).map(y => (
                        <MenuItem key={y} value={y} sx={menuStyles}>
                            {y}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default TableSelector;
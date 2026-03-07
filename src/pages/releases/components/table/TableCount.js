import React from 'react';
import { Typography, Box } from '@mui/material';

const TableCount = ({ count }) => {

    return (
        <Box
            sx={{
                borderRadius: '50%',
                width: '1.5rem',
                height: '1.5rem',
                backgroundColor: 'rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography
                sx={{
                    fontFamily: 'InterSemiBold',
                    fontSize: '0.625rem',
                    color: 'rgba(0,0,0,0.7)'
                }}
            >
                {count}
            </Typography>
        </Box>
    );
};

export default TableCount;
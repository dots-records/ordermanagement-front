import {Typography, Box, TableCell} from '@mui/material';


const EmptyContainer = () => {

    return (
        <TableCell colSpan={5} sx={{ textAlign: 'center', py: 2, height: '200px' }}>
                <Box sx={{ 
                  border: '2px solid', 
                  borderColor: 'rgba(0,0,0,0.1)',
                  borderRadius: 1.5,
                  height: '180px',  
                  alignItems: 'center',  
                  display: 'flex',  
                  justifyContent: 'center',
                  textAlign: 'center',
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  mx: 'auto', // Center box horizontally
                  maxWidth: '100%' // Ensure the box does not overflow
                }}>
                  <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.45)', fontFamily: 'InterSemiBold' }}>
                    No orders available
                  </Typography>
                </Box>
        </TableCell>
    );
}

export default EmptyContainer;

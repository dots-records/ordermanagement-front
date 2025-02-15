import {Typography, Box, TableCell} from '@mui/material';


const MessagesEmptyContainer = () => {

    return (
      <Box sx={{ 
        border: '2px solid', 
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 1.5,
        height: '100%',  
        width: '100%',
        alignItems: 'center',  
        display: 'flex',  
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0.02)',
        mx: 'auto', // Center box horizontally
      }}>
        <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.45)', fontFamily: 'InterSemiBold' }}>
          No messages available
        </Typography>
      </Box>
    );
}

export default MessagesEmptyContainer;

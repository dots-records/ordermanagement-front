import MoneyIcon from '@mui/icons-material/Money';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Box } from '@mui/material';

const ShippingBar = () => {
    

    return (
      <Box  sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
          <MoneyIcon sx={{  fontSize: '1.375rem' }}/>
          <Box sx={{
            width: '1.375rem', 
            height: '0.15625rem',
            mx: '-0.125rem',
            backgroundColor: 'rgba(0, 0, 0, 1)'
          }} 
          />
          <AccessTimeIcon sx={{  fontSize: '1.375rem' }}/>
          <Box sx={{
            width: '1.375rem', 
            height: '0.15625rem',
            mx: '-0.125rem',
            backgroundColor: 'rgba(0, 0, 0, 1)', 
          }} 
          />
          <LocalShippingIcon sx={{ ml: '0.07rem', fontSize: '1.375rem' }} />
      </Box>
    );
  }
  
  export default ShippingBar;
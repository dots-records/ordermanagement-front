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
          <MoneyIcon/>
          <Box sx={{
            width: 22, // Ancho de la línea
            height: '2.5px', // Grosor de la línea
            backgroundColor: 'rgba(0, 0, 0, 1)', // Color de la línea
            mx: -0.28
          }} 
          />
          <AccessTimeIcon/>
          <Box sx={{
            width: 22, // Ancho de la línea
            height: '2.5px', // Grosor de la línea
            backgroundColor: 'rgba(0, 0, 0, 1)', // Color de la línea
            mx: -0.28
          }} 
          />
          <LocalShippingIcon sx={{ marginLeft: 0.088 }} />
      </Box>
    );
  }
  
  export default ShippingBar;
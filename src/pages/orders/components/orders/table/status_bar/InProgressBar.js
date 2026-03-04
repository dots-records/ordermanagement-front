import MoneyIcon from '@mui/icons-material/Money';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { patchOrderStatus} from '../../../../../../services/orderService';
import { getSelectedTableOrders } from '../../../../functions/Functions';

const InProgressBar = ({ orderId, setOrdersPage, tableSelected, numberPage, searchTerm}) => {
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShippingClick = async () => {
    setLoading(true);
    try {
        console.log(orderId)
        await patchOrderStatus(orderId, 'Shipped');
        const response = await getSelectedTableOrders(tableSelected, numberPage,searchTerm);
        setOrdersPage(response);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.53)',
            zIndex: 1,
          }}
        >
          <CircularProgress size={'1.375rem'}/>
        </Box>
      )}

      <MoneyIcon
        sx={{
          fontSize: '1.375rem',
        }}
      />

      <Box
        sx={{
          width:'1.375rem',
          height: '0.15625rem',
          mx: '-0.125rem',
          backgroundColor: 'rgba(0, 0, 0, 1)',
        }}
      />

      <AccessTimeIcon sx={{ fontSize: '1.375rem'}} />

      <Box
        sx={{
          width: '1.375rem',
          height: '0.15625rem',
          mx: '-0.125rem',
          background: hover
            ? 'rgba(0,0,0,1)'
            : 'linear-gradient(to right, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.35) 50%)',
        }}
      />
      

      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleShippingClick}
        component={Link}
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <LocalShippingIcon
          className="shipping-icon"
          sx={{
            color: hover ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.35)',
            fontSize: '1.375rem',
            ml: '0.07rem'
          }}
          
        />
      </Box>
    </Box>
  );
};

export default InProgressBar;

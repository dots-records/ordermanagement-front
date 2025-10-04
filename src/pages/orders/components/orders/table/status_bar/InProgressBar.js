import MoneyIcon from '@mui/icons-material/Money';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { updateStatusShipping} from '../../../../../../services/orderService';
import { getSelectedTableOrders } from '../../../../functions/Functions';

const InProgressBar = ({ orderId, setOrdersPage, tableSelected, numberPage, searchTerm}) => {
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShippingClick = async () => {
    setLoading(true);
    try {
        await updateStatusShipping(orderId);
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
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1,
          }}
        >
          <CircularProgress size={26}/>
        </Box>
      )}

      <MoneyIcon />

      <Box
        sx={{
          width: 22,
          height: '2.5px',
          backgroundColor: 'rgba(0, 0, 0, 1)',
          mx: -0.28,
        }}
      />

      <AccessTimeIcon />

      <Box
        sx={{
          width: 22,
          height: '2.5px',
          background: hover
            ? 'rgba(0,0,0,1)'
            : 'linear-gradient(to right, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.35) 50%)',
          mx: -0.28,
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
            marginLeft: 0.088,
          }}
        />
      </Box>
    </Box>
  );
};

export default InProgressBar;

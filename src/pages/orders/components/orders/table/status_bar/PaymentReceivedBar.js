import MoneyIcon from '@mui/icons-material/Money';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Box, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { updateStatusInProgress, updateStatusShipping} from '../../../../../../services/orderService';
import { getSelectedTableOrders } from '../../../../functions/Functions';

const PaymentReceivedBar = ({  orderId, setOrdersPage, tableSelected, numberPage, searchTerm}) => {
    const [hoverShipping, setHoverShipping] = useState(false);
    const [hoverProgress, setHoverProgress] = useState(false);
    const [loading, setLoading] = useState(false); 

    const getProgressIconColor = (hoverProgress, hoverShipping) => {
        return hoverProgress || hoverShipping ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.35)';
    };

    const getLinePaymentProgressColor = (hoverProgress, hoverShipping) => {
        return hoverProgress || hoverShipping
        ? 'rgba(0, 0, 0, 1)'
        : 'linear-gradient(to right, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.35) 50%)';
    };

    const shippingClick = async () => {
        setLoading(true);
        try {
            await updateStatusShipping(orderId);
            const response = await getSelectedTableOrders(tableSelected, numberPage, searchTerm);
            setOrdersPage(response);
        } catch (error) {
        console.error('Error:', error);
        } finally {
        setLoading(false);
        }
        
    };

    const inProgressClick = async () => {
        setLoading(true);
        try {
            await updateStatusInProgress(orderId);
            const response = await getSelectedTableOrders(tableSelected, numberPage, searchTerm);
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
              <CircularProgress size={33} />
            </Box>
          )}
          <MoneyIcon />
          <Box
            sx={{
              width: 22,
              height: '2.5px',
              background: getLinePaymentProgressColor(hoverProgress, hoverShipping),
              mx: -0.28,
            }}
          />
          <Box
            onMouseEnter={() => setHoverProgress(true)}
            onMouseLeave={() => setHoverProgress(false)}
            onClick={inProgressClick}
            component={Link}
            sx={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <AccessTimeIcon
              sx={{ color: getProgressIconColor(hoverProgress, hoverShipping) }}
            />
    
          </Box>
          <Box
            sx={{
              width: 22,
              height: '2.5px',
              backgroundColor: hoverShipping ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.35)',
              mx: -0.28,
            }}
          />
          <Box
            onMouseEnter={() => setHoverShipping(true)}
            onMouseLeave={() => setHoverShipping(false)}
            onClick={shippingClick}
            component={Link}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LocalShippingIcon
              className="shipping-icon"
              sx={{
                color: hoverShipping ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.35)',
                marginLeft: 0.088,
              }}
            />
            
          </Box>
        </Box>
      );
    };

    export default PaymentReceivedBar;

import MoneyIcon from '@mui/icons-material/Money';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Box, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { patchOrderStatus } from '../../../../../../services/orderService';
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
            await patchOrderStatus(orderId, 'Shipped');
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
            await patchOrderStatus(orderId, 'In Progress');
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
                backgroundColor: 'rgba(255, 255, 255, 0.53)',
                zIndex: 1,
              }}
            >
              <CircularProgress size={'1.375rem'}/>
            </Box>
          )}
          <MoneyIcon sx={{ fontSize: '1.375rem'}} />
          <Box
            sx={{
              width: '1.375rem',
              height: '0.15625rem',
              mx: '-0.125rem',
              background: getLinePaymentProgressColor(hoverProgress, hoverShipping),
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
              sx={{ color: getProgressIconColor(hoverProgress, hoverShipping)
                ,fontSize: '1.375rem'
               }}
            />
          </Box>
          <Box
            sx={{
              width: '1.375rem',
              height: '0.15625rem',
              mx: '-0.125rem',
              backgroundColor: hoverShipping ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.35)',
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
                fontSize: '1.375rem',
                ml: '0.07rem'
              }}
            />
            
          </Box>
        </Box>
      );
    };

    export default PaymentReceivedBar;

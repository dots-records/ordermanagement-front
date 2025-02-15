import { useParams } from 'react-router-dom';
import {Box } from '@mui/material';
import {useState, useEffect} from 'react';
import OrderMessages from './components/messages/OrderMessages';
import { getOrder, resetNewMessages, updateMessages } from '../../services/orderService';
import DotsDrawer from '../../globalComponents/drawer/DotsDrawer';
import DotsAppBar from '../../globalComponents/app_bar/DotsAppBar';
import { appBarHeight } from '../../config/constants';

const Order = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState();
    const [loading, setLoading] = useState(true);
    const { newMessagesCustomer, newMessagesDiscogs, newMessagesSeller } = location.state || {};

    
    

    useEffect(() => {
                const fetchData = async () => {
                    try {
                        await updateMessages(orderId)
                        const data = await getOrder(orderId);
                        setOrder(data);
                        setLoading(false)
                        resetNewMessages(orderId)
                      } catch(err) {
                        console.log(err);
                      }
                };
                fetchData();
        }, []);

    return (
      <Box sx={{ display: 'flex' }}>
            <DotsAppBar />
            <DotsDrawer />
            {/* Caja que delimita con el drawer y el appbar y contiene el resto de la pantalla*/}
            <Box
                sx={{
                    p: 0,
                    mt: `${appBarHeight}px`,
                    boxShadow: 'none',
                }}
            >
                <OrderMessages order = {order} loading={loading} setOrder={setOrder} setLoading={setLoading} />
            </Box>
        </Box>
      
  );
}

export default Order;

import { useParams } from 'react-router-dom';
import {Box } from '@mui/material';
import {useState, useEffect} from 'react';
import OrderMessages from './components/messages/OrderMessages';
import { getOrder, resetNewMessages, updateMessages,patchOrderJustAdded } from '../../services/orderService';
import DotsDrawer from '../../globalComponents/drawer/DotsDrawer';
import DotsAppBar from '../../globalComponents/app_bar/DotsAppBar';
import { appBarHeight } from '../../config/constants';
import OrderInfo from './components/information/OrderInfo';
import OrderItems from './components/items/OrderItems';

const Order = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState();
    const [loading, setLoading] = useState(true);
    const { newMessagesCustomer, newMessagesDiscogs, newMessagesSeller } = location.state || {};

    
    const fetchData = async () => {
                    try {
                        setLoading(true)
                        await updateMessages(orderId)
                        const data = await getOrder(orderId);
                        
                        if (data.justAdded) {
                            await patchOrderJustAdded(orderId, false)
                        }    
                        setOrder(data);
                        setLoading(false)
                        resetNewMessages(orderId)
                      } catch(err) {
                        console.log(err);
                      }
                };

    useEffect(() => {
                
                fetchData();
        }, []);


        if (!loading && !order) {
        return (
            <>
                <DotsAppBar />
                <DotsDrawer />
                <Box
                    sx={{
                        p: 3,
                        mt: `${appBarHeight}px`,
                        display: 'flex',
                        height: '100vh',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'InterSemiBold',
                        fontSize: 14,
                        color: 'rgba(0,0,0,0.45)',
                    }}
                >
                    Order not available
                </Box>
            </>
        );
    }

    return (
      <Box sx={{ display: 'flex' }}>
            <DotsAppBar />
            <DotsDrawer />
            {/* Caja que delimita con el drawer y el appbar y contiene el resto de la pantalla*/}
            <Box
                sx={{
                    p: 3,
                    mt: `${appBarHeight}px`,
                    boxShadow: 'none',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 , alignItems: 'flex-start'}}>
                    <OrderInfo order={order} loading={loading} />
                    <OrderItems order={order} loading={loading} fetchOrder={fetchData} />
                    <OrderMessages order = {order} loading={loading} setOrder={setOrder} setLoading={setLoading} />
                </Box>
            </Box>
        </Box>
      
  );
}

export default Order;

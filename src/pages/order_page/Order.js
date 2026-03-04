import { useParams } from 'react-router-dom';
import {Box } from '@mui/material';
import {useState, useEffect} from 'react';
import { getOrder, patchOrderJustAdded } from '../../services/orderService';
import DotsDrawer from '../../globalComponents/drawer/DotsDrawer';
import DotsAppBar from '../../globalComponents/app_bar/DotsAppBar';
import OrderInfo from './components/information/OrderInfo';
import OrderItems from './components/items/OrderItems';
import OrderPayment from './components/payment/OrderPayment';
import DashboardLayout from "../../globalComponents/dashboard_layout/DashboardLayout";

const Order = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState();
    const [loading, setLoading] = useState(true);

    
    const fetchData = async () => {
                    try {
                        setLoading(true)
                        const data = await getOrder(orderId);
                        
                        if (data.justAdded) {
                            await patchOrderJustAdded(orderId, false)
                        }    
                        setOrder(data);
                        setLoading(false)
                        
                      } catch(err) {
                        console.log(err);
                      }
                };

        useEffect(() => {
                
                fetchData();
        }, []);


        if (!loading && !order) {
        return (
            <DashboardLayout>
                <Box
                    className="box-container"
                    sx={{
                        display: 'flex',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'InterSemiBold',
                        fontSize: '0.875rem',
                        color: 'rgba(0,0,0,0.5)',
                    }}
                >
                    Order not available
                </Box>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' , alignItems: 'flex-start'}}>
                <OrderInfo order={order} loading={loading} />
                <OrderItems order={order} loading={loading} fetchOrder={fetchData} />
                <OrderPayment order={order} loading={loading} fetchOrder={fetchData} />
            </Box>
        </DashboardLayout>
      
  );
}

export default Order;

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import DotsAppBar from "../../globalComponents/app_bar/DotsAppBar";
import DotsDrawer from "../../globalComponents/drawer/DotsDrawer";
import { appBarHeight } from '../../config/constants';
import { getSelectedTableOrders, getLastUpdateDiscogs } from './functions/Functions';
import BoxOrders from './components/orders/BoxOrders';

const Orders = () => {
    const [ordersPage, setOrdersPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formattedDate, setFormattedDate] = useState('');

    // Obtener datos al cargar la página
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await getSelectedTableOrders('Active Orders', 0, "");
            setOrdersPage(response);

            const response2 = await getLastUpdateDiscogs();
            if (response2) {
                const date = new Date(response2);
                const readable = date.toLocaleString(); // ejemplo: 02/09/2025 08:25:34
                setFormattedDate(readable);
            }

            setLoading(false);
        };
        fetchData();
    }, []);


    return (
        <Box sx={{ display: 'flex' }}>
            <DotsAppBar/>
            <DotsDrawer/>
            <Box
                sx={{
                    p: 3,
                    mt: `${appBarHeight}px`,
                    boxShadow: 'none',
                    position: 'relative'
                }}
            >
                

                <BoxOrders  
                    loading={loading}
                    setLoading={setLoading}
                    ordersPage={ordersPage}
                    setOrdersPage={setOrdersPage}
                    timeAgo={formattedDate }
                />
            </Box>
        </Box>
    );
};

export default Orders;

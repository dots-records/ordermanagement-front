import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import DotsAppBar from "../../globalComponents/app_bar/DotsAppBar";
import DotsDrawer from "../../globalComponents/drawer/DotsDrawer";
import { appBarHeight } from '../../config/constants';
import { getSelectedTableOrders } from './functions/Functions';
import BoxOrders from './components/orders/BoxOrders';

const Orders = () => {
    const [loading, setLoading] = useState(true);
    const [ordersPage, setOrdersPage] = useState(null);
    

    useEffect(() => {
            const fetchData = async () => {
                setLoading(true)
                const response = await getSelectedTableOrders('Active Orders', 0, "")
                setOrdersPage(response)
                setLoading(false)
            };
            fetchData();
    }, []);
    
    return (
        <Box sx={{ display: 'flex' }}>
            <DotsAppBar/>
            <DotsDrawer/>
            {/* Caja que delimita con el drawer y el appbar y contiene el resto de la pantalla*/}
            <Box
                sx={{
                    p: 3,
                    mt: `${appBarHeight}px`,
                    boxShadow: 'none',
                    position: 'relative' // Agrega position relative al contenedor principal
                }}
            >
                <BoxOrders  
                    loading={loading}
                    setLoading={setLoading}
                    ordersPage ={ordersPage}
                    setOrdersPage={setOrdersPage}
                />
                    
            </Box>
        </Box>

    );
}

export default Orders;
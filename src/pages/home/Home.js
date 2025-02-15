import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import DotsAppBar from "../../globalComponents/app_bar/DotsAppBar";
import DotsDrawer from "../../globalComponents/drawer/DotsDrawer";
import { getUnarchivedNewOrders } from '../../services/orderService';
import { getNotifications } from '../../services/notificationService';
import { appBarHeight } from '../../config/constants';
import BoxNewOrders from "./components/new_orders/BoxNewOrders";
import BoxNotificationCenter from './components/notification_center/BoxNotificationCenter';

const Home = () => {
    const [newOrders, setNewOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [loadingNotifications, setLoadingNotifications] = useState(true);
    const [notificationsPage, setNotificationsPage] = useState(null);
    

    useEffect(() => {
        const fetchDataOrders = async () => {
            try {
                setLoadingOrders(true);
                const orders = await getUnarchivedNewOrders();
                setNewOrders(orders);
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoadingOrders(false);
            }
        };
        const fetchDataNotifications = async () => {
            setLoadingNotifications(true)
            const response = await getNotifications(0)
            setNotificationsPage(response)
            setLoadingNotifications(false)
        };
        fetchDataOrders();
        fetchDataNotifications();
    }, []);
    
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
                <BoxNewOrders 
                setNewOrders = {setNewOrders} 
                newOrders={newOrders} 
                loading={loadingOrders} />
            </Box>
            <Box
                sx={{
                    p: 3,
                    mt: `${appBarHeight}px`,
                    boxShadow: 'none',
                }}
            >
                <BoxNotificationCenter loadingNotifications={loadingNotifications}
                    setLoadingNotifications={setLoadingNotifications}
                    notificationsPage ={notificationsPage}
                    setNotificationsPage={setNotificationsPage} />
            </Box>
        </Box>
    );
}

export default Home;

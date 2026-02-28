import { useState, useEffect } from 'react';
import DashboardLayout from "../../globalComponents/dashboard_layout/DashboardLayout";
import { getSelectedTableOrders, getLastUpdateDiscogs } from './functions/Functions';
import BoxOrders from './components/orders/BoxOrders';

const Orders = () => {
    const [ordersPage, setOrdersPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await getSelectedTableOrders('Active Orders', 0, "");
            setOrdersPage(response);

            const response2 = await getLastUpdateDiscogs();
            if (response2) {
                const date = new Date(response2);
                const readable = date.toLocaleString(); 
                setFormattedDate(readable);
            }
            setLoading(false);
        };
        fetchData();
    }, []);


    return (
        <DashboardLayout>
            <BoxOrders
                loading={loading}
                setLoading={setLoading}
                ordersPage={ordersPage}
                setOrdersPage={setOrdersPage}
                timeAgo={formattedDate}
            />
        </DashboardLayout>
    );
};

export default Orders;

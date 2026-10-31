import { useState, useEffect } from 'react';
import DashboardLayout from '../../globalComponents/dashboard_layout/DashboardLayout';
import BoxPayments from './components/BoxPayments';
import { getPayments } from '../../services/paymentService';

const Payments = () => {
    const today = new Date();

    const [loading, setLoading] = useState(true);
    const [paymentsPage, setPaymentsPage] = useState([]);
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const response = await getPayments(year, month);
                setPaymentsPage(response);
            } catch (error) {
                console.error('Error al obtener los pagos:', error);
                setPaymentsPage([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [year, month]);

    return (
        <DashboardLayout>
            <BoxPayments
                loading={loading}
                setLoading={setLoading}
                paymentsPage={paymentsPage}
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
            />
        </DashboardLayout>
    );
};
                
export default Payments;
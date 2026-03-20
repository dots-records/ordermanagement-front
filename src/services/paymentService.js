import api from '../api/axiosConfig';

// Crear pago asociado a un pedido y devolver el ID
export const createPaymentAssociatedToOrder = async (orderId, cost, payout) => {
    try {
        await api.post(
            `dots/orders/${orderId}/payments`, 
            { cost, payout, reason: orderId }, 
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        if (error.response) {
            if(error.response.data.message) {
                throw new Error(error.response.data.message)
            } else {
                throw new Error(error.response.data)
            }
        } else {
           throw new Error(error.message);
        }
    }
};

export const getPayment = async (id) => {
    try {
        const response = await api.get(
            `dots/payments/${id}`,  
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data; 
    } catch (error) {
        console.error('Error get payout:', error);
        throw error;
    } 
};

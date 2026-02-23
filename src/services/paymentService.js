import api from '../api/axiosConfig';

// Crear pago asociado a un pedido y devolver el ID
export const createPayout = async (orderId, cost, payout) => {
    try {
        const response = await api.post(
            `dots/orders/${orderId}/payments`, 
            { cost, payout, reason: orderId }, 
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response;
    } catch (error) {
        console.error('Error creating payout for order:', error);
        throw error;
    } 
};

export const getPayout = async (id) => {
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

// Crear pago general (sin pedido)
export const createGeneralPayout = async (cost, payout, reason) => {
    try {
        await api.post(`dots/payments`, 
            { cost: cost, payout: payout, reason: reason }, {
                headers: {
                    'Content-Type': 'application/json' 
                }
            }
        );
    } catch (error) {
        console.error('Error creating general payout:', error);
    } 
};
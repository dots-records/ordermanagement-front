import api from '../api/axiosConfig';

export const getOrder = async (orderId) => {
    try {
        const response = await api.get(`dots/orders/${orderId}`);
        return response.data;
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const getOrders = async (page = 1, size = 50, archived = null, search = null) => {
    try {
        let url = `dots/orders?page=${page}&size=${size}`;
        if (archived !== null) {
            url += `&archived=${archived}`;
        }
        if (search !== null) {
            url += `&search=${search}`;
        }
        const response = await api.get(url);
        return response.data; 
    } catch (err) {
        console.error('Error al obtener pedidos:', err.response?.data || err.message);
        throw err;
    }
};


export const patchOrderStatus = async (orderId, newStatus) => {
    try {
        await api.patch(`dots/orders/${orderId}/status`, { status: newStatus }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(`Order ${orderId} updated to status: ${newStatus}`);
    } catch (error) {
        console.error('Error updating order status:', error.response?.data || error.message);
        throw error;
    }
};

export const patchOrderWarning = async (orderId, warning) => {
    try {
        await api.patch(`dots/orders/${orderId}/warning`, { warning: warning }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(`Order ${orderId} updated to warning: ${warning}`);
    } catch (error) {
        console.error('Error updating order warning:', error.response?.data || error.message);
        throw error;
    }
};

export const patchOrderInformation = async (orderId, information) => {
    try {
        await api.patch(`dots/orders/${orderId}/information`, { information: information }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(`Order ${orderId} updated to information: ${information}`);
    } catch (error) {
        console.error('Error updating order information:', error.response?.data || error.message);
        throw error;
    }
};

export const patchOrderPaymentId = async (orderId, paymentId) => {
    try {
        await api.patch(`dots/orders/${orderId}/paymentId`, { paymentId: paymentId }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(`Order ${orderId} updated to paymentId: ${paymentId}`);
    } catch (error) {
        console.error('Error updating order paymentId:', error.response?.data || error.message);
        throw error;
    }
};

export const patchOrderJustAdded = async (orderId, justAdded) => {
    try {
        await api.patch(`dots/orders/${orderId}/justAdded`, { justAdded: justAdded }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(`Order ${orderId} updated to justAdded: ${justAdded}`);
    } catch (error) {
        console.error('Error updating order justAdded:', error.response?.data || error.message);
        throw error;
    }
};

 export const getOrdersInformation = async () => {
    try {
        const response = await api.get(`dots/getOrdersInformation`);
        return response.data;
    } catch (error) {
       console.error('Error:', error);
    }
 };

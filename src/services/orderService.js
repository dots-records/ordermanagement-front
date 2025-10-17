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






export const resetNewMessages = async (orderId) => {
    try {
        await api.post(`dots/resetNewMessages/${orderId}`);
        return 0;
    } catch (err) {
        console.error(err);
        return 1;
    }
};

export const updateMessages = async (orderId) => {
    try {
        await api.post(`dots/updateMessages/${orderId}`);
        return 0;
    } catch (err) {
        console.error(err);
        return 1;
    }
};

export const updateStatusInProgress = async (orderId) => {
    try {
       await api.put(`dots/putOrderStatus/${orderId}/In Progress`);
    } catch (error) {
      console.error('Error:', error);
    } 
  };

export const updateStatusShipping = async (orderId) => {
    try {
       await api.put(`dots/putOrderStatus/${orderId}/Shipped`); 
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const sendMessage = async (orderId, message) => {
    try {
       const response = await api.post(`/dots/sendMessage/${orderId}`, { message: message }, {
        headers: {
            'Content-Type': 'application/json' // Asegúrate de enviar como JSON
        }
    });
       console.log(response.data);
    } catch (error) {
       console.error('Error:', error);
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

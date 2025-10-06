import api from '../api/axiosConfig';

export const getOrder = async (orderId) => {
    try {
        const response = await api.get(`dots/orders/${orderId}`);
        return response.data;
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const getUnarchivedNewOrders = async () => {
    try {
        const response = await api.get('dots/getUnarchivedNewOrders');
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};


export const getOrders = async (page) => {
    try {
        const response = await api.get(`dots/orders?page=${page}&size=50&archived=false`);
        return response.data;
    } catch (err) {
        console.error('Error al obtener pedidos:', err);
        throw err;
    }
};

export const getOrdersByArchived = async (page, archived) => {
    try {
        const response = await api.get(`dots/orders?page=${page}&size=50&archived=${archived}`);
        return response.data;
    } catch (err) {
        console.error('Error al obtener pedidos:', err);
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
       await api.post(`dots/updateStatusOrder/${orderId}/In Progress`);
    } catch (error) {
      console.error('Error:', error);
    } 
  };

export const updateStatusShipping = async (orderId) => {
    try {
       await api.post(`dots/updateStatusOrder/${orderId}/Shipped`); 
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

 export const searchUnarchivedOrders = async ( page, search) => {
    try {
       const response = await api.post(`/dots/searchUnarchivedOrders/page=${page}&size=50`, { search: search }, {
        headers: {
            'Content-Type': 'application/json' // Asegúrate de enviar como JSON
        }
        
    });
    
       return response.data;
    } catch (error) {
       console.error('Error:', error);
    }
 };

 export const searchArchivedOrders = async ( page, search) => {
    try {
       const response = await api.post(`/dots/searchArchivedOrders/page=${page}&size=50`, { search: search }, {
        headers: {
            'Content-Type': 'application/json' // Asegúrate de enviar como JSON
        }
        
    });
    
       return response.data;
    } catch (error) {
       console.error('Error:', error);
    }
 };

 export const searchAllOrders = async ( page, search) => {
    try {
       const response = await api.post(`/dots/searchAllOrders/page=${page}&size=50`, { search: search }, {
        headers: {
            'Content-Type': 'application/json' // Asegúrate de enviar como JSON
        }
        
    });
    
       return response.data;
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

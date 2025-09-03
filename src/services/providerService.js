import api from '../api/axiosConfig';

export const getProviders = async (releaseId) => {
    try {
        const response = await api.get(`dots/getProviders/releaseId=${releaseId}`);
        return response.data;
    } catch (error) {
      console.error('Error:', error);
    } 
};


export const createProviderStock = async (releaseId, price, units, condition) => {
    try {
        console.log(price)
        console.log(units)
        const response = await api.post(`dots/createProvider/releaseId=${releaseId}`, {type: "Stock", price: price, 
          units: units, condition: condition}, {
        headers: {
            'Content-Type': 'application/json' // Asegúrate de enviar como JSON
        }
        
    });
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const createProviderOnline = async (releaseId, price, link) => {
    try {
        const response = await api.post(`dots/createProvider/releaseId=${releaseId}`, {type: "Online", price: price, link: link}, {
        headers: {
            'Content-Type': 'application/json' // Asegúrate de enviar como JSON
        }
        
    });
    } catch (error) {
      console.error('Error:', error);
    } 
};


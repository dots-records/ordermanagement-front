import api from '../api/axiosConfig';

export const getProviders = async (releaseId) => {
    try {
        const response = await api.get(`dots/releases/${releaseId}/providers`);
        return response.data;
    } catch (error) {
      console.error('Error:', error);
    } 
};


export const createProviderInStock = async (releaseId, price, units, condition, description) => {
    try {
      await api.post(`dots/releases/${releaseId}/providers`, {type: "In Stock", price: price, 
        units: units, condition: condition, description: description}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const createProviderOnline = async (releaseId, price, link, condition, description) => {
    try {
      await api.post(`dots/releases/${releaseId}/providers`, {type: "Online", price: price, 
        link: link, description: description, condition: condition}, {
        headers: {
            'Content-Type': 'application/json' 
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } 
};


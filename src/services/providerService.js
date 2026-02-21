import api from '../api/axiosConfig';

export const getProviders = async (releaseId) => {
    try {
        const response = await api.get(`dots/releases/${releaseId}/providers`);
        return response.data;
    } catch (error) {
      console.error('Error:', error);
    } 
};


export const createProviderInStock = async (releaseId, price, units, discCondition,
     sleeveCondition, description) => {
    try {
      await api.post(`dots/releases/${releaseId}/providers`, {type: "In Stock", price: price, 
        units: units, discCondition: discCondition, sleeveCondition: sleeveCondition, description: description}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const createProviderOnline = async (releaseId, price, link, discCondition,
     sleeveCondition, description) => {
    try {
      await api.post(`dots/releases/${releaseId}/providers`, {type: "Online", price: price, 
        link: link,  discCondition: discCondition, sleeveCondition: sleeveCondition, description: description}, {
        headers: {
            'Content-Type': 'application/json' 
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const updateProvider = async (releaseId, providerId, type, price, link, units, discCondition,
     sleeveCondition, description) => {
    try {
      await api.put(`dots/releases/${releaseId}/providers/${providerId}`, {type: type, price: price, 
        link: link, units: units ,  discCondition: discCondition, sleeveCondition: sleeveCondition, description: description}, {
        headers: {
            'Content-Type': 'application/json' 
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const deleteProvider = async (releaseId, providerId) => {
    try {
      await api.delete(`dots/releases/${releaseId}/providers/${providerId}`, {
        headers: {
            'Content-Type': 'application/json' 
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const patchProviderUnits = async (releaseId, providerId, units) => {
    try {
        await api.patch(`dots/releases/${releaseId}/providers/${providerId}/units`
            , { units: units }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
    } catch (error) {
      console.error('Error updating provider units:', error.response?.data || error.message);
    throw error;
    } 
};
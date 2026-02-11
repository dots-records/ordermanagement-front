import api from '../api/axiosConfig';

export const createListingVinted = async (releaseId, providerId, 
    link, sellingPrice) => {
    try {
        await api.post(`dots/releases/${releaseId}/providers/${providerId}/listings`, 
            {platform: "Vinted", link: link, sellingPrice: sellingPrice }, {
        headers: {
            'Content-Type': 'application/json' 
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const createListingWallapop = async (releaseId, providerId, 
    link, sellingPrice) => {
    try {
        await api.post(`dots/releases/${releaseId}/providers/${providerId}/listings`, 
            {platform: "Wallapop", link: link, sellingPrice: sellingPrice }, {
        headers: {
            'Content-Type': 'application/json' 
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const createListingDiscogs = async (releaseId, providerId, 
    sellingPrice) => {
    try {
        await api.post(`dots/releases/${releaseId}/providers/${providerId}/listings`, 
            {platform: "Discogs", sellingPrice: sellingPrice }, {
        headers: {
            'Content-Type': 'application/json' 
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } 
};


export const getListings = async (releaseId, providerId) => {
    try {
        const response = await api.get(`dots/releases/${releaseId}/providers/${providerId}/listings`);
        return response.data;
    } catch (error) {
      console.error('Error:', error);
    } 
};

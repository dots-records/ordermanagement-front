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




export const createListingOther = async (releaseId, providerId, 
    link, sellingPrice) => {
    try {
        await api.post(`dots/releases/${releaseId}/providers/${providerId}/listings`, 
            {platform: "Other", link: link, sellingPrice: sellingPrice }, {
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

export const patchSellingPriceListing = async (releaseId, providerId, listingId, newSellingPrice) => {
    try {
        await api.patch(`dots/releases/${releaseId}/providers/${providerId}/listings/${listingId}/sellingPrice`
            , { sellingPrice: newSellingPrice }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
    } catch (error) {
      console.error('Error updating listing selling price:', error.response?.data || error.message);
    throw error;
    } 
};


export const patchLinkListing = async (releaseId, providerId, listingId, newLink) => {
    try {
        await api.patch(`dots/releases/${releaseId}/providers/${providerId}/listings/${listingId}/link`
            , { link: newLink }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
    } catch (error) {
      console.error('Error updating listing link:', error.response?.data || error.message);
    throw error;
    } 
};

export const deleteListing = async (releaseId, providerId, listingId) => {
    try {
        await api.delete(`dots/releases/${releaseId}/providers/${providerId}/listings/${listingId}`);
        
    } catch (error) {
      console.error('Error deleting listing', error.response?.data || error.message);
    throw error;
    } 
};
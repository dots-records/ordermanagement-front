import api from '../api/axiosConfig';

export const createListing = async (releaseId, providerId, 
    link, sellingPrice, platform) => {
    try {
        await api.post(`dots/releases/${releaseId}/providers/${providerId}/listings`, 
            {platform: platform, link: link, sellingPrice: sellingPrice }, {
        headers: {
            'Content-Type': 'application/json' 
        }
      });
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


export const getListings = async (releaseId, providerId) => {
    try {
        const response = await api.get(`dots/releases/${releaseId}/providers/${providerId}/listings`);
        return response.data;
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const getExistsListing = async (releaseId, providerId, listingId) => {
    try {
        const response = 
            await api.get(`dots/releases/${releaseId}/providers/${providerId}/listings/${listingId}`);
        return response.data;
    }catch (error) {
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


export const patchLinkListing = async (releaseId, providerId, listingId, newLink) => {
    try {
        await api.patch(`dots/releases/${releaseId}/providers/${providerId}/listings/${listingId}/link`
            , { link: newLink }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
    }  catch (error) {
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

export const deleteListing = async (releaseId, providerId, listingId) => {
    try {
        await api.delete(`dots/releases/${releaseId}/providers/${providerId}/listings/${listingId}`);
        
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
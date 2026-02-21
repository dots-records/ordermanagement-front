import api from '../api/axiosConfig';

export const patchOrderItemListing = async (orderId, itemId, listingId, listingPlatform,
    listingLink, listingSellingPrice) => {
    try {
        await api.patch(`dots/orders/${orderId}/items/${itemId}/listing`, 
            {id: listingId, platform: listingPlatform, link: listingLink, sellingPrice: listingSellingPrice }, {
        headers: {
            'Content-Type': 'application/json' 
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const patchOrderItemProvider = async (orderId, itemId, providerId, providerType,
    providerPrice, providerLink, providerUnits, providerDiscCondition, providerSleeveCondition,
    providerDescription) => {
    try {
        await api.patch(`dots/orders/${orderId}/items/${itemId}/provider`, 
            {id: providerId, type: providerType, price: providerPrice, link: providerLink, 
                units: providerUnits, discCondition: providerDiscCondition, 
                sleeveCondition: providerSleeveCondition, description: providerDescription }, {
        headers: {
            'Content-Type': 'application/json' 
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const patchOrderItemRelease = async (orderId, itemId, releaseId, releaseName, releaseArtists,
    releaseThumb) => {
    try {
        console.log(orderId)
        console.log(itemId)
        console.log(releaseId)
                    console.log(releaseName)
                    console.log(releaseArtists)
                    console.log(releaseThumb)
        await api.patch(`dots/orders/${orderId}/items/${itemId}/release`, 
            {id: releaseId, name: releaseName, artists: releaseArtists, thumb: releaseThumb}, {
        headers: {
            'Content-Type': 'application/json' 
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const patchOrderItemAssociated = async (orderId, itemId, associated) => {
    try {
        await api.patch(`dots/orders/${orderId}/items/${itemId}/associated`, 
            {associated: associated}, {
        headers: {
            'Content-Type': 'application/json' 
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } 
};
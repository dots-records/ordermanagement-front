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
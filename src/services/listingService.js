import api from '../api/axiosConfig';

export const getListings = async (releaseId) => {
    try {
        const response = await api.get(`dots/getListings/releaseId=${releaseId}`);
        return response.data;
    } catch (error) {
      console.error('Error:', error);
    } 
};

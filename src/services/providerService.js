import api from '../api/axiosConfig';

export const getProviders = async (releaseId) => {
    try {
        const response = await api.get(`dots/getProviders/releaseId=${releaseId}`);
        return response.data;
    } catch (error) {
      console.error('Error:', error);
    } 
};
import api from '../api/axiosConfig';

export const getNotifications = async (page) => {
    try {
        const response = await api.get(`dots/getNotifications/page=${page}&size=50`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
import api from '../api/axiosConfig';

export const getReleases = async (page) => {
    try {
        const response = await api.get(`dots/getReleases/page=${page}&size=50`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
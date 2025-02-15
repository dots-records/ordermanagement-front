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

export const searchReleases = async ( page, search) => {
    try {
       const response = await api.post(`/dots/searchReleases/page=${page}&size=50`, { search: search }, {
        headers: {
            'Content-Type': 'application/json' // Asegúrate de enviar como JSON
        }
        
    });
    
       return response.data;
    } catch (error) {
       console.error('Error:', error);
    }
 };
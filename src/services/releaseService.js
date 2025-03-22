import api from '../api/axiosConfig';

export const getRelease = async (releaseId) => {
    try {
        const response = await api.get(`dots/getRelease/${releaseId}`);
        return response.data;
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const getAllReleases = async (page) => {
    try {
        const response = await api.get(`dots/getAllReleases/page=${page}&size=50`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getArchivedReleases = async (page) => {
    try {
        const response = await api.get(`dots/getArchivedReleases/page=${page}&size=50`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getUnarchivedReleases = async (page) => {
    try {
        const response = await api.get(`dots/getUnarchivedReleases/page=${page}&size=50`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const searchAllReleases = async ( page, search) => {
    try {
       const response = await api.post(`/dots/searchAllReleases/page=${page}&size=50`, { search: search }, {
        headers: {
            'Content-Type': 'application/json' // Asegúrate de enviar como JSON
        }
        
    });
    
       return response.data;
    } catch (error) {
       console.error('Error:', error);
    }
 };

 export const searchArchivedReleases = async ( page, search) => {
    try {
       const response = await api.post(`/dots/searchArchivedReleases/page=${page}&size=50`, { search: search }, {
        headers: {
            'Content-Type': 'application/json' // Asegúrate de enviar como JSON
        }
        
    });
    
       return response.data;
    } catch (error) {
       console.error('Error:', error);
    }
 };

 export const searchUnarchivedReleases = async ( page, search) => {
    try {
       const response = await api.post(`/dots/searchUnarchivedReleases/page=${page}&size=50`, { search: search }, {
        headers: {
            'Content-Type': 'application/json' // Asegúrate de enviar como JSON
        }
        
    });
    
       return response.data;
    } catch (error) {
       console.error('Error:', error);
    }
 };

 export const putReleaseFromDiscogs = async (id) => {
    try {
        await api.post(`dots/putReleaseFromDiscogs/${id}`);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const deleteReleases = async (releasesSelected) => {
    try {
        await api.post(`dots/deleteReleases`, releasesSelected, {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const archiveReleases = async (releasesSelected) => {
    try {
        await api.post(`dots/archiveReleases`, releasesSelected, {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const unarchiveReleases = async (releasesSelected) => {
    try {
        await api.post(`dots/unarchiveReleases`, releasesSelected, {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
};




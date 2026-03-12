import api from '../api/axiosConfig';

export const getRelease = async (releaseId) => {
    try {
        const response = await api.get(`dots/releases/${releaseId}`);
        return response.data;
    } catch (error) {
      console.error('Error:', error);
    } 
};

export const getReleases = async (page = 1, size = 50, archived = null, search = null) => {
    try {
        let url = `dots/releases?page=${page}&size=${size}`;
        if (archived !== null) {
            url += `&archived=${archived}`;
        }
        if (search !== null) {
            url += `&search=${search}`;
        }
        const response = await api.get(url);
        return response.data; 
    } catch (err) {
        console.error('Error al obtener releases:', err.response?.data || err.message);
        throw err;
    }
};

export const createRelease = async (discogsId) => {
    try {
        await api.post(`dots/releases`, {
            discogsId: discogsId
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

export const deleteReleases = async (releasesSelected) => {
    try {
        await api.delete("dots/releases", {
            data: releasesSelected
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

export const updateArchived = async (ids, archived) => {
    try {
        await api.patch("dots/releases/archived", {
            ids,
            archived
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

export const getReleasesCount = async (archived = null) => {
    try {
        let url = "dots/releases/count";

        if (archived !== null) {
            url += `?archived=${archived}`;
        }

        const response = await api.get(url);
        return response.data;
    } catch (err) {
        console.error("Error al obtener el count de releases:", err.response?.data || err.message);
        throw err;
    }
};

export const patchReleaseNote = async (releaseId, note) => {
    try {
        await api.patch(`dots/releases/${releaseId}/note`, { note: note }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(`Release ${releaseId} updated to note: ${note}`);
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





import api from './api';

export const loginManager = async (credentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
};


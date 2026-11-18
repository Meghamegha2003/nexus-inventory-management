
import api from './api.js';

export const createProduct = async (productData) => {
    const response = await api.post('/master/product', productData);
    return response.data;
};

export const getProducts = async () => {
    const response = await api.get('/master/product');
    return response.data;
};

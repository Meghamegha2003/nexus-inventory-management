
const API_BASE_URL = 'http://localhost:3000';
const PRODUCT_ENDPOINT = `${API_BASE_URL}/api/master/product`;

export const createProduct = async (productData) => {
    const response = await fetch(PRODUCT_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(productData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Failed to create product');
    }

    return result;
};

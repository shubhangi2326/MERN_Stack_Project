import axios from 'axios';

//  base URL
const API_URL = 'http://localhost:5000/api/admin';

// ========================================================================
//                           CATEGORY API FUNCTIONS
// ========================================================================

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// ------------------------------------------------------------------------

export const createCategory = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/categories`, data);
        return response;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

// ------------------------------------------------------------------------

export const updateCategory = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/categories/${id}`, data);
        return response;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};

// ------------------------------------------------------------------------

export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/categories/${id}`);
        return response;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};

// ========================================================================
//                         SUBCATEGORY API FUNCTIONS
// ========================================================================

export const getSubcategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/subcategories`);
        return response;
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        throw error;
    }
};

// ------------------------------------------------------------------------

export const createSubcategory = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/subcategories`, data);
        return response;
    } catch (error) {
        console.error("Error creating subcategory:", error);
        throw error;
    }
};

// ------------------------------------------------------------------------

export const updateSubcategory = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/subcategories/${id}`, data);
        return response;
    } catch (error) {
        console.error("Error updating subcategory:", error);
        throw error;
    }
};

// ------------------------------------------------------------------------

export const deleteSubcategory = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/subcategories/${id}`);
        return response;
    } catch (error) {
        console.error("Error deleting subcategory:", error);
        throw error;
    }
};

// ------------------------------------------------------------------------


export const getSubcategoriesByCategory = async (catId) => {
    try {
       
        const response = await axios.get(`${API_URL}/subcategories/category/${catId}`);
        return response;
    } catch (error) {
        console.error("Error fetching subcategories by category:", error);
        throw error;
    }
};


// ========================================================================
//                           PRODUCT API FUNCTIONS
// ========================================================================

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

// ------------------------------------------------------------------------

export const createProduct = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/products`, data);
        return response;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

// ------------------------------------------------------------------------

export const updateProduct = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/products/${id}`, data);
        return response;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

// ------------------------------------------------------------------------

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/products/${id}`);
        return response;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

// ========================================================================
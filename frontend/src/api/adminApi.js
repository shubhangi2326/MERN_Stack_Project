import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

export const API_ENDPOINTS = {
    GET_ALL_CATEGORIES: '/categories',
    CREATE_CATEGORY: '/categories',
    UPDATE_CATEGORY: (id) => `/categories/${id}`,
    DELETE_CATEGORY: (id) => `/categories/${id}`,

    GET_ALL_SUBCATEGORIES: '/subcategories',
    CREATE_SUBCATEGORY: '/subcategories',
    UPDATE_SUBCATEGORY: (id) => `/subcategories/${id}`,
    DELETE_SUBCATEGORY: (id) => `/subcategories/${id}`,

    GET_ALL_PRODUCTS: '/products',
    CREATE_PRODUCT: '/products',
    UPDATE_PRODUCT: (id) => `/products/${id}`,
    DELETE_PRODUCT: (id) => `/products/${id}`,
};

export default API;
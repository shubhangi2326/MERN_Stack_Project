import { useState, useEffect, useCallback } from 'react';

const useCRUD = (api) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.getAll();
            setData(response.data.data || []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    }, [api]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCreate = async (formData) => {
        await api.create(formData);
        fetchData();
    };

    const handleUpdate = async (id, formData) => {
        await api.update(id, formData);
        fetchData();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            await api.delete(id);
            fetchData();
        }
    };

    return { data, loading, error, handleCreate, handleUpdate, handleDelete };
};

export default useCRUD;
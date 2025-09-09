import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
    getSubcategories, 
    createSubcategory, 
    updateSubcategory, 
    deleteSubcategory 
} from '../api/adminService.js';
import toast from 'react-hot-toast'; 
// Components
import Message from '../components/common/Message.jsx'; 
import SubcategoryList from '../components/subcategory/SubcategoryList.jsx';
import SubcategoryForm from '../components/subcategory/SubcategoryForm.jsx';

const SubcategoriesPage = () => {
    // States
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingSubcategory, setEditingSubcategory] = useState(null);

    useEffect(() => {
        fetchSubcategories();
    }, []);

    const fetchSubcategories = async () => {
        try {
            setLoading(true);
            const res = await getSubcategories();
            setSubcategories(res.data.data || []);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load data. Please refresh.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setEditingSubcategory(null);
    };

    const handleEditClick = (sub) => {
        setEditingSubcategory(sub);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this subcategory?')) {
            try {
                await deleteSubcategory(id);
                setSubcategories(prev => prev.filter(sub => sub._id !== id));
                toast.success('Subcategory deleted successfully!'); // Toast notification
            } catch (err) {
                toast.error(err.response?.data?.message || 'Failed to delete subcategory.');
            }
        }
    };

    const handleSubmit = async (formData) => {
        setIsSubmitting(true);
        
        try {
            if (editingSubcategory) {
                // UPDATE LOGIC
                const res = await updateSubcategory(editingSubcategory._id, formData);
                setSubcategories(prev => 
                    prev.map(sub => (sub._id === editingSubcategory._id ? res.data.data : sub))
                );
                toast.success('Subcategory updated successfully!'); // Success toast
            } else {
                // CREATE LOGIC
                const res = await createSubcategory(formData);
                setSubcategories(prev => [...prev, res.data.data]);
                toast.success('Subcategory created successfully!'); 
            }
            resetForm();
        } catch (err) {
            toast.error(err.response?.data?.message || 'An error occurred.'); 
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col md={4}>
                   
                    <SubcategoryForm
                        onSubmit={handleSubmit}
                        initialData={editingSubcategory}
                        onCancel={resetForm}
                        isSubmitting={isSubmitting}
                    />
                </Col>

                <Col md={8}>
                    {error ? <Message variant="danger">{error}</Message> : (
                        <SubcategoryList
                            subcategories={subcategories}
                            onEdit={handleEditClick}
                            onDelete={handleDelete}
                            loading={loading}
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default SubcategoriesPage;
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/adminService';
import toast from 'react-hot-toast';
import CategoryForm from '../components/category/CategoryForm';
import CategoryList from '../components/category/CategoryList';
import { FaPlus } from 'react-icons/fa';

const CategoriesPage = () => {
  
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getCategories();
            setCategories(response.data.data || []);
        } catch (error) {
            toast.error("Could not fetch categories.");
        } finally {
            setLoading(false);
        }
    };

  
    const handleFormSubmit = async (formData) => {
        try {
            if (editingCategory) {
                
                await updateCategory(editingCategory._id, formData);
                toast.success('Category updated!');
            } else {
               
                await createCategory(formData);
                toast.success('Category created!');
            }
            setShowForm(false);
            setEditingCategory(null);
            fetchData(); 
        } catch (error) {
            toast.error("Operation failed!");
        }
    };

    
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            try {
                await deleteCategory(id);
                toast.success('Category deleted!');
                fetchData(); 
            } catch (error) {
                toast.error("Failed to delete category.");
            }
        }
    };
    
   
    const showAddForm = () => {
        setEditingCategory(null);
        setShowForm(true);
    };
    const showEditForm = (category) => {
        setEditingCategory(category);
        setShowForm(true);
    };
    const hideForm = () => {
        setShowForm(false);
        setEditingCategory(null);
    };

    return (
        <Container fluid className="p-4">
            <Row className="mb-4">
                <Col>
                    <h1>Manage Categories</h1>
                </Col>
            </Row>

            {showForm ? (
                
                <CategoryForm 
                    onSubmit={handleFormSubmit}
                    initialData={editingCategory}
                    onCancel={hideForm}
                />
            ) : (
               
                <Button onClick={showAddForm} className="mb-3">
                    <FaPlus className="me-2" /> Add New Category
                </Button>
            )}

            <CategoryList 
                categories={categories}
                onEdit={showEditForm}
                onDelete={handleDelete}
                loading={loading}
            />
        </Container>
    );
};

export default CategoriesPage;
// src/components/subcategories/SubcategoryForm.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import { getCategories } from '../../api/adminService';
import toast from 'react-hot-toast';

const SubcategoryForm = ({ onSubmit, initialData, onCancel, isSubmitting }) => {
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const isEditing = !!initialData;

    
    useEffect(() => {
        setLoadingCategories(true);
        getCategories()
            .then(res => setCategories(res.data.data || []))
            .catch(() => toast.error("Could not fetch categories."))
            .finally(() => setLoadingCategories(false));
    }, []);

  
    useEffect(() => {
        if (isEditing && initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
            setSelectedCategory(initialData.category?._id || ''); 
        } else {
           
            setName('');
            setDescription('');
            setSelectedCategory('');
        }
    }, [initialData, isEditing]);

    // Form Submit Handler
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ 
            name, 
            description,
            category: selectedCategory 
        });
    };

    
    return (
        <Card className="shadow-sm">
            <Card.Header as="h5">
                {isEditing ? 'Edit Subcategory' : 'Add Subcategory'}
            </Card.Header>
            
            <Card.Body className="pt-2"> 
                <Form onSubmit={handleSubmit}>
                    
                    {/* Subcategory Name Input */}
                    <Form.Group className="mb-3" controlId="subcategoryName">
                        <Form.Label>Subcategory Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="e.g., Smartphones"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                    </Form.Group>

                    {/* Description Textarea */}
                    <Form.Group className="mb-3" controlId="subcategoryDescription">
                        <Form.Label>Description (Optional)</Form.Label>
                        <Form.Control 
                            as="textarea"
                            rows={3}
                            placeholder="A short description about this subcategory"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    {/* Parent Category Dropdown */}
                    <Form.Group className="mb-3" controlId="categorySelect">
                        <Form.Label>Parent Category</Form.Label>
                        <Form.Select 
                            value={selectedCategory} 
                            onChange={(e) => setSelectedCategory(e.target.value)} 
                            required
                            disabled={loadingCategories}
                        >
                            <option value="">
                                {loadingCategories ? 'Loading...' : '-- Select a Category --'}
                            </option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    
                    {/* Action Buttons */}
                    <div className="d-flex gap-2">
                        <Button variant="primary" type="submit" disabled={isSubmitting || loadingCategories}>
                            {isSubmitting ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" />
                                    <span className="ms-2">Saving...</span>
                                </>
                            ) : (
                                isEditing ? 'Save Changes' : 'Add Subcategory'
                            )}
                        </Button>
                        
                        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default SubcategoryForm;
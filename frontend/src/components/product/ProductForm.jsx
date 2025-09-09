import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { getCategories, getSubcategoriesByCategory } from '../../api/adminService';
import toast from 'react-hot-toast';

const ProductForm = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({ name: '', description: '', price: '', category: '', subcategory: '' });
    const [allCategories, setAllCategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [isSubcategoryLoading, setIsSubcategoryLoading] = useState(false);
    const isEditing = !!initialData;

    useEffect(() => {
        getCategories()
            .then(res => {
                // YAHAN HAI ASLI CHANGE - res.data.data
                setAllCategories(res.data.data || []);
            })
            .catch(() => toast.error("Could not fetch categories."));
    }, []);

    useEffect(() => {
        if (formData.category) {
            setIsSubcategoryLoading(true);
            getSubcategoriesByCategory(formData.category)
                .then(res => {
                    // YAHAN BHI HAI ASLI CHANGE - res.data.data
                    setFilteredSubcategories(res.data.data || []);
                })
                .catch(() => {
                    toast.error("Could not fetch subcategories.");
                    setFilteredSubcategories([]);
                })
                .finally(() => {
                    setIsSubcategoryLoading(false);
                });
        } else {
            setFilteredSubcategories([]);
        }
    }, [formData.category]);

    useEffect(() => {
        if (isEditing && initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                price: initialData.price || '',
                category: initialData.category?._id || '',
                subcategory: initialData.subcategory?._id || ''
            });
        } else {
             setFormData({ name: '', description: '', price: '', category: '', subcategory: '' });
        }
    }, [initialData, isEditing]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            setFormData(prev => ({ ...prev, category: value, subcategory: '' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubmit = (e) => { 
        e.preventDefault(); 
        onSubmit(formData); 
    };

    return (
        <Card className="mb-4">
            <Card.Header as="h5">{isEditing ? 'Edit Product' : 'Add New Product'}</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select name="category" value={formData.category} onChange={handleChange} required>
                                    <option value="">-- Select Category --</option>
                                    {allCategories.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Subcategory</Form.Label>
                                <Form.Select 
                                    name="subcategory" 
                                    value={formData.subcategory} 
                                    onChange={handleChange} 
                                    required 
                                    disabled={!formData.category || isSubcategoryLoading}
                                >
                                    <option value="">
                                        {isSubcategoryLoading ? 'Loading...' : '-- Select Subcategory --'}
                                    </option>
                                    {filteredSubcategories.map(sub => (
                                        <option key={sub._id} value={sub._id}>{sub.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Form.Group className="mb-3"><Form.Label>Product Name</Form.Label><Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required /></Form.Group>
                    <Form.Group className="mb-3"><Form.Label>Price</Form.Label><Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required /></Form.Group>
                    <Form.Group className="mb-3"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required /></Form.Group>
                    <Button type="submit" variant="primary">{isEditing ? 'Save Changes' : 'Submit'}</Button>
                    <Button variant="light" onClick={onCancel} className="ms-2">Cancel</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ProductForm;
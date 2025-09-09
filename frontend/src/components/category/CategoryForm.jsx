import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const CategoryForm = ({ onSubmit, initialData, onCancel }) => {
    // Form ke liye simple state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const isEditing = !!initialData;

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, description });
    };

    return (
        <Card className="mb-4">
            <Card.Header as="h5">{isEditing ? 'Edit Category' : 'Add New Category'}</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="categoryName">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter category name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="categoryDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea"
                            rows={3}
                            placeholder="Enter a short description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        {isEditing ? 'Save Changes' : 'Submit'}
                    </Button>
                    <Button variant="light" onClick={onCancel} className="ms-2">
                        Cancel
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CategoryForm;
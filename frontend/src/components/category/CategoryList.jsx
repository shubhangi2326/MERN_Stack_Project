import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Loader from '../common/Loader';

const CategoryList = ({ categories, onEdit, onDelete, loading }) => {
    return (
        <Card>
            <Card.Header as="h5">Category List</Card.Header>
            <Card.Body>
                {loading ? <Loader /> : (
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th> 
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 ? (
                                categories.map((cat, index) => (
                                    <tr key={cat._id}>
                                        <td>{index + 1}</td>
                                        <td>{cat.name}</td>
                                       
                                        <td>{cat.description}</td> 
                                        <td className="text-center">
                                            <Button variant="info" size="sm" onClick={() => onEdit(cat)} className="me-2"><FaPencilAlt /></Button>
                                            <Button variant="danger" size="sm" onClick={() => onDelete(cat._id)}><FaTrash /></Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No categories found.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
};
export default CategoryList;
import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Loader from '../common/Loader';


const SubcategoryList = ({ subcategories, onEdit, onDelete, loading }) => {
    
    return (
        <Card>
            <Card.Header as="h5">Subcategory List</Card.Header>
            <Card.Body>

                {loading ? (
                    <Loader />
                ) : (
                    
                    /* --- 2. Table UI --- */
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Parent Category</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subcategories.length > 0 ? (
                                
                                subcategories.map((sub, index) => (
                                    <tr key={sub._id}>
                                        <td>{index + 1}</td>
                                        <td>{sub.name}</td>
                                        <td>{sub.description}</td>
                                      
                                        <td>{sub.category?.name || 'N/A'}</td>
                                        
                                        <td className="text-center">
                                            <Button 
                                                variant="info" 
                                                size="sm" 
                                                onClick={() => onEdit(sub)} 
                                                className="me-2"
                                                title="Edit"
                                            >
                                                <FaPencilAlt />
                                            </Button>
                                            
                                            <Button 
                                                variant="danger" 
                                                size="sm" 
                                                onClick={() => onDelete(sub._id)}
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))

                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No subcategories found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                )}
            </Card.Body>
        </Card>
    );
};

export default SubcategoryList;
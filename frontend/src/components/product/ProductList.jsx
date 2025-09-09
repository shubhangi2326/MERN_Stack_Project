import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Loader from '../common/Loader';

const ProductList = ({ products, onEdit, onDelete, loading }) => {
    
    return (
        <Card>
            <Card.Header as="h5">Product List</Card.Header>
            <Card.Body>

                {/* --- 1. Loading State --- */}
                {loading ? (
                    <Loader />
                ) : (
                    
                    /* --- 2. Table UI --- */
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Subcategory</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>₹{product.price}</td>
                                        {/* Backend se populate hoke data aayega */}
                                        <td>{product.category?.name || 'N/A'}</td>
                                        <td>{product.subcategory?.name || 'N/A'}</td>
                                        <td className="text-center">
                                            <Button 
                                                variant="info" 
                                                size="sm" 
                                                onClick={() => onEdit(product)} 
                                                className="me-2"
                                            >
                                                <FaPencilAlt />
                                            </Button>
                                            <Button 
                                                variant="danger" 
                                                size="sm" 
                                                onClick={() => onDelete(product._id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No products found.
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

export default ProductList;
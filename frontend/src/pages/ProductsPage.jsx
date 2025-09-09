import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import toast from 'react-hot-toast'; 

import {
  getProducts,
  createProduct,
  updateProduct, 
  deleteProduct, 
  getCategories,
  getSubcategoriesByCategory,
} from "../api/adminService.js";

import ProductList from "../components/product/ProductList.jsx";
import Message from "../components/common/Message.jsx";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "", 
    description: "", 
    price: "", 
    category: "", 
    subcategory: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([getProducts(), getCategories()]);
        setProducts(productsRes.data.data || []);
        setCategories(categoriesRes.data.data || []);
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Failed to load page data.";
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!formData.category) {
      setSubcategories([]);
      return;
    }

    const fetchSubcategories = async () => {
      setIsLoadingSubcategories(true);
      try {
        const res = await getSubcategoriesByCategory(formData.category);
        setSubcategories(res.data.data || []);
      } catch (error) {
        setSubcategories([]);
        toast.error("Could not load subcategories.");
      } finally {
        setIsLoadingSubcategories(false);
      }
    };
    fetchSubcategories();
  }, [formData.category]);

  useEffect(() => {
    if (editingProduct) {
        setFormData({
            name: editingProduct.name || '',
            description: editingProduct.description || '',
            price: editingProduct.price || '',
            category: editingProduct.category?._id || '',
            subcategory: editingProduct.subcategory?._id || '',
        });
    } else {
        setFormData({ name: "", description: "", price: "", category: "", subcategory: "" });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
        setFormData(prev => ({ ...prev, category: value, subcategory: "" }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
        if (editingProduct) {
            const res = await updateProduct(editingProduct._id, formData);
            setProducts(products.map(p => p._id === editingProduct._id ? res.data.data : p));
            toast.success("Product updated successfully!");
        } else {
            const res = await createProduct(formData);
            setProducts([res.data.data, ...products]);
            toast.success("Product created successfully!");
        }
      setEditingProduct(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
        try {
            await deleteProduct(id);
            setProducts(products.filter(p => p._id !== id));
            toast.success('Product deleted successfully!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete product.');
        }
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h3">{editingProduct ? 'Edit Product' : 'Add New Product'}</Card.Title>
              <Form onSubmit={handleSubmit}>
                
                <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Subcategory</Form.Label>
                    <Form.Select 
                        name="subcategory" 
                        value={formData.subcategory} 
                        onChange={handleChange} 
                        required 
                        disabled={!formData.category || isLoadingSubcategories}
                    >
                        <option value="">{isLoadingSubcategories ? "Loading..." : "Select Subcategory"}</option>
                        {subcategories.map((sub) => (
                            <option key={sub._id} value={sub._id}>{sub.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                
                <div className="d-grid gap-2">
                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                        {isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : (editingProduct ? 'Save Changes' : 'Add Product')}
                    </Button>
                    {editingProduct && 
                        <Button variant="secondary" onClick={() => setEditingProduct(null)} disabled={isSubmitting}>
                            Cancel Edit
                        </Button>
                    }
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header as="h5">Product List</Card.Header>
            <Card.Body>
              {error && <Message variant="danger">{error}</Message>}
              {isLoading ? (
                <div className="text-center p-5"><Spinner animation="border" /></div>
              ) : (
                <ProductList 
                    products={products} 
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;
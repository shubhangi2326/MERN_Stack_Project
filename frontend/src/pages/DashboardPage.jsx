import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { getCategories, getSubcategories, getProducts } from '../api/adminService';
import { FaSitemap, FaListUl, FaBoxOpen } from 'react-icons/fa';
import toast from 'react-hot-toast';


const StatCard = ({ title, value, icon, variant, linkTo }) => {
    const navigate = useNavigate(); // 
    const handleCardClick = () => {
        navigate(linkTo); 
    };

    return (
        
        <Card 
            bg={variant} 
            text="white" 
            className="mb-3 shadow" 
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }} 
        >
            <Card.Body>
                <Row className="align-items-center">
                    <Col xs={4} className="text-center">
                        {icon}
                    </Col>
                    <Col xs={8}>
                        <h2 className="mb-0 fw-bold">{value}</h2>
                        <p className="mb-0">{title}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};


// --- Main Dashboard Page Component ---
const DashboardPage = () => {
    
    const [categoryCount, setCategoryCount] = useState(0);
    const [subcategoryCount, setSubcategoryCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
               
                const [catRes, subcatRes, prodRes] = await Promise.all([
                    getCategories(),
                    getSubcategories(),
                    getProducts()
                ]);

               
                setCategoryCount(catRes.data.data.length);
                setSubcategoryCount(subcatRes.data.data.length);
                setProductCount(prodRes.data.data.length);

            } catch (error) {
                toast.error("Dashboard data could not be loaded.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []); 
    if (loading) {
        return (
            <Container fluid className="p-4 text-center">
                <Spinner animation="border" />
                <p>Loading Dashboard...</p>
            </Container>
        );
    }
    
    return (
        <Container fluid className="p-4">
            <h1 className="mb-4">Dashboard</h1>
            <Row>
                {/* Total Categories Card */}
                <Col md={4}>
                    <StatCard 
                        title="Total Categories"
                        value={categoryCount}
                        icon={<FaSitemap size={50} />}
                        variant="primary"
                        linkTo="/categories" 
                    />
                </Col>
                
                {/* Total Subcategories Card */}
                <Col md={4}>
                    <StatCard 
                        title="Total Subcategories"
                        value={subcategoryCount}
                        icon={<FaListUl size={50} />}
                        variant="success"
                        linkTo="/subcategories" 
                    />
                </Col>
                
                {/* Total Products Card */}
                <Col md={4}>
                    <StatCard 
                        title="Total Products"
                        value={productCount}
                        icon={<FaBoxOpen size={50} />}
                        variant="warning"
                        linkTo="/products" 
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardPage;
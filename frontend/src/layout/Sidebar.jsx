// src/components/layout/Sidebar.jsx

import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaSitemap, FaListUl, FaBoxOpen } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <Nav className="flex-column bg-dark vh-100 p-3" style={{ width: '250px', position: 'fixed' }}>
            <h3 className="text-white text-center mb-4">Admin Panel</h3>
            <NavLink to="/dashboard" className="nav-link text-white d-flex align-items-center mb-2">
                <FaTachometerAlt className="me-2" /> Dashboard
            </NavLink>
            <NavLink to="/categories" className="nav-link text-white d-flex align-items-center mb-2">
                <FaSitemap className="me-2" /> Categories
            </NavLink>
            <NavLink to="/subcategories" className="nav-link text-white d-flex align-items-center mb-2">
                <FaListUl className="me-2" /> Subcategories
            </NavLink>
            <NavLink to="/products" className="nav-link text-white d-flex align-items-center mb-2">
                <FaBoxOpen className="me-2" /> Products
            </NavLink>
        </Nav>
    );
};

export default Sidebar;
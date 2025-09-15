// src/components/layout/Header.jsx 

import React from 'react';

const Header = ({ title }) => (
    <header className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
        
        {/* Title */}
        <h3 className="mb-0 fw-semibold text-dark">{title}</h3>

        {/* Breadcrumb Text */}
        <div className="small">
            <span className="text-muted">Dashboard</span>
            <span className="mx-2 text-muted">/</span>
            <span className="text-dark">{title}</span>
        </div>
        
    </header>
);

export default Header;
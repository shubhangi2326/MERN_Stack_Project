import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import DashboardPage from './pages/DashboardPage';
import CategoriesPage from './pages/CategoriesPage';
import SubcategoriesPage from './pages/SubcategoriesPage'; 
import ProductsPage from './pages/ProductsPage';      
import Sidebar from './components/common/Sidebar';

const Layout = ({ children }) => (
    <div style={{ display: 'flex' }}>
        <Sidebar/>
        <main style={{ flexGrow: 1, marginLeft: '250px', overflowY: 'auto', height: '100vh' }}>
            {children}
        </main>
    </div>
);

function App() {
  // Yahan console log lagao:
  console.log('Backend URL:', import.meta.env.VITE_API_URL);

  return (
    <Router>
      <Toaster position="top-right" />
      
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        <Route path="/dashboard" element={
            <Layout>
                <DashboardPage />
            </Layout>
        } />
        <Route path="/categories" element={
            <Layout>
                <CategoriesPage />
            </Layout>
        } />
        
        <Route path="/subcategories" element={
            <Layout>
                <SubcategoriesPage />
            </Layout>
        } />
        <Route path="/products" element={
            <Layout>
                <ProductsPage />
            </Layout>
        } />

      </Routes>
    </Router>
  );
}

export default App;
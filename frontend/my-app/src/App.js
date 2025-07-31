import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import AllProducts from './pages/AllProducts';
import DepartmentPage from './pages/DepartmentPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} /> */}
         <Route path="/" element={<AllProducts />} />
         <Route path="/departments/:deptName" element={<DepartmentPage />} />
      </Routes>
    </Router>
  );
};

export default App;

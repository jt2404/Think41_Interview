import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products') // Adjust if needed
      .then(res => setProducts(res.data.products))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Products</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            <Link to={`/products/${p.id}`}>{p.name} — ₹{p.retail_price}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

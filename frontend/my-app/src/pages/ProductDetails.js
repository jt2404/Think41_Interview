import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error fetching product:', err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{product.name}</h2>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ₹{product.retail_price}</p>
      <p><strong>Cost:</strong> ₹{product.cost}</p>
      <p><strong>SKU:</strong> {product.sku}</p>
      <p><strong>Department:</strong> {product.department}</p>
      <p><strong>Distribution Center ID:</strong> {product.distribution_center_id}</p>

      <br />
      <Link to="/">← Back to Products</Link>
    </div>
  );
};

export default ProductDetails;

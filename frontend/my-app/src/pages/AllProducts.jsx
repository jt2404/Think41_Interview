import { useEffect, useState } from 'react';
import axios from 'axios';
import DepartmentList from './DepartmentList';
import ProductList from './ProductList';

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(res => setProducts(res.data.products))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <DepartmentList />
      <h2 className="text-xl font-semibold my-4">All Products</h2>
      <ProductList products={products} />
    </div>
  );
}

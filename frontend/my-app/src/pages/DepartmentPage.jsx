import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import DepartmentHeader from './DepartmentHeader';
import ProductList from './ProductList';

export default function DepartmentPage() {
  const { deptName } = useParams();
  const [products, setProducts] = useState([]);
   const location = useLocation();
  const department = location.state?.department || {};
  console.log(department)

  useEffect(() => {
    axios.get(`http://localhost:8000/api/departments/${department._id}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [department._id]);

  return (
    <div>
      <Link to="/" className="text-blue-600 underline">← Back to All Products</Link>
      <DepartmentHeader name={department.name} count={products.length} />
      <ProductList products={products} />
    </div>
  );
}

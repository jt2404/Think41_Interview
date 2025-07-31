import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/departments')
      .then(res => setDepartments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {departments.map(dept => (
        <Link
          to={`/departments/${dept.name}`}
          key={dept._id}
          className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
          state={{ department: dept }}
        >
          {dept.name}
        </Link>
      ))}
    </div>
  );
}

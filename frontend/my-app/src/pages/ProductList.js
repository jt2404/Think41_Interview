export default function ProductList({ products }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {products.map(p => (
        <div key={p._id} className="border rounded p-2 shadow">
          <h3 className="font-semibold">{p.name}</h3>
          <p>Cost: ₹{p.cost}</p>
          <p>Department: {p.department?.name}</p>
        </div>
      ))}
    </div>
  );
}

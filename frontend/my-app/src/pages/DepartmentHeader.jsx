export default function DepartmentHeader({ name, count }) {
  return (
    <div className="my-4">
      <h2 className="text-xl font-bold">Department: {name}</h2>
      <p>{count} product(s) found</p>
    </div>
  );
}

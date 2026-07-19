export default function Category({ categories = [], onSelect }) {
  return (
    <div className="bg-green-500 flex gap-2">
      <button onClick={() => onSelect("all")} className="cursor-pointer">
        All
      </button>

      {categories.map((cat) => (
        <div
          className="cursor-pointer p-2 bg-gray-600"
          onClick={() => onSelect(cat)}
        >
          {cat.name}
        </div>
      ))}
    </div>
  );
}
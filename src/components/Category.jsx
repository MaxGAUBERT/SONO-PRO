export default function Category({ categories = [], onSelect }) {
  return (
    <div className="flex flex-shrink-0 bg-white-800">
      <button onClick={() => onSelect("all")} className="cursor-pointer">
        All
      </button>

      {categories.map((cat) => (
        <div
          className="cursor-pointer p-2 hover:bg-gray-600"
          onClick={() => onSelect(cat)}
        >
          {cat.name}
        </div>
      ))}
    </div>
  );
}
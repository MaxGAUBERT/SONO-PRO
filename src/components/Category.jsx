export default function Category({
  categories = [],
  selectedCategoryId,
  onSelect,
}) {
  return (
    <div className="bg-gray-500 flex">
      <button
        type="button"
        onClick={() => onSelect("all")}
        className={`cursor-pointer p-2 rounded ${
          selectedCategoryId === "all"
            ? "bg-gray-700"
            : "bg-gray-600 hover:bg-gray-700"
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          type="button"
          key={cat.id}
          onClick={() => onSelect(cat.category_id)}
          className={`cursor-pointer p-2 rounded ${
            Number(selectedCategoryId) === Number(cat.id)
              ? "bg-gray-700"
              : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
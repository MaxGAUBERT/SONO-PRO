import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";

export default function Category({
  categories = [],
  selectedCategoryId,
  onSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSelect(categoryId) {
    onSelect(categoryId);
    setIsOpen(false);
  }

  const selectedCategory =
  selectedCategoryId === "all"
    ? "All"
    : categories.find((category) => {
        const id = category.category_id ?? category.id;

        return String(id) === String(selectedCategoryId);
      })?.name ??
      categories.find((category) => {
        const id = category.category_id ?? category.id;

        return String(id) === String(selectedCategoryId);
      })?.nom ??
      "Categories";

  return (
    <div className="relative left-0">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className="
          flex items-center gap-1
          bg-gray-700 hover:bg-gray-600
          px-4 py-2
          rounded-lg
          transition
          left-0
          z-50
          hover:cursor-pointer
        "
        aria-expanded={isOpen}
        aria-label="Open category menu"
      >
        {isOpen ? <FaXmark size={20} /> : <FaBars size={20} />}

        <span>{selectedCategory}</span>
      </button>

      {isOpen && (
        <div
          className="
            absolute
            top-full left-0
            mt-2
            min-w-56
            bg-gray-800
            border border-gray-700
            rounded-lg
            shadow-xl
            overflow-hidden
            z-50
          "
        >
          <button
            type="button"
            onClick={() => handleSelect("all")}
            className={`
              block w-full
              px-4 py-3
              text-left
              transition
              ${
                selectedCategoryId === "all"
                  ? "bg-gray-600 text-white"
                  : "hover:bg-gray-700"
              }
            `}
          >
            All
          </button>

          {categories.map((category) => {
            const categoryId = category.id ?? category.category_id;

            const isSelected =
              String(selectedCategoryId) === String(categoryId);

            return (
              <button
                type="button"
                key={categoryId}
                onClick={() => handleSelect(categoryId)}
                className={`
                  block w-full
                  px-4 py-3
                  text-left
                  transition
                  ${
                    isSelected
                      ? "bg-gray-600 text-white"
                      : "hover:bg-gray-700"
                  }
                `}
              >
                {category.name ?? category.nom}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
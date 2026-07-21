import { useState } from "react";
import DeleteProduct from "../products/DeleteProduct";
import AddProduct from "../products/AddProduct";

export default function Admin({ categories = [] }) {
  const [productIdToDelete, setProductIdToDelete] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  function handleDelete(id) {
    console.log(`Product with ID ${id} deleted.`);

    setProductIdToDelete("");
  }

  return (
    <div className="overflow-hidden overflow-y-auto h-[calc(100vh-32px)] bg-gray-500 text-white">
      <header className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">
          WORLD SHOP - Admin Panel
        </h1>
      </header>

      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Admin Panel
        </h2>

        <p>
          Welcome to the admin panel. Here you can manage products,
          categories, and more.
        </p>
      </main>

      <div className="fixed bottom-10 border-2 right-4">
        <AddProduct categories={categories} />
      </div>

      <div className="fixed bottom-10 border-2 left-4 flex items-center gap-2">
        <select
          value={selectedCategoryId}
          onChange={(event) =>
            setSelectedCategoryId(event.target.value)
          }
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          <option value="all">
            All Categories
          </option>

          {categories.map((category) => {
            const categoryId =
              category.id ?? category.category_id;

            return (
              <option
                key={categoryId}
                value={categoryId}
              >
                {category.name ?? category.nom}
              </option>
            );
          })}
        </select>

        <input
          type="number"
          min="1"
          placeholder="Product ID to delete"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          value={productIdToDelete}
          onChange={(event) =>
            setProductIdToDelete(event.target.value)
          }
        />

        <DeleteProduct
          productId={
            productIdToDelete
              ? Number(productIdToDelete)
              : null
          }
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
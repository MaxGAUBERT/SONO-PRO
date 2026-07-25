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
    <div className="min-h-screen bg-slate-300 text-slate-900">
      <header className="border-b border-slate-200 bg-slate-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <h1 className="mt-1 text-2xl font-black tracking-tight">
              WORLD<span className="text-blue-500">SHOP</span>
            </h1>
          </div>

          <span className="rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300">
            Admin Panel
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="mb-8">
          <h2 className="text-3xl font-black text-slate-900">
            Product management
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Manage your products, categories and store inventory from this
            dashboard.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-gray-400 p-4 shadow-sm">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                New product
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900">
                Add a product
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Create a new product and assign it to a category.
              </p>
            </div>

            <AddProduct categories={categories} />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gray-400 p-6 shadow-sm">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-red-600">
                Danger zone
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900">
                Delete a product
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Select a category and enter the product ID you want to remove.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Category
                </label>

                <select
                  id="category"
                  value={selectedCategoryId}
                  onChange={(event) =>
                    setSelectedCategoryId(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="all">All Categories</option>

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
              </div>

              <div>
                <label
                  htmlFor="product-id"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Product ID
                </label>

                <input
                  id="product-id"
                  type="number"
                  min="1"
                  placeholder="Example: 12"
                  value={productIdToDelete}
                  onChange={(event) =>
                    setProductIdToDelete(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div className="border-t border-slate-200 pt-5">
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
          </div>
        </section>
      </main>
    </div>
  );
}

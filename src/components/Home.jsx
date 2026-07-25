import { useMemo, useState } from "react";
import SearchBar from "./UI/SearchBar";
import Category from "./UI/Category";
import Cart from "./UI/Cart";
import Products from "./UI/Products";
import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const products = useProducts();
  const categories = useCategories();
  const { handleAddItem } = useCart();

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategoryId !== "all") {
      result = result.filter(
        (product) =>
          String(product.category_id) === String(selectedCategoryId)
      );
    }

    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (normalizedSearch) {
      result = result.filter((product) =>
        product.nom?.toLowerCase().includes(normalizedSearch)
      );
    }

    return result;
  }, [products, searchTerm, selectedCategoryId]);

  const selectedCategoryName =
    selectedCategoryId === "all"
      ? "Tous les produits"
      : categories.find((category) => {
          const id = category.category_id ?? category.id;

          return String(id) === String(selectedCategoryId);
        })?.name ?? "Produits";

  const scrollToProducts = () => {
    document
      .getElementById("products-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-slate-500 text-slate-900">
      <header className="sticky top-0 border-slate-500 bg-gray-600 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-1 sm:px-6 lg:px-8">
          <h1 className="shrink-0 text-xl font-black">
            WORLD<span className="text-blue-600">SHOP</span>
          </h1>

          <div className="hidden flex-1 md:block">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>

          <div className="rounded-xl transition hover:bg-slate-100">
            <Cart />
          </div>
        </div>

        <div className="border-t border-slate-100 md:hidden">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>

      <main>
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-300">
            Discover products for the home studio / sono
          </p>

          <button
            type="button"
            onClick={scrollToProducts}
            className="mx-auto mt-4 block rounded-xl bg-blue-600 px-20 py-3 font-semibold transition hover:bg-blue-500"
          >
            Find products
          </button>
        </div>
      </section>



        <section
          id="products-section"
          className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
        >
          <div className="mb-4">
            <p className="mb-3 text-sm font-semibold text-slate-500">
              Browse categories
            </p>

            <Category
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelect={setSelectedCategoryId}
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">{selectedCategoryName}</h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredProducts.length} produit
                {filteredProducts.length > 1 ? "s" : ""}
              </p>
            </div>

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="text-sm font-medium text-white/20 hover:text-red-700"
              >
                Clear Search
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <Products
              products={filteredProducts}
              handleAddItem={handleAddItem}
              selectedCategory={selectedCategoryName}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <h3 className="text-lg font-semibold">
                No result
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Modify search or category
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategoryId("all");
                }}
                className="rounded-lg bg-slate-900 px-4 py-10 text-sm font-semibold text-white hover:bg-slate-700"
              >
                View all products
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
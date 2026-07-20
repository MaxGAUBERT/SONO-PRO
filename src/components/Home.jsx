import { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import SearchBar from "./SearchBar";
import Category from "./Category";
import AjoutProduit from "./Ajoutproduit";

const Home = ({ products = [], cart, setCart, categories = [] }) => {
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  useEffect(() => {
    let result = [...products];

    if (selectedCategoryId !== "all") {
      result = result.filter(
        (product) =>
          Number(product.category_id) === Number(selectedCategoryId)
      );
    }

    if (searchTerm.trim()) {
      const normalizedSearch = searchTerm.trim().toLowerCase();

      result = result.filter((product) =>
        product.nom?.toLowerCase().includes(normalizedSearch)
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, products, selectedCategoryId]);

  console.log("Produits reçus :", products);
  console.log("Catégories reçues :", categories);
  console.log("Catégorie sélectionnée :", selectedCategoryId);

  return (
    <div className="overflow-hidden overflow-y-auto h-[calc(100vh-32px)] bg-gray-500 text-white">
      <header className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">
          WORLD SHOP
        </h1>

        <Category
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div
          className="relative cursor-pointer"
          onClick={() => setShowCart((previous) => !previous)}
        >
          <FaCartShopping size={28} />

          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
      </header>

      {showCart && (
        <div className="absolute top-16 right-4 bg-gray-600 border shadow-lg rounded-lg p-4 w-72 z-50">
          <h2 className="text-lg font-bold mb-4">My Cart</h2>

          {cart.length === 0 ? (
            <p className="text-gray-300">Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center justify-between mb-2"
                >
                  <span className="text-sm">{item.nom}</span>

                  <button
                    type="button"
                    className="text-red-400 text-xs hover:underline"
                    onClick={() =>
                      setCart((previous) =>
                        previous.filter((_, itemIndex) => itemIndex !== index)
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="mt-4 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
                onClick={() => setCart([])}
              >
                Clear Cart
              </button>
            </>
          )}
        </div>
      )}

      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center"
          >
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.nom}
                className="w-48 h-48 object-contain mb-4"
              />
            ) : (
              <div className="w-48 h-48 border border-gray-400 mb-4" />
            )}

            <h2 className="text-lg font-semibold">
              {product.nom}
            </h2>

            {product.description && (
              <p className="text-gray-400 text-sm text-center mb-4">
                {product.description}
              </p>
            )}

            <p className="text-green-400 font-bold mb-4">
              {Number(product.prix).toFixed(2)} €
            </p>

            <button
              type="button"
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              onClick={() =>
                setCart((previous) => [...previous, product])
              }
            >
              Add to Cart
            </button>
          </div>
        ))}

        <AjoutProduit />
      </main>
    </div>
  );
};

export default Home;
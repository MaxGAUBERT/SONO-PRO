import { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import SearchBar from "./SearchBar";
import Category from "./Category";

function Home({ products, cart, setCart, categories }) {
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
  let filteredProducts = products;

  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category_id === selectedCategory.id
    );
  }

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  setFilteredProducts(filteredProducts);
}, [searchTerm, products, selectedCategory]);

  console.log("categories dans Home:", categories);
  
  return (
    <div className="overflow-hidden overflow-y-auto h-[calc(100vh-32px)] bg-gray-500 text-white">
      {/* Header */}

      <header className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">WORLD SHOP</h1>
        <Category
          categories={categories}
          onSelect={(cat) => setSelectedCategory(cat)}
        />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Icône panier */}
        <div className="relative cursor-pointer" onClick={() => setShowCart(!showCart)}>
          <FaCartShopping size={28} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
      </header>

      {/* Panneau panier */}
      {showCart && (
        <div className="absolute top-16 right-4 bg-gray-600 border shadow-lg rounded-lg p-4 w-72 z-50">
          <h2 className="text-lg font-bold mb-4">🛒 My Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between mb-2">
                  <span className="text-sm">{item.name}</span>
                  <button
                    className="text-red-500 text-xs hover:underline"
                    onClick={() => setCart((prev) => prev.filter((_, i) => i !== index))}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="mt-4 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
                onClick={() => setCart([])}
              >
                Clear Cart
              </button>
            </>
          )}
        </div>
      )}

      {/* Liste des produits */}
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-48 h-48 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-500 text-sm text-center mb-4">{product.description}</p>
            <p className="text-green-400 font-bold mb-4">{product.price} €</p>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              onClick={() => setCart((prev) => [...prev, product])}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Home;
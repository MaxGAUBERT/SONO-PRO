import { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import SearchBar from "./UI/SearchBar";
import Category from "./UI/Category";
import AddProduct from "./products/AddProduct";
import Cart from "./UI/Cart";
import useCart from "../hooks/useCart";

const Home = ({ products = [], categories = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("All");
  const { handleAddItem } = useCart();

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
      <div className="overflow-hidden overflow-y-auto h-[100vh] bg-gray-500 text-white">
      <header className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
        <title className="text-xl font-bold tracking-wide">
          WORLD SHOP
        </title>

        <Category
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />

        <div className="fixed right-70 hover:text-blue-500">
          <Cart />
        </div>

        <div className="ml-5 right-0 hover:text-blue-500">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
        </div>
      </header>
    
      <main className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {filteredProducts.map((product) => {
        const mainImage = [...(product.produit_images ?? [])]
          .sort((a, b) => a.ordre - b.ordre)[0];

          return (
          <div
            key={product.id}
            className="bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center"
          >
            {mainImage?.image_url ? (
              <img
                src={mainImage.image_url}
                alt={product.nom}
                className="w-24 h-24 object-contain mb-4"
              />
            ) : (
              <div className="w-24 h-24 border border-gray-800 mb-4 flex items-center justify-center">
                Aucune image
              </div>
            )}

            <h2 className="text-lg font-semibold">{product.nom}</h2>

            <p className="text-green-400 font-bold mb-4">
              {Number(product.prix).toFixed(2)} €
            </p>

            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleAddItem(product)}
            >
              Add to Cart
            </button>
          </div>
  );
        })}
      </main>
    </div>
  );
};

export default Home;
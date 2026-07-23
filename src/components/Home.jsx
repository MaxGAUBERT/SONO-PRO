import { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import SearchBar from "./UI/SearchBar";
import Category from "./UI/Category";
import AddProduct from "./products/AddProduct";
import Cart from "./UI/Cart";
import useCart from "../hooks/useCart";
import Products from "./UI/Products";

const Home = ({ products = [], categories = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSearchTerm, setFilteredSearchTerm] = useState("");
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

  return (
      <div className="overflow-hidden overflow-y-auto h-[100vh] bg-gray-500 text-white">
      <header className="bg-gray-800 text-white px-6 py-4 flex w-screen items-center justify-between">
        <title className="text-xl font-bold fixed left-200 tracking-wide">
          WORLD SHOP
        </title>

        <Category
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />

        <div className="ml-200 sticky hover:text-blue-500">
          <Cart />
        </div>

        <div className=" hover:text-blue-500">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredSearchTerm={filteredSearchTerm} setFilteredSearchTerm={setFilteredSearchTerm} />
          
        </div>
      </header>

      <Products 
        products={filteredProducts}
        handleAddItem={handleAddItem}
        filteredProducts={filteredProducts}
        selectedCategory={categories.find((category) => {
          const id = category.category_id ?? category.id;
          return String(id) === String(selectedCategoryId); 
        }
      )?.name ?? "Unknown"}
      />
    </div>
  );
};

export default Home;
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Admin from "./components/Admin";
import useProducts from "./hooks/useProducts";
import useCategories from "./hooks/useCategories";

function App() {
  const products = useProducts();
  const categories = useCategories();
  const [cart, setCart] = useState([]);

  function handleAddItem(product) {
    setCart((prev) => [...prev, product]);
  }

  function handleRemoveItem(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  console.log("categories:", categories);
  
  return (
  <Routes>
    <Route path="/" element={<Home products={products} cart={cart} setCart={setCart} categories={categories}/>} />
    <Route path="/admin" element={<Admin />} />
     <Route
        path="/api/categories"
        element={
          <Home
            products={products}
            cart={cart}
            setCart={setCart}
            categories={categories}
          />
        }
      />
  </Routes>
  );
}

export default App;
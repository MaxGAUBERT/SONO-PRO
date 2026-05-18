import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  function handleAddItem(product) {
    setCart((prev) => [...prev, product]);
  }

  function handleRemoveItem(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
  <Routes>
    <Route path="/" element={<Home products={products} cart={cart} setCart={setCart} />} />
  </Routes>
  );
}

export default App;
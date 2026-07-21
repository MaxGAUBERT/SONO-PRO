import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/UI/Admin";
import useProducts from "./hooks/useProducts";
import useCategories from "./hooks/useCategories";
import { CartProvider } from "./context/CartContext";

const App = () => {
  const products = useProducts();
  const categories = useCategories();

  return (
    <CartProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              categories={categories}
            />
          }
        />

        <Route
          path="/admin"
          element={<Admin categories={categories} />}
        />

        <Route
          path="/api/categories"
          element={
            <Home
              products={products}
              categories={categories}
            />
          }
        />
      </Routes>
    </CartProvider>
  );
};

export default App;
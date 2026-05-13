import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./components/Home";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <Home products={products} />;
}

export default App;
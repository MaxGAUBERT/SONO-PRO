// src/hooks/useCategories.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return products;
}
// src/hooks/useProducts.js
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
export default function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("produits")
        .select("*, produit_images(*)"); 

      if (error) {
        console.error("Erreur récupération produits:", error.message);
        return;
      }

      setProducts(data);
    }

    fetchProducts();
  }, []);

  return products;
}
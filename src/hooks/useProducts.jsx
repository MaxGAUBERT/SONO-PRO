import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("produits")
        .select(`
          *,
          produit_images (
            image_url,
            ordre
          )
        `);

      if (error) {
        console.error(error);
        return;
      }

      setProducts(data);
    }

    fetchProducts();
  }, []);

  return products;
}
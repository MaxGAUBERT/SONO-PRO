import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("*");

      if (error) {
        console.error("Erreur récupération catégories:", error.message);
        return;
      }

      setCategories(data);
    }

    fetchCategories();
  }, []);

  return categories;
}
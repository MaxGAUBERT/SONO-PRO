import { useEffect, useState } from "react";
import axios from "axios";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => {
        console.log("categories API:", res.data);
        setCategories(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return categories;
}
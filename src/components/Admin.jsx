import { useState } from "react";
import axios from "axios";

function Admin() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image_url: "",
    stock: "",
    category_id: "",
  });

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/products", {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image_url: form.image_url,
        stock: Number(form.stock),
        category_id: form.category_id
          ? Number(form.category_id)
          : null,
      });

      setForm({
        id: "",
        name: "",
        description: "",
        price: "",
        image_url: "",
        stock: "",
        category_id: "",
      });

      alert("Produit ajouté");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout");
    }
  }

  async function handleDelete(productId) {
    if (!productId) {
      alert("Indique un ID produit");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${productId}`
      );

      alert("Produit supprimé");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  }

  async function handleRemoveFromCategory(productId) {
    if (!productId) {
      alert("Indique un ID produit");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:5000/api/products/${productId}/category`,
        {
          category_id: null,
        }
      );

      alert("Produit retiré de la catégorie");
    } catch (err) {
      console.error(err);
      alert("Erreur lors du retrait de la catégorie");
    }
  }

  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center min-h-screen text-white">
      <h1>Admin - Add Product</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <input
          name="id"
          placeholder="Product ID"
          value={form.id}
          onChange={handleChange}
        />

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="image_url"
          placeholder="/images/nom-image.jpg"
          value={form.image_url}
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />

        <input
          name="category_id"
          type="number"
          placeholder="Category ID"
          value={form.category_id}
          onChange={handleChange}
        />

        <button type="submit">
          Add Product
        </button>

        <button
          type="button"
          onClick={() => handleRemoveFromCategory(form.id)}
        >
          Remove From Category
        </button>

        <button
          type="button"
          onClick={() => handleDelete(form.id)}
        >
          Delete Product
        </button>
      </form>
    </div>
  );
}

export default Admin;
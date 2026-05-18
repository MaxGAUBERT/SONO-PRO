import { useState } from "react";
import axios from "axios";

function Admin() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    stock: "",
  });

  function handleChange(e){
    setForm((prev) => ({...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/products", {
      name: form.name,
      id: form.id,
      description: form.description,
      price: Number(form.price),
      image_url: form.image_url,
      stock: Number(form.stock),
    });

    setForm({
      name: "",
      id: "",
      description: "",
      price: "",
      image_url: "",
      stock: "",
    });

    alert("Produit ajouté");
  }

  function handleDelete(productId) {
    axios.delete(`http://localhost:5000/api/products/${productId}`)
      .then(() => alert("Produit supprimé"))
      .catch((err) => console.error(err));
  }

  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center min-h-screen text-white">
      <h1>Admin - Ajouter un produit</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nom du produit"
          value={form.name}
          onChange={handleChange}
        />

        <input
            name="id"
            placeholder="ID du produit (pour suppression)"
            value={form.id}
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
          placeholder="Prix"
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

        <button type="submit">Ajouter le produit</button>
        <button type="button" onClick={() => handleDelete(form.id)}>Supprimer le produit</button>
      </form>
    </div>
  );
}

export default Admin;
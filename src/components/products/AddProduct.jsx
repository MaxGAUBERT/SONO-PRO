import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import useCategories from '../../hooks/useCategories';

export default function AjoutProduit() {
  const categories = useCategories();

  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };


  async function uploadMultipleImages(produitId, files) {
  const imagesData = [];

  for (let index = 0; index < files.length; index++) {
    const file = files[index];

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";

    const filePath =
      `${produitId}/${crypto.randomUUID()}-${index}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Erreur Storage :", uploadError);

      throw new Error(
        `Upload Storage impossible : ${uploadError.message}`
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    if (!publicUrlData?.publicUrl) {
      throw new Error(
        `Impossible de générer l'URL publique de ${file.name}`
      );
    }

    imagesData.push({
      produit_id: produitId,
      image_url: publicUrlData.publicUrl,
      ordre: index,
    });
  }

  console.log("Images à enregistrer :", imagesData);

  const { error: insertError } = await supabase
    .from("produit_images")
    .insert(imagesData);

  if (insertError) {
    console.error("Erreur produit_images :", insertError);

    throw new Error(
      `Insertion dans produit_images impossible : ${insertError.message}`
    );
  }
}

async function handleSubmit(e) {
  e.preventDefault();

  const formElement = e.currentTarget;

  setLoading(true);
  setMessage(null);

  let createdProductId = null;

  try {
    const parsedPrice = Number(prix);

    const { data: produit, error: produitError } = await supabase
      .from("produits")
      .insert({
        nom: nom.trim(),
        prix: parsedPrice,
        category_id: Number(categoryId),
      })
      .select("id")
      .single();

    if (produitError) {
      throw produitError;
    }

    createdProductId = produit.id;

    await uploadMultipleImages(produit.id, imageFiles);

    previews.forEach((preview) => {
      URL.revokeObjectURL(preview);
    });

    setNom("");
    setPrix("");
    setCategoryId("");
    setImageFiles([]);
    setPreviews([]);

    setMessage({
      type: "success",
      text: `Produit "${nom}" ajouté avec ${imageFiles.length} image(s).`,
    });
  } catch (error) {
    console.error(error);

    setMessage({
      type: "error",
      text: `Erreur : ${error.message}`,
    });
  } finally {
    setLoading(false);
  }
}
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nom">Product Name</label>
        <input
          id="nom"
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="prix">Price (€)</label>
        <input
          id="prix"
          type="number"
          step="0.01"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="category">Category</label>
       <select
  id="category"
  value={categoryId}
  onChange={(e) => setCategoryId(e.target.value)}
  required
>
  <option value="" disabled>
    -- Category --
  </option>

  {categories.map((category) => {
    const id = category.category_id ?? category.id;

    return (
      <option key={id} value={id}>
        {category.name ?? category.nom}
      </option>
    );
  })}
</select>
      </div>

      <div>
        <label htmlFor="images">Product image</label>
        <input
          id="images"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {previews.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
          {previews.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Aperçu ${i + 1}`}
              style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }}
            />
          ))}
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Product'}
      </button>

      {message && (
        <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>
          {message.text}
        </p>
      )}

      
    </form>
  );
}
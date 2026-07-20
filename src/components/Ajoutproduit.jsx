import { useState } from 'react';
import { supabase } from '../supabaseClient'; // adaptez le chemin si besoin
import useCategories from '../hooks/useCategories'; // adaptez le chemin si besoin

export default function AjoutProduit() {
  const categories = useCategories();

  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Gère la sélection de plusieurs fichiers + génère des aperçus
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // Upload toutes les images en parallèle vers Supabase Storage,
  // puis insère toutes les lignes produit_images en une seule requête
  async function uploadMultipleImages(produitId, files) {
    const uploadPromises = files.map(async (file, index) => {
      const fileName = `${produitId}-${Date.now()}-${index}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      return { produit_id: produitId, image_url: urlData.publicUrl, ordre: index };
    });

    const imagesData = await Promise.all(uploadPromises);

    const { error: insertError } = await supabase
      .from('produit_images')
      .insert(imagesData);

    if (insertError) throw insertError;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // 1. Créer le produit (category_id est optionnel : null si rien n'est sélectionné)
      const { data: produit, error: produitError } = await supabase
        .from('produits')
        .insert([
          {
            nom,
            prix: parseFloat(prix),
            category_id: categoryId ? parseInt(categoryId, 10) : null,
          },
        ])
        .select()
        .single();

      if (produitError) throw produitError;

      // 2. Uploader et lier toutes les images si présentes
      if (imageFiles.length > 0) {
        await uploadMultipleImages(produit.id, imageFiles);
      }

      setMessage({ type: 'success', text: `Produit "${nom}" ajouté avec ${imageFiles.length} image(s).` });
      setNom('');
      setPrix('');
      setCategoryId('');
      setImageFiles([]);
      setPreviews([]);
      e.target.reset();
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: `Erreur : ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nom">Nom du produit</label>
        <input
          id="nom"
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="prix">Prix (€)</label>
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
        <label htmlFor="category">Catégorie</label>
       <select
        id="category"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      >
        <option value="" disabled>-- Choisir une catégorie --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      </div>

      <div>
        <label htmlFor="images">Images du produit</label>
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
        {loading ? 'Ajout en cours...' : 'Ajouter le produit'}
      </button>

      {message && (
        <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>
          {message.text}
        </p>
      )}
    </form>
  );
}
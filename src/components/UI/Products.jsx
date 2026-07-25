import { GrTextAlignLeft } from "react-icons/gr";
import { useState } from "react";

export default function Products({
  products = [],
  handleAddItem,
  selectedCategory,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="h-[100vh] overflow-auto bg-gray-500 text-white">
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {products.map((product) => {
          const mainImage = [...(product.produit_images ?? [])].sort(
            (a, b) => Number(a.ordre ?? 0) - Number(b.ordre ?? 0)
          )[0];

          return (
            <div
              key={product.id}
              className="bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center"
            >
              {mainImage?.image_url ? (
                <img
                  src={mainImage.image_url}
                  alt={product.nom}
                  className="w-48 h-48 object-contain mb-4"
                />
              ) : (
                <div className="w-48 h-48 border border-gray-800 mb-4 flex items-center justify-center">
                  No Images
                </div>
              )}

              <h2 className="text-lg font-semibold">{product.nom}</h2>

              <h3>{product.brand}</h3>

              <span className="text-gray-400 text-sm mb-2">
                Category:{" "}
                {product.category?.name ??
                  product.category_name ??
                  selectedCategory ??
                  "Unknown"}
              </span>

              <h3>Stock: {product.stock}</h3>

              <p className="text-green-400 font-bold mb-4">
                {Number(product.prix ?? 0).toFixed(2)} €
              </p>

              <button
                type="button"
                onClick={() => setSelectedProduct(product)}
                className="mb-3 rounded bg-gray-700 p-2 hover:bg-gray-600"
                aria-label={`Voir la description de ${product.nom}`}
              >
                <GrTextAlignLeft size={20} />
              </button>

              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleAddItem(product)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </main>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="max-h-80 w-full max-w-sm overflow-y-auto rounded-lg bg-gray-800 p-4 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="mb-2 text-lg font-bold">
              {selectedProduct.nom}
            </h2>

            <h2 className="mb-2 text-sm font-bold">
              {selectedProduct.brand}
            </h2>

            <p className="text-sm text-gray-300">
              {selectedProduct.description ||
                "No description available."}
            </p>

            <button
              type="button"
              className="mt-4 rounded bg-blue-500 px-3 py-1.5 text-sm"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

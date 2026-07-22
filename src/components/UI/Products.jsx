import useCategories from "../../hooks/useCategories";
import { GrTextAlignLeft } from "react-icons/gr";
import { useState } from "react";

export default function Products({ products, handleAddItem, filteredProducts, selectedCategory, showDescribes, setShowDescribes }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
 
    return (
        <div className="h-[100vh]  bg-gray-500 text-white">
    <main className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {filteredProducts.map((product) => {
        const mainImage = [...(product.produit_images ?? [])]
          .sort((a, b) => a.ordre - b.ordre)[0];

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
            <h3> {product.brand}</h3>
            <span className="text-gray-400 text-sm mb-2">
              Category: {selectedCategory ?? "Unknown"}
            </span>
            <h3> Stock: {product.stock}</h3>

            <p className="text-green-400 font-bold mb-4">
              {Number(product.prix).toFixed(2)} €
            </p>

            <button 
                onClick={() => setSelectedProduct(product)}
            >
                <GrTextAlignLeft size={20} />
            </button>

            {showDescribes && (
            <div className="z-1000 inset-0 top-1/2 left-1/2 justify-center">
                <p className="text-gray-300 overflow-auto border-2 max-h-10">
                    {product.description ?? "No description available."}
                </p>
            </div>
            )}
        

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
    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    onClick={() => setSelectedProduct(null)}
  >
    <div
      className="bg-gray-800 rounded-xl p-6 max-w-xl w-[90%]"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold mb-4">
        {selectedProduct.nom}
      </h2>

      <p className="text-gray-300 whitespace-pre-line">
        {selectedProduct.description || "No description available."}
      </p>

      <button
        onClick={() => setSelectedProduct(null)}
        className="mt-6 bg-blue-500 px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  </div>
        )}
      </div>
    )

}
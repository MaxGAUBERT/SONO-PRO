import { supabase } from "../../supabaseClient";


export default function DeleteProduct({ productId, onDelete }) {
    const handleDelete = async () => {
        try {
            const { error } = await supabase
                .from("produits")
                .delete()
                .eq("id", productId);   


            if (error) {
                console.error("Erreur lors de la suppression du produit :", error.message);
                alert("Erreur lors de la suppression du produit");
                return;
            }

            alert("Produit supprimé avec succès");
            if (onDelete) {
                onDelete(productId);
            }
        } catch (err) {
            console.error("Erreur lors de la suppression du produit :", err);
            alert("Erreur lors de la suppression du produit");
        }
    };

    return (
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete Product
        </button>
    );
}

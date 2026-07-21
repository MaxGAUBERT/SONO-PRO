import { createContext, useContext } from "react";
import { useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    function handleAddItem(product) {
        setCart((prev) => [...prev, product]);
    }

    function handleRemoveItem(productId) {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    }

    function handleClearCart() {
        setCart([]);
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                showCart,
                setShowCart,
                handleAddItem,
                handleRemoveItem,
                handleClearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
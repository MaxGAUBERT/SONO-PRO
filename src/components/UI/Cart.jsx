import useCart from "../../hooks/useCart";
import { useEffect } from "react";
import {FaCartShopping} from "react-icons/fa6";

export default function Cart() {
    const { cart, setCart, showCart, setShowCart } = useCart();

    return (  
    <div className="absolute top-2 right-0">
        <div
          className="cursor-pointer relative justify-content hover:text-blue-500"
          onClick={() => setShowCart((previous) => !previous)}
        >
          <FaCartShopping size={30} color="white"/>
          {cart.length > 0 && (
            <span className="absolute -top-0 -right-2 w-5 h-1 bg-red-500 text-white text-xl rounded-full flex items-center justify-end">
              {cart.length}
            </span> 
          )}
            </div>
            {showCart && (
                <div className=" bg-gray-600 fixed right-0 border shadow-lg rounded-lg w-64 h-100 overflow-auto z-25 p-2 mt-2">
                <h2 className="text-lg font-bold">My Cart</h2>

                {cart.length === 0 ? (
                    <p className="text-gray-300">Your cart is empty.</p>
                ) : (
                    <>
                    {cart.map((item, index) => (
                        <div
                        key={`${item.id}-${index}`}
                        className="flex flex-col p-2 border-b border-gray-700"
                        >
                        <span className="text-sm">{item.nom}</span>

                        <button
                            type="button"
                            className="text-red-400 text-xs hover:underline"
                            onClick={() =>
                            setCart((previous) =>
                                previous.filter((_, itemIndex) => itemIndex !== index)
                            )
                            }
                        >
                            Remove
                        </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        className="mt-2 right-0 sticky bg-red-500 text-white py-1 rounded hover:bg-red-600"
                        onClick={() => setCart([])}
                    >
                        Clear Cart
                    </button>

                    <button
                        type="button"
                        className="mt-2 sticky bg-green-500 text-white px-4 py-4 rounded hover:bg-green-600"
                        onClick={() => {
                            // Implement checkout logic here
                            alert("Proceeding to checkout...");
                        }}
                    >
                        Checkout
                    </button>
                    </>
                )}
                </div>
            )}
    </div>
    );
}
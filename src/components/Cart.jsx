import React from 'react';
import { FaShoppingCart } from "react-icons/fa";


function Cart({itemsCount, onAdd, onRemove}) {


    return (
        <div className='absolute right-0 top-0'>
            <FaShoppingCart color="red"className='text-2xl text-gray-800' />
            <span className='bg-red-500 text-white rounded-full px-2 text-xs absolute -top-2 -right-2'> {itemsCount} </span>

        </div>
    )



}

export default Cart;
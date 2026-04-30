import React from 'react';
import Cart from './Cart';
import { useState } from 'react';


function Home() {
    const [items, setItems] = useState([]);

    return (    
        <div className='absolute right-0 top-0'>

            <h2 className='bg-gray-800 fixed top-0 left-0 w-full h-8'> World shop </h2>
            <div className='fixed top-3 right-5'>
                <Cart itemsCount={items.length} onAdd={() => {}} onRemove={() => {}} />
            </div>

            <div className='flex flex-col space-y-0.5 space-x-3 mt-10 top-5 right-0'>
                <button className='bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-700' onClick={() => window.location.href = '/contact'}> Contact </button>
                <button className='bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-700' onClick={() => window.location.href = '/about'}> About </button>
                <button className='bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-700' onClick={() => window.location.href = '/help'}> Help </button>
            </div>

        </div>
    );
}

export default Home;
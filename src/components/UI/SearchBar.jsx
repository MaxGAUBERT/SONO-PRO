import { IoSearch } from "react-icons/io5";
import { useState } from "react";

export default function SearchBar({ searchTerm, setSearchTerm }) {
    const [viewSearchBar, setViewSearchBar] = useState(false);

    return (
        <div className='sticky top-0 right-0 flex items-center bg-gray-800'>
            <div className='flex space-x-4 mt-1'>
                <IoSearch size={24} onClick={() => setViewSearchBar(!viewSearchBar)} className='text-gray-500 text-xl mt-2 hover:text-blue-500' />
                
                {viewSearchBar && (
                    <input
                        type='text'
                        placeholder='Search for a product...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='border p-2 rounded w-full text-white'
                    />
                )}
            </div>
        </div>
    );
}
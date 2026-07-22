import { IoSearch } from "react-icons/io5";
import { useState } from "react";

export default function SearchBar({ searchTerm, setSearchTerm, filteredSearchTerm, setFilteredSearchTerm }) {
    const [viewSearchBar, setViewSearchBar] = useState(false);

    return (
        <div className='sticky top-0 right-0 flex items-center'>
            <div className='flex space-x-4 mt-1'>
                <IoSearch size={30} onClick={() => setViewSearchBar(!viewSearchBar)} className='text-gray-500 hover:text-blue-500' />
                
                <select 
                    value={filteredSearchTerm}
                    onChange={(e) => setFilteredSearchTerm(e.target.value)}
                    className="hover:bg-gray-200"
                >
                    <option value='default'>Default</option>
                    <option value='rated'>Best rated</option>
                    <option value='reviews'>Most reviewed</option>
                    <option value='oldest'>Oldest</option>
                    <option value='newest'>Newest</option>
                </select>
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
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

export default function SearchBar({ searchTerm, setSearchTerm, filteredSearchTerm, setFilteredSearchTerm }) {

    return (
        <div className='absolute left-1/2 top-0 w-150'>
            <div className='flex space-x-4 mt-1'>
    
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
                    <input
                        type='text'
                        placeholder='Search for a product ...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='border p-2 rounded w-full'
                    />
            
            </div>
        </div>
    )
}
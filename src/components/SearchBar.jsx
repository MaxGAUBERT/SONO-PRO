
    
export default function SearchBar({ searchTerm, setSearchTerm }) {

    return (
        <div className='sticky top-0 left-0'>
            <div className='flex space-x-4 mt-1'>
                <input
                    type='text'
                    placeholder='Search for a product...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='border p-2 rounded w-full text-white'
                />
            </div>
        </div>
    );
}
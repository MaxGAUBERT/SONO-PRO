



export default function SearchBar({ searchTerm, setSearchTerm }) {

    return (
        <div className='absolute right-50 top-5 w-1/4'>
            <h2 className='bg-gray-800 fixed top-0 left-0 w-full'> World shop - Search </h2>
            <div className='flex space-x-4 mt-16 p-4'>
                <input
                    type='text'
                    placeholder='Rechercher un produit...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='border p-2 rounded w-full text-black'
                />
            </div>
        </div>
    );
}
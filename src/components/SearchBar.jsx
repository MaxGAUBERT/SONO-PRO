



export default function SearchBar({ searchTerm, setSearchTerm }) {

    return (
        <div className='fixed top-0 left-0'>
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
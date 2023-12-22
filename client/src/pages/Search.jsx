import React from 'react'

const Search = () => {
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='border-b-2 p-7 md:border-r-2 md:min-h-screen'>
                <form className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term</label>
                        <input type="text" id='searchTerm' placeholder='search...' className='p-3 border rounded-lg' />
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label>Type:</label>

                        <div className='flex gap-2'>
                            <input type="checkbox" name="" id="all" className='w-5' />
                            <span>Rent & Sale</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type="checkbox" name="" id="rent" className='w-5' />
                            <span>Rent</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type="checkbox" name="" id="=offer" className='w-5' />
                            <span>Offer</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type="checkbox" name="" id="all" className='w-5' />
                            <span>rent & sale</span>
                        </div>
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Amenities:</label>

                        <div className='flex gap-2'>
                            <input type="checkbox" name="" id="parking" className='w-5' />
                            <span>Parking</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type="checkbox" name="" id="furnished" className='w-5' />
                            <span>Furnished</span>
                        </div>

                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>

                        <select id="sort_order" className='border rounded-lg p-3'>
                            <option>Price high to low</option>
                            <option>Price low to high</option>
                            <option>Latest</option>
                            <option>Oldest</option>
                        </select>
                    </div>

                    <button className='bg-slate-700 p-3 rounded-lg uppercase text-white hover:opacity-95'>Search</button>
                </form>
            </div>
            <div className=''>
                <h1 className='text-3xl text-slate-700 font-bold p-3 border-b mt-5'>Listing Results:</h1>
            </div>
        </div>
    )
}

export default Search
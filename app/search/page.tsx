import React from 'react'

const Search = async ({ searchParams }: any) => {

    const { query } = searchParams
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const { actors , movies } = await fetch(`${baseURL}/api/search/${query}`).then(res => res.json());


    return (
        <div className='text-white'>{JSON.stringify({actors , movies})}</div>
    )
}

export default Search
import React from 'react'
import Form from 'next/form'
import { RiAiGenerate2 } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";


const SearchForm = () => {


    const query = "Test"

    return (
        <Form action="/search" scroll={false}
            className='flex-1 flex-row-reverse h-4/5 bg-surface-background my-3 rounded-full flex items-center justify-between pr-5 pl-2 py-2 gap-5'>
            <input
                defaultValue={query}
                name="query"
                dir='auto'
                placeholder='بتدور علي ايه؟'
                className='px-6 flex-grow text-base rounded-full outline-none font-normal
                            placeholder:text-muted-text placeholder:text-right placeholder-shown:text-end text-text'/>
            <div className='flex items-center justify-center gap-3 text-xl'>
                <button type='submit' className='bg-secondary p-2 text-2xl rounded-full cursor-pointer'><RiAiGenerate2 /></button>
                <button type='submit' className='bg-primary hover:bg-primary-hover p-2 text-2xl rounded-full cursor-pointer text-white'><BiSearchAlt /></button>
            </div>
        </Form>
    )
}

export default SearchForm
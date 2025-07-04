import { BiSearchAlt } from "react-icons/bi";
import React from 'react'
import { RiAiGenerate2 } from "react-icons/ri";
import Form from 'next/form'
import SearchForm from "./Forms/SearchForm";

const Navbar = () => {

    return (
        <div dir='ltr' className='flex items-center justify-center flex-row-reverse gap-8 absolute left-1/2 -translate-x-1/2 top-0 z-50
                        bg-soft-background w-[75vw] mx-auto my-5 rounded-full h-17 px-10'>
            <h1 className='text-text text-3xl font-bold'>سينما</h1>
            {/* Search */}
            <SearchForm />
            {/* <Form action="/" scroll={false}  >
                <div className='flex-1 flex-row-reverse h-4/5 bg-surface-background my-3 rounded-full flex items-center justify-between pr-5 pl-2 py-2 gap-5'>
                    <input
                        defaultValue={""}
                        name="query"
                        dir='auto'
                        placeholder='بتدور علي ايه؟'
                        className='px-6 flex-grow text-base rounded-full outline-none font-normal
                                placeholder:text-muted-text placeholder:text-right placeholder-shown:text-end text-text'/>
                    <div className='flex items-center justify-center gap-3 text-xl'>
                        <div className='bg-secondary p-2 text-2xl rounded-full cursor-pointer'><RiAiGenerate2 /></div>
                        <div className='bg-primary hover:bg-primary-hover p-2 text-2xl rounded-full cursor-pointer text-white'><BiSearchAlt /></div>
                    </div>
                </div>
            </Form> */}
            <div className="flex gap-3 items-center">
                <h1 className='text-text text-xl font-medium text-nowrap'>عمر عماد</h1>
                <div className='w-[40px] h-[40px] rounded-full bg-surface-background'></div>
            </div>
        </div>
    )
}

export default Navbar
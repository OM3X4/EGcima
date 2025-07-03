import React from 'react'

const Tag = ({ Tag } : { Tag: string | null | undefined }) => {
    if(!Tag) return null


    return (
        <span className='text-base text-soft-text border-soft-text border-2 px-3 py-1 font-semibold rounded-full empty:hidden text-center'>
            {Tag}
        </span>
    )
}

export default Tag
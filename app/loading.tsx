import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'


import React from 'react'

const loading = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <Ring size={50} speed={1.5} bgOpacity={0.25} color='white' stroke={6}/>
        </div>
    )
}

export default loading


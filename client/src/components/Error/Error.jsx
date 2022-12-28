import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className='flex flex-col justify-center text-center'>
            <h1 className='text-3xl text-[#05d9e8] mt-20'>There is an error. Please enter the system again.</h1>
            <Link to='/' className='text-3xl text-[#05d9e8] underline mt-10'>Back</Link>
        </div>
    )
}

export default Error